'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { HiPencil } from 'react-icons/hi'
import AlertModal from './AlertModal'

type CoordiNameModalProps = {
  onClose: () => void
  setValue: (value: string) => void
}

export default function CoordiNameModal({
  onClose,
  setValue,
}: CoordiNameModalProps) {
  const [coordiName, setCoordiName] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const handleSave = () => {
    if (coordiName.trim() === '') {
      setAlertMessage(['코디 이름을 입력해주세요'])
      setIsAlertOpen(true)
      return
    }
    setValue(coordiName)
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <Modal title="코디 이름" onClose={onClose}>
      <div className="flex justify-between border-2 border-primary-400 pl-1 pr-2">
        <HiPencil className="text-primary-400" size={28} />
        <input
          className="w-full pt-1 pb-1 bg-secondary text-primary-400 outline-none text-right font-bold"
          type="text"
          value={coordiName}
          onChange={(e) => setCoordiName(e.target.value)}
        />
      </div>
      <div className="flex justify-center space-x-2 mt-5">
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
