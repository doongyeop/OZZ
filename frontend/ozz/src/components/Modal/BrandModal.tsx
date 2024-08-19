'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import { HiPencil } from 'react-icons/hi'

type BrandModalProps = {
  onClose: () => void
  setValue: (value: string) => void
}

export default function BrandModal({ onClose, setValue }: BrandModalProps) {
  const [brand, setBrand] = useState<string>('')

  const handleSave = () => {
    setValue(brand)
    onClose()
  }

  return (
    <Modal title="브랜드" onClose={onClose}>
      <div className="flex justify-between border-2 border-primary-400 pl-1 pr-2">
        <HiPencil className="text-primary-400" size={28} />
        <input
          className="w-full pt-1 pb-1 bg-secondary text-primary-400 outline-none text-right font-bold"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div className="mt-2 flex w-full justify-center">
        <button
          className="w-[55px] h-[25px] border-2 border-primary-400 rounded-2xl bg-secondary text-primary-400 text-xs font-semibold hover:bg-primary-400 hover:text-secondary"
          onClick={handleSave}
          type="button"
        >
          저장
        </button>
      </div>
    </Modal>
  )
}
