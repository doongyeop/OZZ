'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Pattern, patternMap } from '@/types/clothing'

type PatternModalProps = {
  onClose: () => void
  setValue: (value: Pattern[]) => void
}

const patterns = [
  { name: '무지', img: '/images/patterns/plain.png' },
  { name: '줄무늬', img: '/images/patterns/striped.png' },
  { name: '지그재그', img: '/images/patterns/zigzag.png' },
  { name: '호피', img: '/images/patterns/leopard.png' },
  { name: '지브라', img: '/images/patterns/zebra.png' },
  { name: '아가일', img: '/images/patterns/argyle.png' },
  { name: '도트', img: '/images/patterns/dot.png' },
  { name: '페이즐리', img: '/images/patterns/paisley.png' },
  { name: '카모플라쥬', img: '/images/patterns/camouflage.png' },
  { name: '플로럴', img: '/images/patterns/floral.png' },
  { name: '레터링', img: '/images/patterns/lettering.png' },
  { name: '그래픽', img: '/images/patterns/graphic.png' },
  { name: '해골', img: '/images/patterns/skull.png' },
  { name: '타이다이', img: '/images/patterns/tie-dye.png' },
  { name: '깅엄', img: '/images/patterns/gingham.png' },
  { name: '그라데이션', img: '/images/patterns/gradation.png' },
  { name: '체크', img: '/images/patterns/check.png' },
  { name: '하운즈투스', img: '/images/patterns/houndstooth.png' },
]

export default function PatternModal({ onClose, setValue }: PatternModalProps) {
  const [selectedPattern, setSelectedPattern] = useState<Pattern[]>([])

  const handlePatternClick = (pattern: { name: string; img: string }) => {
    const patternKey = patternMap[pattern.name]
    const isSelected = selectedPattern.includes(patternKey)

    if (isSelected) {
      setSelectedPattern(selectedPattern.filter((p) => p !== patternKey))
    } else {
      setSelectedPattern([...selectedPattern, patternKey])
    }
  }

  const handleSave = () => {
    setValue(selectedPattern)
    onClose()
  }

  return (
    <Modal title="패턴" onClose={onClose} width="w-[300px]">
      <div className="flex flex-wrap w-full">
        {patterns.map((pattern) => (
          <button
            key={pattern.name}
            type="button"
            className={`p-1 mr-1 mb-1 rounded-xl text-xs font-semibold border-2 border-primary-400  ${
              selectedPattern.includes(patternMap[pattern.name])
                ? 'bg-primary-400 text-secondary'
                : 'bg-secondary text-primary-400'
            }`}
            onClick={() => handlePatternClick(pattern)}
          >
            <div className="flex">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-light">
                <img
                  src={pattern.img}
                  alt={pattern.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2">{pattern.name}</span>
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
