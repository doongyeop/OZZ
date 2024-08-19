import { useState } from 'react'

import { FavoriteGroupCreateRequest } from '@/types/favorite/data-contracts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFavoriteGroup } from '@/services/favoriteApi'
import CreateCoordibookModal from './CreateCoordibookModal'
import AlertModal from './AlertModal'
import { Button } from '../ui/button'

type FavoriteGroup = {
  favoriteGroupId: number
  name: string
}

interface CoordiBookSelectModalProps {
  favoriteGroups: FavoriteGroup[]
  onSelect: (favoriteGroupId: number) => void
  onClose: () => void
}

export default function CoordiBookSelectModal({
  favoriteGroups,
  onSelect,
  onClose,
}: CoordiBookSelectModalProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const handleCreateCoordiBook = async (name: string) => {
    if (name.length > 10 || name.length <= 0) {
      setAlertMessage(['코디북 이름은', '1-10글자여야 합니다'])
      setIsAlertOpen(true)
      return
    }

    const requestData: FavoriteGroupCreateRequest = {
      name,
    }
    try {
      const createdGroup = await createFavoriteGroup(requestData)
      // 새로운 코디북을 선택된 것으로 처리
      onSelect(createdGroup.favoriteGroupId)
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('코디북 생성 실패:', error)
      setAlertMessage(['코디북 생성 실패', '다시 시도해주세요'])
      setIsAlertOpen(true)
      // 에러 처리 (예: 에러 메시지 표시)
    }
  }
  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-4 rounded-lg shadow-lg max-w-sm w-full max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-primary-400 text-center">
            코디북 선택
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
        <ScrollArea className="h-[30vh] scroll-area">
          <ul className="space-y-2">
            {/* 코디북 새로 생성하기 버튼 */}
            <li>
              <Button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full text-left py-2 px-4 rounded-lg border-primary-400"
              >
                + 코디북 새로 생성하기
              </Button>
            </li>
            {favoriteGroups.map((group) => (
              <li key={group.favoriteGroupId}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onSelect(group.favoriteGroupId)}
                  className="w-full text-left py-2 px-4 rounded-lg"
                >
                  {group.name}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {isCreateModalOpen && (
        <CreateCoordibookModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateCoordiBook}
        />
      )}
      {isAlertOpen && (
        <AlertModal onClose={handleAlertClose} messages={alertMessage} />
      )}
    </div>
  )
}
