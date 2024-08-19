'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Texture, textureMap } from '@/types/clothing'

type TextureModalProps = {
  onClose: () => void
  setValue: (value: Texture[]) => void
}

type MaterialType = {
  [key: string]: boolean
}

const mainMaterials = [
  '스웨이드',
  '린넨',
  '앙고라',
  '데님',
  '실크',
  '스판덱스',
  '가죽',
  '면',
  '울',
  '폴리',
  '기타',
]

const otherMaterials = [
  '퍼',
  '니트',
  '무스탕',
  '레이스',
  '메시',
  '코듀로이',
  '플리스',
  '시퀸글리터',
  '네오프렌',
  '저지',
  '트위드',
  '자카드',
  '벨벳',
  '비닐',
  '쉬폰',
]

export default function TextureModal({ onClose, setValue }: TextureModalProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialType>({})
  const [showOtherMaterials, setShowOtherMaterials] = useState(false)

  const handleMaterialClick = (material: string) => {
    if (material === '기타') {
      setShowOtherMaterials(!showOtherMaterials)
    } else {
      setSelectedMaterials((prev) => ({
        ...prev,
        [material]: !prev[material],
      }))
    }
  }

  const handleSave = () => {
    const selectedList: Texture[] = Object.entries(selectedMaterials)
      .filter(([, isSelected]) => isSelected)
      .map(([material]) => textureMap[material as keyof typeof textureMap])
    setValue(selectedList)
    onClose()
  }

  const getButtonClassName = (material: string) => {
    if (material === '기타') {
      return showOtherMaterials
        ? 'border-primary-400 text-secondary bg-primary-400'
        : 'border-primary-400 text-primary-400 bg-secondary'
    }
    return selectedMaterials[material]
      ? 'border-primary-400 text-secondary bg-primary-400'
      : 'border-primary-400 text-primary-400 bg-secondary'
  }

  return (
    <Modal title="소재" onClose={onClose}>
      <div className="flex flex-wrap w-full l-1 pr-2">
        {mainMaterials.map((material) => (
          <button
            key={material}
            type="button"
            className={`px-2 py-0.5 m-1 rounded-lg border-2 text-sm ${getButtonClassName(material)}`}
            onClick={() => {
              if (material === '기타') {
                setShowOtherMaterials(!showOtherMaterials)
              } else {
                handleMaterialClick(material)
              }
            }}
          >
            {material}
          </button>
        ))}
        {showOtherMaterials && (
          <div className="flex flex-wrap">
            {otherMaterials.map((material) => (
              <button
                key={material}
                type="button"
                className={`px-2 py-0.5 m-1 rounded-lg border-2 text-sm ${
                  selectedMaterials[material]
                    ? 'border-primary-400 text-secondary bg-primary-400'
                    : 'border-primary-400 text-primary-400 bg-secondary'
                }`}
                onClick={() => handleMaterialClick(material)}
              >
                {material}
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 flex w-full justify-center">
          <button
            type="button"
            className="w-[55px] h-[25px] border-2 border-primary-400 rounded-2xl bg-secondary text-primary-400 text-xs font-semibold hover:bg-primary-400 hover:text-secondary"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  )
}
