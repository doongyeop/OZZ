import { FaTrash } from 'react-icons/fa'

type ClothesDeleteButtonProps = {
  onClick: () => void
}

export default function ClothesDeleteButton({
  onClick,
}: ClothesDeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="sticky bottom-[88px] float-right me-8 bg-secondary text-primary-400 border border-primary-40 rounded-full p-4 shadow-lg flex items-center justify-center"
      style={{ width: '60px', height: '60px' }}
      type="button"
      aria-label="Delete"
    >
      <FaTrash size={20} />
    </button>
  )
}
