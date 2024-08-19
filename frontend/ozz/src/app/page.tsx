import Header from '@/components/Header'
import MainPageContainer from '@/containers/main-page/Container'
import { cookies } from 'next/headers'
import StartPage from '@/containers/main-page/StartPage'

export default function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')

  if (!accessToken) {
    return <StartPage />
  }

  return (
    <>
      <Header title="OZZ" />
      <MainPageContainer />
    </>
  )
}
