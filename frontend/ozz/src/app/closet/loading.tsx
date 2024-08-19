// import { ImSpinner8 } from 'react-icons/im'
import LoadingPage from '@/components/Loading/loading'

export default function Loading() {
  return (
    <LoadingPage
      messages={['옷을', '가져오고', '있어요']}
      footerMessage="조금만 기다려주세요..."
    />
  )
}
