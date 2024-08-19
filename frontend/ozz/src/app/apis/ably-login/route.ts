import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { format, parse } from 'date-fns'
import { Api as ClothesApi } from '@/types/clothes/Api'

puppeteer.use(StealthPlugin())

interface Goods {
  sno: number
  name: string
  image_still: string
}

interface Market {
  name: string
}

interface OrderItem {
  goods: Goods
  market: Market
  options: string[]
  processing_status: number
}

interface Order {
  ordered_at: string
  order_items: OrderItem[]
}

interface OrderData {
  name: string
  brand: string
  purchaseDate: string
  purchaseSite: string
  imgUrl: string
  option: string
}

// 서버 전용으로 ClothesApi 인스턴스를 생성하는 함수
const createClothesApi = (accessToken: string): ClothesApi<unknown> => {
  return new ClothesApi({
    securityWorker: async () => ({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  })
}

const sendPurchaseHistoryToServer = async (
  purchaseHistory: OrderData[],
  accessToken: string,
) => {
  // console.log(purchaseHistory)
  // console.log('구매내역', purchaseHistory.length, '개')

  const api = createClothesApi(accessToken)

  try {
    const response = await api.startBatch(purchaseHistory)
    return response
  } catch (error) {
    console.error('Error response:', error)
    throw new Error('Failed to send purchase history to the server')
  }
}

// Puppeteer를 사용하여 로그인하고 주문 내역을 가져오는 함수
const fetchOrderDataUsingPuppeteer = async (
  userId: string,
  password: string,
): Promise<OrderData[]> => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  })
  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  )

  await page.setViewport({ width: 375, height: 812, isMobile: true })

  await page.setExtraHTTPHeaders({
    accept: '*/*',
    'content-type': 'application/json',
    origin: 'https://m.a-bly.com',
    referer: 'https://m.a-bly.com/',
    'user-agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  })

  await page.goto('https://m.a-bly.com/login/email')
  await page.type('input[name="email"]', userId)
  await page.type('input[name="password"]', password)

  await page.click('button[type="submit"]')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  const cookies = await page.cookies()
  const cookieString = cookies
    .map(
      (cookie: { name: string; value: string }) =>
        `${cookie.name}=${cookie.value}`,
    )
    .join('; ')

  const authTokenCookie = cookies.find(
    (cookie: { name: string; value: string }) =>
      cookie.name === 'ably-jwt-token',
  )
  const authToken = authTokenCookie ? authTokenCookie.value : null

  if (!authToken) {
    console.error('인증 토큰을 찾을 수 없습니다.')
    await browser.close()
    throw new Error('인증 토큰을 찾을 수 없습니다.')
  }

  const orderData: OrderData[] = []
  let pageNum = 1
  let moreData = true

  while (moreData) {
    const orderListUrl = `https://api.a-bly.com/webview/orders/?page=${pageNum}&query=&min_ordered_at=2016-01-01&max_ordered_at=2024-12-31`

    // eslint-disable-next-line no-await-in-loop
    const response = await page.evaluate(
      async (url, cookieStr, token) => {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json, text/plain, */*',
            authorization: `JWT ${token}`,
            origin: 'https://m.a-bly.com',
            referer: 'https://m.a-bly.com/',
            'user-agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            cookie: cookieStr,
          },
        })
        return res.json()
      },
      orderListUrl,
      cookieString,
      authToken,
    )

    if (response.orders && response.orders.length > 0) {
      response.orders.forEach((order: Order) => {
        order.order_items.forEach((item: OrderItem) => {
          if (item.processing_status === 4 || item.processing_status === 5) {
            // name이 200자를 초과할 경우 자르기
            const truncatedName =
              item.goods.name.length > 200
                ? item.goods.name.substring(0, 200)
                : item.goods.name

            orderData.push({
              name: truncatedName,
              brand: item.market.name,
              purchaseDate: format(
                parse(order.ordered_at, 'yyyy-MM-dd HH:mm', new Date()),
                'yyyy-MM-dd',
              ),
              purchaseSite: '에이블리',
              imgUrl: item.goods.image_still,
              option: item.options.toString(),
            })
          }
        })
      })
      pageNum += 1
      if (pageNum > response.max_page_number) {
        moreData = false
      }
    } else {
      moreData = false
    }
  }

  await browser.close()
  return orderData
}

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    // Puppeteer를 사용하여 주문 내역 가져오기
    const orderData = await fetchOrderDataUsingPuppeteer(userId, password)

    // 서버 사이드에서 쿠키에서 access token을 추출 (Next.js에서 쿠키 파싱)
    const accessToken = request.headers
      .get('cookie')
      ?.split('; ')
      .find((c) => c.startsWith('access='))
      ?.split('=')[1]
    if (!accessToken) {
      throw new Error('Access token not found')
    }

    // Order 데이터를 PurchaseHistory 타입으로 변환 후 서버에 전달
    const response = await sendPurchaseHistoryToServer(orderData, accessToken)
    return NextResponse.json(response)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
