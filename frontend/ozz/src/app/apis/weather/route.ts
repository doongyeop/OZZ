import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const getWeatherDescription = (id: number): string => {
  switch (true) {
    case id >= 200 && id < 300:
      return '뇌우'
    case id >= 300 && id < 400:
      return '이슬비'
    case id !== 511 && id >= 500 && id < 600:
      return id >= 520 && id <= 531 ? '소나기' : '비'
    case id === 511 || (id >= 600 && id < 700):
      return '눈'
    case id >= 700 && id < 800:
      switch (id) {
        case 701:
        case 721:
        case 741:
          return '안개'
        case 711:
          return '연기'
        case 731:
        case 751:
        case 761:
          return '먼지'
        case 762:
          return '화산재'
        case 771:
          return '돌풍'
        case 781:
          return '토네이도'
        default:
          return '대기 현상'
      }
    case id === 800:
      return '맑음'
    case id === 801:
      return '구름 조금'
    case id === 802:
      return '구름 보통'
    case id === 803:
      return '구름 많음'
    case id === 804:
      return '흐림'
    default:
      return '알 수 없음'
  }
}

const getWeatherIcon = (weather: {
  id: number
  description: string
}): string => {
  const { id, description } = weather

  switch (true) {
    case id >= 200 && id < 300:
      return 'thunderstorm.png'
    case id >= 300 && id < 400:
      return description.includes('shower') ? 'shower.png' : 'drizzle.png'
    case id !== 511 && id >= 500 && id < 600:
      return description.includes('shower') ? 'shower.png' : 'rain.png'
    case id === 511 || (id >= 600 && id < 700):
      return 'snow.png'
    case id >= 700 && id < 800:
      return 'atmosphere.png'
    case id === 800:
      return 'clear.png'
    case id === 801:
      return 'few-clouds.png'
    case id === 802:
      return 'scattered-clouds.png'
    case id >= 803 && id <= 804:
      return 'clouds.png'
    default:
      return 'clear.png'
  }
}

const getSeason = (month: number): string => {
  switch (month) {
    case 3:
    case 4:
    case 5:
      return '봄'
    case 6:
    case 7:
    case 8:
      return '여름'
    case 9:
    case 10:
    case 11:
      return '가을'
    case 12:
    case 1:
    case 2:
      return '겨울'
    default:
      return ''
  }
}

const API_KEY = process.env.OPENWEATHERMAP_API_KEY

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude' },
      { status: 400 },
    )
  }
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`

  const response = await fetch(url)

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 },
    )
  }

  const data = await response.json()
  const weatherData = data.daily.slice(0, 7).map((day: any) => {
    const date = new Date(day.dt * 1000)
    const weatherId = day.weather[0].id

    return {
      dayOfWeek: format(date, 'EEE', { locale: ko }),
      date: format(date, 'MM/dd'),
      minTemp: Math.round(day.temp.min),
      maxTemp: Math.round(day.temp.max),
      description: getWeatherDescription(weatherId),
      humidity: day.humidity,
      icon: getWeatherIcon(day.weather[0]),
      season: getSeason(date.getMonth() + 1),
    }
  })

  return NextResponse.json(weatherData)
}
