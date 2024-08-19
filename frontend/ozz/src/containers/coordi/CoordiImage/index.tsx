import styles from '@/styles/FittingPage.module.css'
import Image from 'next/image'
import { useQueries } from '@tanstack/react-query'
import { fetchImage } from '@/services/clothingApi'
import { Style } from '@/types/clothing'

interface CoordiItem {
  id: number
  imgPath: string
  offset: number
}
interface Coordination {
  title: string
  items: CoordiItem[]
  style: Style
}

const categoryOffsetMap: { [key: string]: string } = {
  1: 'top',
  2: 'bottom',
  3: 'outer',
  4: 'onepiece',
  5: 'shoes',
  6: 'accessory',
  7: 'bag',
}

interface FittingItem {
  category: string
  type: string
  image: string | null
}

const pastelColors = [
  { name: 'Light Baby Blue', hex: '#D0E7FF' },
  { name: 'Pale Lavender', hex: '#E6E6FA' },
  { name: 'Soft Peach', hex: '#FFE5D9' },
  { name: 'Mint Cream', hex: '#F5FFFA' },
  { name: 'Blush Pink', hex: '#FFDDE1' },
  { name: 'Lemon Chiffon', hex: '#FFF9DB' },
]

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length)
  return pastelColors[randomIndex].hex
}

export default function CoordiImage({ coordi }: { coordi: Coordination }) {
  // 각 item의 imgPath에 대해 fetchImage를 호출하여 이미지를 가져오는 쿼리 생성
  const queries =
    coordi?.items.map((item) => ({
      queryKey: ['image', item.imgPath],
      queryFn: () => fetchImage(item.imgPath),
      enabled: !!item.imgPath,
    })) || []

  // useQueries 호출
  const imageResults = useQueries({ queries })

  const fittingItems: FittingItem[] = [
    // 가상피팅 배경의 컴포넌트
    { category: '악세서리', type: 'accessory', image: null },
    { category: '원피스', type: 'onepiece', image: null },
    { category: '상의', type: 'top', image: null },
    { category: '아우터', type: 'outer', image: null },
    { category: '하의', type: 'bottom', image: null },
    { category: '신발', type: 'shoes', image: null },
    { category: '가방', type: 'bag', image: null },
  ]

  if (!coordi) return <div>something went wrong</div>

  // fittingItems 배열에 이미지 매핑
  coordi.items.forEach((item, index) => {
    const category = categoryOffsetMap[item.offset.toString()]
    const fitting = fittingItems.find(
      (fittingItem) => fittingItem.type === category,
    )
    if (fitting && imageResults[index]?.data) {
      fitting.image = imageResults[index]?.data
    }
  })

  const bgColor = getRandomColor()

  return (
    <div
      className="flex flex-col w-full h-full p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${styles.clothingGrid} w-full h-full `}>
        {fittingItems.map((item) => (
          <div
            key={item.type}
            className={`${styles.clothingItem} ${styles[item.type]}`}
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.category}
                fill
                className="object-top object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
