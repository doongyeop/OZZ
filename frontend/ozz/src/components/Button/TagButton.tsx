'use client'

import { ReactNode } from 'react'

interface TagButtonProps {
  isSelected: boolean
  onClick?: () => void
  children: ReactNode
}

export default function TagButton({
  isSelected,
  onClick,
  children,
}: TagButtonProps) {
  return (
    <button
      type="button"
      className={`py-0.5 px-2 rounded-full text-sm border ${
        isSelected
          ? 'bg-primary-100 border-primary-400'
          : 'bg-white border-primary-100'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
