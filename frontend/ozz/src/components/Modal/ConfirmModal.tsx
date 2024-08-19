import React from 'react'
import { Button } from '@/components/ui/button'

type ConfirmModalProps = {
  onClose: () => void
  onConfirm: () => void
  message: string | JSX.Element
  messageClassName?: string
}

export default function ConfirmModal({
  onClose,
  onConfirm,
  message,
  messageClassName = '',
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary bg-opacity-50">
      <div className="bg-secondary rounded-xl shadow-lg overflow-hidden w-[240px] max-w-lg p-4">
        <div className="flex justify-end items-center">
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
        <h3
          className={`text-lg font-semibold text-primary-400 text-center my-3 ${messageClassName}`}
        >
          {message}
        </h3>
        <div className="flex justify-center space-x-2 mt-5">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-16 h-8 px-4 py-2 rounded-3xl"
          >
            아니오
          </Button>
          <Button
            variant="outline"
            onClick={onConfirm}
            className="w-16 h-8 px-4 py-2 rounded-3xl"
          >
            예
          </Button>
        </div>
      </div>
    </div>
  )
}
