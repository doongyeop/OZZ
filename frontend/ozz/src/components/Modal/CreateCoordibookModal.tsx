import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'

interface CreateCoordiBookModalProps {
  onClose: () => void
  onCreate: (name: string) => void
}

export default function CreateCoordiBookModal({
  onClose,
  onCreate,
}: CreateCoordiBookModalProps) {
  const [newGroupName, setNewGroupName] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  const handleCreate = () => {
    if (newGroupName.trim()) {
      onCreate(newGroupName)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-primary-400 text-center">
            코디북 이름
          </h2>
          <button
            onClick={onClose}
            className="text-primary-400"
            type="button"
            aria-label="모달 닫기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="예시) 자주 입는 옷"
              className={`border border-primary-400 bg-secondary p-2 pl-10 w-full focus:outline-none text-right ${
                inputFocused
                  ? 'text-primary-400'
                  : 'text-primary-400 text-opacity-30'
              }`}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <HiPencil className="w-5 h-5 fill-primary-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="px-3 py-1 mt-4 rounded-full text-sm text-primary-400 border border-primary-400 font-bold hover:text-secondary hover:bg-primary-400"
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  )
}
