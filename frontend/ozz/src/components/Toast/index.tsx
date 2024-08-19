'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 1500) // 1.5초후 닫히기

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] p-4 bg-secondary text-primary-400 text-center rounded shadow-lg">
      {message}
    </div>
  )
}
