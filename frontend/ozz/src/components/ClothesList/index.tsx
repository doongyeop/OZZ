import Link from 'next/link'
import Image from 'next/image'
import { useSelectedItem } from '@/contexts/SelectedItemContext'
import { ClothesBasicWithFileResponse } from '@/types/clothes/data-contracts'

interface ClothesListProps {
  clothingList: (ClothesBasicWithFileResponse & { imageUrl: string })[]
  isSelectable: boolean
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

export default function ClothesList({
  clothingList,
  isSelectable,
}: ClothesListProps) {
  const { selectedItem, setSelectedItem } = useSelectedItem()

  const handleSelectItem = (
    item: ClothesBasicWithFileResponse & { imageUrl: string },
  ) => {
    if (selectedItem && selectedItem.clothesId === item.clothesId) {
      setSelectedItem(null)
    } else {
      setSelectedItem(item)
    }
  }

  return (
    <div className="flex flex-col justify-start items-center">
      {clothingList.map((item) =>
        isSelectable ? (
          <div
            role="presentation"
            key={item.clothesId}
            className={`px-5 w-full hover:bg-primary-100 active:bg-primary-100 cursor-pointer transition duration-150 ${
              selectedItem && selectedItem.clothesId === item.clothesId
                ? 'bg-primary-100'
                : ''
            }`}
            onClick={() => handleSelectItem(item)}
          >
            <div className="flex items-center mb-4 mt-4">
              <Image
                src={item.imageUrl}
                alt={item.name ?? 'No name'}
                width={75}
                height={75}
                className="mr-4 aspect-square object-contain"
                priority
              />
              <div>
                <div className="text-sm text-gray-500">
                  {item.createdDate
                    ? formatDate(item.createdDate)
                    : 'No date available'}
                </div>
                <div className="text-lg font-semibold">
                  {item.name ?? 'Unnamed Item'}
                </div>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <Link
            key={item.clothesId}
            href={`/closet/modify/${item.clothesId}`}
            passHref
            className="px-5 w-full hover:bg-primary-100 active:bg-primary-100  transition duration-150"
          >
            <div className="flex items-center mb-4 mt-4 cursor-pointer">
              <Image
                src={item.imageUrl ?? '/images/mockup/tops11.png'}
                alt={item.name ?? 'No name available'}
                width={75}
                height={75}
                className="mr-4 aspect-square object-contain"
                priority
              />
              <div>
                <div className="text-sm text-gray-500">
                  {item.createdDate
                    ? formatDate(item.createdDate)
                    : 'No date available'}
                </div>
                <div className="text-lg font-semibold">
                  {item.name ?? 'Unnamed Item'}
                </div>
              </div>
            </div>
            <hr />
          </Link>
        ),
      )}
    </div>
  )
}
