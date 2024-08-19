'use client'

import React, { useState, useEffect, useRef } from 'react'
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi'
import Image from 'next/image'
import { getCoordinateList } from '@/services/clothingApi'
import { downloadFile } from '@/services/fileApi'
import { addFavorite, deleteFavorite1 } from '@/services/favoriteApi'
import Toast from '../Toast'
import ConfirmModal from './ConfirmModal'

interface CoordiViewModalProps {
  onClose: () => void
  favoriteGroupId: number
}

export default function CoordiViewModal({
  onClose,
  favoriteGroupId,
}: CoordiViewModalProps) {
  const [coordinates, setCoordinates] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedCoordinateId, setSelectedCoordinateId] = useState<
    number | null
  >(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null)

  const itemsPerPage = 10

  // 모든 코디 이미지 불러오기
  const fetchAllCoordinates = async () => {
    setLoading(true)

    const condition = {}
    const pageable = {
      page: 0,
      size: 1000, // 대략적인 최대 개수를 설정
    }

    try {
      const response = await getCoordinateList(condition, pageable)
      const coordinatesWithImages = await Promise.all(
        response.content.map(async (coordinate: any) => {
          const file = await downloadFile(coordinate.imageFile.filePath)
          const imageUrl = file ? URL.createObjectURL(file) : ''
          return { ...coordinate, imageUrl }
        }),
      )
      setCoordinates(coordinatesWithImages)
    } catch (error) {
      console.error('Error fetching coordinates:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCoordi = async () => {
    if (selectedCoordinateId === null) return

    try {
      const response = await deleteFavorite1(
        favoriteGroupId,
        selectedCoordinateId,
      )
      if (response.status === 204) {
        // 삭제된 코디를 상태에서 제거
        setCoordinates((prev) =>
          prev.filter(
            (coordinate) => coordinate.coordinateId !== selectedCoordinateId,
          ),
        )
        setShowConfirmModal(false)
        setToastMessage('코디가 삭제되었습니다.')
      }
    } catch (err) {
      console.log('코디 삭제 중 문제 발생:', err)
    }
  }

  useEffect(() => {
    fetchAllCoordinates() // 모든 코디를 처음에 불러옴
  }, [])

  const handleAddFavorite = async () => {
    if (selectedCoordinateId === null) return

    try {
      await addFavorite(favoriteGroupId, selectedCoordinateId)
      setToastMessage('코디북에 코디가 추가되었습니다.')
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생:', error)
    }
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(coordinates.length / itemsPerPage)),
    )
  }

  // long press 이벤트 처리
  const startLongPress = (coordiId: number) => {
    longPressTimeout.current = setTimeout(() => {
      setSelectedCoordinateId(coordiId)
      setShowConfirmModal(true)
    }, 500) // 500ms 이상 클릭 시 실행
  }

  const clearLongPress = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current)
      longPressTimeout.current = null
    }
  }

  // 현재 페이지에 표시할 코디 데이터
  const paginatedCoordinates = coordinates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg w-[90%] max-w-[600px] h-[80%] flex flex-col relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-primary-400">코디 보기</h2>
          <button
            onClick={onClose}
            className="text-primary-400"
            type="button"
            aria-label="닫기"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex-grow flex justify-center items-center text-primary-400">
            <p>로딩 중...</p>
          </div>
        ) : (
          <div className="flex-grow grid grid-cols-2 gap-2 overflow-y-auto">
            {paginatedCoordinates.map((coordinate) => (
              <div
                key={coordinate.coordinateId}
                className={`relative w-full bg-secondary ${
                  selectedCoordinateId === coordinate.coordinateId
                    ? 'border border-primary-400'
                    : ''
                }`}
                onPointerDown={() => startLongPress(coordinate.coordinateId)}
                onPointerUp={clearLongPress}
                onPointerLeave={clearLongPress}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedCoordinateId(coordinate.coordinateId)
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  aspectRatio: '9 / 16',
                }}
              >
                <Image
                  src={coordinate.imageUrl || '/placeholder.png'}
                  alt="coordinate"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}

        {selectedCoordinateId !== null && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="px-4 py-2 bg-primary-400 text-secondary rounded-lg"
              onClick={handleAddFavorite}
            >
              코디북에 추가
            </button>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center space-x-4 text-primary-400">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            type="button"
            aria-label="이전 페이지"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {currentPage} / {Math.ceil(coordinates.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(coordinates.length / itemsPerPage)
            }
            type="button"
            aria-label="다음 페이지"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={deleteCoordi}
          message="이 코디를 삭제하시겠습니까?"
        />
      )}
    </div>
  )
}
