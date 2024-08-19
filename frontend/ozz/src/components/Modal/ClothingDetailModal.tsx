import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ClothingData, keyLabelMap } from '@/types/clothing'
import { fetchMockClothing } from '@/services/clothingApi'
import ScrollableModal from './ScrollableModal'

type ClothingDetailsModalProps = {
  isOpen: boolean
  onClose: () => void
  clothesId: number
}

export default function ClothingDetailsModal({
  isOpen,
  onClose,
  clothesId,
}: ClothingDetailsModalProps) {
  const [clothingData, setClothingData] = useState<ClothingData | null>(null)

  //   useEffect(() => {
  //     if (isOpen) {
  //       axios
  //         .get(`/api/clothes/${clothesId}`)
  //         .then((response) => {
  //           setClothingData(response.data)
  //         })
  //         .catch((error) => {
  //           console.error('Failed to fetch clothing details', error)
  //         })
  //     }
  //   }, [isOpen, clothesId])
  useEffect(() => {
    if (isOpen) {
      setClothingData(fetchMockClothing(1))
    }
  }, [isOpen, clothesId])

  if (!isOpen || !clothingData) return null

  return (
    <ScrollableModal onClose={onClose} width="w-[350px]">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center mb-4 bg-gray-light rounded-sm  min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px]">
          <Image
            src="/images/mockup/tops01.png"
            alt={clothingData.name}
            className="p-6 object-cover"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            width={300}
            height={300}
          />
        </div>
        <div className="bg-secondary max-w-[300px] rounded-lg p-4">
          <div className="flex items-center mb-5">
            <h2
              className="flex-1 py-2 text-center bg-secondary font-extrabold text-lg
                    text-primary-400 placeholder:text-gray-light outline-none truncate"
            >
              {clothingData.name}
            </h2>
          </div>
          <div className="w-full max-w-md text-gray-light rounded-lg shadow-md space-y-2 mb-8">
            <div className="">
              {Object.entries(clothingData).map(([key, value]) => {
                if (key === 'image') return null // 이미지 처리 제외
                if (key === 'name') return null
                if (key === 'id') return null

                const displayValue = Array.isArray(value)
                  ? value
                      .map((item) => (item.name ? item.name : item))
                      .join(', ')
                  : value?.name || value

                return (
                  <div
                    key={key}
                    className="flex justify-between mb-2 border-b border-[#000000] border-opacity-30 py-2"
                  >
                    <span className="text-gray-light">
                      {keyLabelMap[key] || key}
                    </span>
                    <span className="text-primary-400">
                      {displayValue || ''}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </ScrollableModal>
  )
}
