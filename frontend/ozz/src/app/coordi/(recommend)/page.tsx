import Weather from '@/containers/coordi/Weather'
import SelectOptions from '@/containers/coordi/SelectOptions'
import CoordiOfTheDay from '@/containers/coordi/CoordiOfTheDay'
import { WeatherProvider } from '@/contexts/WeatherContext'
import { cookies } from 'next/headers'

export default function CoordiRecommendPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')?.value

  return (
    <WeatherProvider>
      <Weather />
      <SelectOptions />
      {/* <CoordiOfTheDay token="eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImlkIjoiNiIsImlhdCI6MTcyMzY4ODYxOCwiZXhwIjoxNzIzNzQ4NjE4fQ.tyPkEUTwlYdG_VTSSlqKXiL1kgNiCrTWi2lhEw-q_W8" /> */}
      <CoordiOfTheDay token={accessToken || ''} />
    </WeatherProvider>
  )
}
