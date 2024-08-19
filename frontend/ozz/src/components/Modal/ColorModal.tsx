'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Color, colors } from '@/types/clothing'

type ColorModalProps = {
  onClose: () => void
  setValue: (value: Color[]) => void
}

export default function ColorModal({ onClose, setValue }: ColorModalProps) {
  const [selectedColor, setSelectedColor] = useState<Color[]>([])

  const handleColorClick = (color: Color) => {
    const isSelected = selectedColor.find((c) => c.name === color.name)

    if (isSelected) {
      // 이미 선택된 색상일 경우 배열에서 제거
      setSelectedColor((prevColors) =>
        prevColors.filter((prevColor) => prevColor.name !== color.name),
      )
    } else {
      // 선택된 색상이 아니면 배열에 추가
      setSelectedColor((prevColors) => [...prevColors, color])
    }
  }

  const handleSave = () => {
    setValue(selectedColor)
    onClose()
  }

  return (
    <Modal title="색" onClose={onClose}>
      <div className="flex flex-wrap w-full">
        {colors.map((color) => (
          <button
            type="button"
            key={color.code}
            className={`p-1 mr-1 mb-1 rounded-xl text-xs font-semibold border-2 border-primary-400 ${
              selectedColor.some((sc) => sc.code === color.code)
                ? 'bg-primary-400 text-secondary'
                : 'bg-secondary text-primary-400'
            }`}
            onClick={() => handleColorClick(color)}
          >
            <div className="flex">
              <span
                className="inline-block w-4 h-4 rounded-full mr-1"
                style={{ backgroundColor: color.colorCode }}
              />
              <span className="mr-0.5">{color.name}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2 flex w-full justify-center">
        <button
          type="button"
          className="w-[55px] h-[25px] border-2 border-primary-400 rounded-2xl bg-secondary text-primary-400 text-xs font-semibold hover:bg-primary-400 hover:text-secondary"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </Modal>
  )
}
