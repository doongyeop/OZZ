'use client'

import Modal from '@/components/Modal'
import { Size } from '@/types/clothing'

type SizeModalProps = {
  onClose: () => void
  setValue: (value: Size) => void
}

const sizes: Size[] = ['FREE', 'S', 'M', 'L', 'XL', 'XXL']

export default function SizeModal({ onClose, setValue }: SizeModalProps) {
  const handleSave = (size: Size) => {
    setValue(size)
    onClose()
  }

  return (
    <Modal title="사이즈" onClose={onClose}>
      <div className="flex flex-wrap w-full l-1 pr-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            className="px-2 py-0.5 m-1 rounded-lg border-2 border-primary-400 text-primary-400 text-sm font-semibold"
            onClick={() => handleSave(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </Modal>
  )
}
