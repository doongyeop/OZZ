import React from 'react'
import { Button } from '@/components/ui/button'
import { BiSolidError } from 'react-icons/bi'

type AlertModalProps = {
  onClose: () => void
  messages: string[]
}

export default function AlertModal({ onClose, messages }: AlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary bg-opacity-50">
      <div className="bg-secondary rounded-xl shadow-lg overflow-hidden w-[240px] max-w-lg p-4">
        <div className="flex flex-col justify-center my-5">
          <div className="flex justify-center mb-5">
            <BiSolidError size={50} className=" text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-primary-400 text-center mb-4">
            {messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </h3>
        </div>
        <div className="flex justify-center text-center space-x-2 mt-5">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-16 h-8 px-4 py-2 rounded-3xl"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}
