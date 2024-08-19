import Link from 'next/link'
import Thumbnails from '../Thumbnails'

const items = [
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/36996/detail_36996_66a197b67daad_500.jpg?w=1000',
    likes: 123,
    style: '스트릿',
    age: '10세 미만',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
    likes: 98,
    style: '캐주얼',
    age: '10대',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
    likes: 150,
    style: '스포티',
    age: '20대',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/37026/detail_37026_66a2ee8c7c5fa_500.jpg?w=1000',
    likes: 200,
    style: '포멀',
    age: '30대',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/36996/detail_36996_66a197b67daad_500.jpg?w=1000',
    likes: 75,
    style: '로맨틱',
    age: '40대',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
    likes: 89,
    style: '매니시',

    age: '50대',
  },
  {
    image:
      'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
    likes: 110,
    style: '모던',
    age: '60대 이상',
  },
] // 한 페이지 24개 예정...

export default function CommunityPreview() {
  return (
    <div>
      <div className="m-4 mb-2 flex justify-end text-secondary/50 underline underline-offset-2 decoration-secondary/25  hover:text-secondary hover:decoration-secondary">
        <Link href="/community/all">전체보기 &gt;</Link>
      </div>
      <Thumbnails type="hot" items={items} />
      <Thumbnails type="style" items={items} />
      <Thumbnails type="age" items={items} />
    </div>
  )
}
