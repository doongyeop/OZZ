import { useState } from 'react'
import styles from '@/styles/ClothingTag.module.css'
import ClothingDetailsModal from '../Modal/ClothingDetailModal'

type ClothingTagProps = {
  name: string
  x_position: number
  y_position: number
  clothesId: number
}

export default function ClothingTag({
  name,
  x_position,
  y_position,
  clothesId,
}: ClothingTagProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <button
        type="button"
        aria-label="옷 태그"
        className={`absolute ${styles.tag}`}
        style={{
          top: `${y_position * 30}%`,
          left: `${x_position * 20}%`,
        }}
        onClick={handleOpenModal}
      >
        <span className="ml-1 text-xs">{name}</span>
      </button>
      <ClothingDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        clothesId={clothesId}
      />
    </>
  )
}
