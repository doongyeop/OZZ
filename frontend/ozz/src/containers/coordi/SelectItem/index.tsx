'use client'

import { useSelectedItem } from '@/contexts/SelectedItemContext'
import { useRouter } from 'next/navigation'
import UserCloset from '@/components/UserCloset'

export default function SelectItemContainer() {
  const { selectedItem } = useSelectedItem()
  const router = useRouter()

  const handleComplete = () => {
    if (selectedItem) {
      router.push('/coordi')
    }
  }

  return (
    <>
      <div className="m-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">필수 아이템 고르기</h1>
          <p className="text-xs text-secondary">
            코디에 꼭 필요한 아이템 하나를 선택해 주세요!
          </p>
        </div>
        <button
          type="button"
          className={`rounded-lg px-3 py-1 ${
            selectedItem
              ? 'bg-secondary text-primary-400'
              : 'border border-gray-dark text-gray-dark'
          }`}
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
      <UserCloset categoryHighId="" categoryLowId="" isSelectable />
    </>
  )
}
