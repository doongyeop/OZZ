import MallLoginForm from '@/containers/closet-page/MallLoginForm'

export default function MallLogin({ params }: { params: { mall: string } }) {
  return <MallLoginForm mall={params.mall} />
}
