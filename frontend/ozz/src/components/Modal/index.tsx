import React from 'react'

interface ModalProps {
  onClose: () => void
  title?: string
  children: React.ReactNode
  width?: string
  className?: string // 추가
}

export default function Modal({
  onClose,
  title,
  children,
  width,
  className,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary bg-opacity-50">
      <div
        className={`bg-secondary rounded-xl shadow-lg ${width || 'w-[250px]'} max-w-lg ${className || 'overflow-hidden'}`}
      >
        <div className="flex justify-between items-center pt-3 pl-4 pr-3">
          <h3 className="text-lg font-semibold text-primary-400">{title}</h3>
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
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
