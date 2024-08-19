import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { format, parse } from 'date-fns'
import { Api as ClothesApi } from '@/types/clothes/Api'
// import { getClothesApi } from '@/services/authApi'

// URL Constants
const loginPageUrl = 'https://www.musinsa.com/auth/login'
const orderListUrl =
  'https://www.musinsa.com/order-service/my/order/get_order_list'

interface Order {
  name: string
  brand: string
  purchaseDate: string
  purchaseSite: string
  imgUrl: string
  option: string
}

// Function to fetch CSRF token from login page
const fetchCSRFToken = async (): Promise<string> => {
  const response = await fetch(loginPageUrl)
  const html = await response.text()
  const $ = cheerio.load(html)
  const csrfToken = $('input[name=csrfToken]').val() as string
  if (!csrfToken) throw new Error('CSRF Token not found')
  return csrfToken
}

// Function to log in using the CSRF token
const login = async (
  csrfToken: string,
  userId: string,
  password: string,
): Promise<string[]> => {
  const credentials = {
    id: userId,
    pw: password,
    csrfToken,
  }

  const formData = new URLSearchParams(credentials)
  const response = await fetch(loginPageUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  })

  const responseText = await response.text()

  // Check for login failure by inspecting the response data
  if (responseText.includes("alert('아이디 또는 패스워드를 확인하세요.')")) {
    throw new Error('아이디 또는 패스워드를 확인하세요.')
  }

  return response.headers.get('set-cookie')?.split(',') ?? []
}

// Function to fetch order list after successful login
const fetchOrderList = async (
  cookies: string[],
  offset: string = '', // 초기에는 빈 문자열로 시작
  orderList: Order[] = [],
): Promise<Order[]> => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const params = new URLSearchParams({
    searchText: '',
    startDate: '',
    endDate: today,
    fulfillmentTypeCode: '',
    offset, // 마지막 주문의 orderNo를 offset으로 사용
  })

  const response = await fetch(`${orderListUrl}?${params}`, {
    headers: {
      Cookie: cookies.join('; '),
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch order list')
  }

  const data = await response.json()

  const orders = data.list
    .map((order: any) => {
      // orderState가 40이거나 50인 옵션만 필터링
      const filteredOptions = order.orderOptionList.filter(
        (option: any) => option.orderState === 40 || option.orderState === 50,
      )

      // 필터링된 옵션을 사용하여 주문 객체 생성
      return filteredOptions.map((option: any) => {
        return {
          name: option.goodsName,
          brand: option.brandName,
          purchaseDate: format(
            parse(order.orderDate, 'yy.MM.dd', new Date()),
            'yyyy-MM-dd',
          ),
          purchaseSite: '무신사',
          imgUrl: `https:${option.goodsImage}`,
          option: option.goodsOption,
        }
      })
    })
    .flat()

  orderList.push(...orders)

  // 더 이상 주문이 없으면 종료
  if (data.list.length === 0) {
    return orderList
  }

  // 다음 페이지로 이동할 때 마지막 주문의 orderNo를 offset으로 사용
  const lastOrderNo = data.list[data.list.length - 1].orderNo
  return fetchOrderList(cookies, lastOrderNo, orderList)
}

// Main function to execute the entire flow
async function getMusinsaOrderLists(
  userId: string,
  password: string,
): Promise<Order[]> {
  const csrfToken = await fetchCSRFToken()
  const cookies = await login(csrfToken, userId, password)
  return fetchOrderList(cookies)
}

// const token =
//   'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImlkIjoiNiIsImlhdCI6MTcyMzQyNDA3NSwiZXhwIjoxNzIzNDg0MDc1fQ.OcSf5g52sKtY3-tpWzGxgOoc54JI38hAMxNDiJTohoY'
//
// const api = new ClothesApi({
//   securityWorker: async () => ({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }),
// })

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

// Function to call the startBatch API
const sendPurchaseHistoryToServer = async (
  purchaseHistory: Order[],
  accessToken: string,
) => {
  // console.log(purchaseHistory)
  // console.log('구매내역', purchaseHistory.length, '개')

  const api = createClothesApi(accessToken)

  try {
    const responseData = await api.startBatch(purchaseHistory)
    // console.log('Response data:', responseData)
    return responseData
  } catch (error) {
    console.error('Error response:', error)
    throw new Error('Failed to send purchase history to the server')
  }
}

// API route handler
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const { userId, password } = await req.json()
    const orderList = await getMusinsaOrderLists(userId, password)

    // 서버 사이드에서 쿠키에서 access token을 추출 (Next.js에서 쿠키 파싱)
    const accessToken = req.headers
      .get('cookie')
      ?.split('; ')
      .find((c) => c.startsWith('access='))
      ?.split('=')[1]
    if (!accessToken) {
      throw new Error('Access token not found')
    }

    // Order 데이터를 PurchaseHistory 타입으로 변환 후 서버에 전달
    const response = await sendPurchaseHistoryToServer(orderList, accessToken)

    // return NextResponse.json(orderList)
    return NextResponse.json(response)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
