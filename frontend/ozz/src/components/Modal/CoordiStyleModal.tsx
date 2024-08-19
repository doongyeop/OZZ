'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { Style, styleMap } from '@/types/clothing'
import AlertModal from '@/components/Modal/AlertModal'

type StyleModalProps = {
  onClose: () => void
  setValue: (value: Style[]) => void
  onPrev: () => void
}

const styles = Object.keys(styleMap)

export default function CoordiStyleModal({
  onClose,
  setValue,
  onPrev,
}: StyleModalProps) {
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
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const toggleSeason = (style: string) => {
    setSelectedStyles((prevStyles) => ({
      ...prevStyles,
      [style]: !prevStyles[style],
    }))
  }

  const handleSave = () => {
    if (!selectedStyles) {
      setAlertMessage(['적어도 하나의 스타일', ' 태그를 선택하세요'])
      setIsAlertOpen(true)
      return
    }
    const selected: Style[] = (
      Object.keys(selectedStyles) as (keyof typeof styleMap)[]
    )
      .filter((s) => selectedStyles[s])
      .map((s) => styleMap[s])
    setValue(selected)
  }
  const handleAlertClose = () => {
    setIsAlertOpen(false)
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
      <div className="flex justify-center space-x-2 mt-5">
        <Button
          variant="outline"
          onClick={onPrev}
          className="w-16 h-8 px-4 py-2 rounded-3xl"
        >
          이전
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          className="w-16 h-8 px-4 py-2 rounded-3xl"
        >
          다음
        </Button>
      </div>
      {isAlertOpen && (
        <AlertModal onClose={handleAlertClose} messages={alertMessage} />
      )}
    </Modal>
  )
}
