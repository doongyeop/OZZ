import Header from '@/components/Header'

export default function ClosetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header title="나의 옷짱" />
      {children}
    </section>
  )
}
