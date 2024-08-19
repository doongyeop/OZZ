'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'

type MemoModalProps = {
  onClose: () => void
  setValue: (value: string) => void
}

export default function MemoModal({ onClose, setValue }: MemoModalProps) {
  const [memo, setMemo] = useState<string>('')
  const maxChars = 100

  const handleSave = () => {
    if (memo.length <= maxChars) {
      setValue(memo)
      onClose()
    }
  }

  return (
    <Modal title="메모" onClose={onClose}>
      <div className="flex justify-between border-2 border-primary-400 pl-1 pr-2">
        <textarea
          value={memo}
          spellCheck="false"
          onChange={(e) => setMemo(e.target.value)}
          className="w-full pt-1 pb-1 bg-secondary text-primary-400 outline-none text-left font-bold placeholder:text-primary-800"
          rows={5}
          maxLength={maxChars}
          placeholder="메모를 입력하세요 (100자 이내)"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-primary-400">
          {memo.length}/{maxChars}
        </span>
        {memo.length > maxChars && (
          <span className="text-sm text-red-600">
            100자 이상 쓸 수 없습니다.
          </span>
        )}
      </div>
      <div className="mt-2 flex w-full justify-center">
        <button
          type="button"
          className="w-[55px] h-[25px] border-2 border-primary-400 rounded-2xl bg-secondary text-primary-400 text-xs font-semibold hover:bg-primary-400 hover:text-secondary"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </Modal>
  )
}
