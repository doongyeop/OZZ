import HeaderWithBackward from '@/components/HeaderWithBackward'

export default function FittingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <HeaderWithBackward title="가상 피팅" />
      {children}
    </section>
  )
}
