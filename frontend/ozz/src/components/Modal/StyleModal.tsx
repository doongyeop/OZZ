'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Style, styleMap } from '@/types/clothing'

type StyleModalProps = {
  onClose: () => void
  setValue: (value: Style[]) => void
}

const styles = Object.keys(styleMap)

export default function StyleModal({ onClose, setValue }: StyleModalProps) {
  const [selectedStyles, setSelectedStyles] = useState<{
    [key: string]: boolean
  }>({
    포멀: false,
    매니시: false,
    엘레강스: false,
    에스닉: false,
    모던: false,
    내추럴: false,
    로맨틱: false,
    스포티: false,
    스트릿: false,
    캐주얼: false,
  })

  const toggleSeason = (style: string) => {
    setSelectedStyles((prevStyles) => ({
      ...prevStyles,
      [style]: !prevStyles[style],
    }))
  }

  const handleSave = () => {
    const selected: Style[] = (
      Object.keys(selectedStyles) as (keyof typeof styleMap)[]
    )
      .filter((s) => selectedStyles[s])
      .map((s) => styleMap[s])
    setValue(selected)
    onClose()
  }

  return (
    <Modal title="스타일" onClose={onClose}>
      <div className="flex flex-wrap w-full l-1 pr-2">
        {styles.map((s) => (
          <button
            key={s}
            type="button"
            className={`px-2 py-0.5 m-1 rounded-lg border-2 border-primary-400 text-sm font-semibold ${
              selectedStyles[s]
                ? 'bg-primary-400 text-secondary'
                : 'bg-secondary text-primary-400'
            }`}
            onClick={() => toggleSeason(s)}
          >
            {s}
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
