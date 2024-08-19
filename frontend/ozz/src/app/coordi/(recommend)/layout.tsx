import Header from '@/components/Header'
import HeaderButton from '@/components/Button/HeaderButton'
import { WeatherProvider } from '@/contexts/WeatherContext'
import { FaBookmark } from 'react-icons/fa6'

export default function CoordiRecommendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const rightButton = <HeaderButton icon={<FaBookmark />} href="/book" />

  return (
    <WeatherProvider>
      <section>
        <Header title="추천 코디" rightButton={rightButton} />
        {children}
      </section>
    </WeatherProvider>
  )
}
