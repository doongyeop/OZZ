'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa'
import styles from '@/styles/CoordibookSidebar.module.css'
import CreateCoordibookModal from '../Modal/CreateCoordibookModal'

type CoordibookSidebarProps = {
  boardId: number
  userId: number
  onClose: () => void
  onBookmarkToggle: () => void
}

type Coordibook = {
  coordinateId: number
  name: string
  styleList: string[]
  createdDate: string
  imageFile: {
    fileId: number
    filePath: string
    fileName: string
    fileType: string
  }
}

export default function CoordibookSidebar({
  boardId,
  userId,
  onClose,
  onBookmarkToggle,
}: CoordibookSidebarProps) {
  const [coordibooks, setCoordibooks] = useState<Coordibook[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    // 실제 API 호출 대신 목업 데이터를 사용
    const mockCoordibooks = {
      totalPages: 1,
      totalElements: 2,
      size: 20,
      content: [
        {
          coordinateId: 1,
          name: '서터릿 코디',
          styleList: ['STREET'],
          createdDate: '2024-08-06T01:40:12.825788',
          imageFile: {
            fileId: 4,
            filePath: '/images/tops01.png',
            fileName: '상의.png',
            fileType: 'image/png',
          },
        },
        {
          coordinateId: 2,
          name: '멋진 코디',
          styleList: ['STREET'],
          createdDate: '2024-08-06T01:40:12.825788',
          imageFile: {
            fileId: 4,
            filePath: '/images/tops02.png',
            fileName: '상의.png',
            fileType: 'image/png',
          },
        },
      ],
      number: 0,
      sort: [],
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: [],
        offset: 0,
        paged: true,
        unpaged: false,
      },
      first: true,
      last: true,
      numberOfElements: 1,
      empty: false,
    }

    setCoordibooks(mockCoordibooks.content)
  }, [])

  const handleCreateCoordibook = (name: string) => {
    // 새 코디북 생성 API 호출
    const newCoordibook = {
      coordinateId: Date.now(),
      name,
      styleList: [],
      createdDate: new Date().toISOString(),
      imageFile: { fileId: 0, filePath: '', fileName: '', fileType: '' },
    }
    setCoordibooks((prev) => [newCoordibook, ...prev])
    setIsCreateModalOpen(false)
  }

  const handleCoordibookSelect = async (coordibookId: number) => {
    try {
      // 코디북에 게시글 추가 API 호출
      await fetch('/api/coordibook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardId, coordibookId }),
      })
      onBookmarkToggle()
      onClose()
    } catch (error) {
      console.error('Failed to add to coordibook:', error)
    }
  }

  return (
    <>
      <div className={`${styles.sidebarGroup}`}>
        <button
          type="button"
          aria-label="사이드바 닫기"
          className={`${styles.toggleButtonClose} flex justify-center`}
          onClick={() => onClose()}
        >
          <FaChevronDown size={20} />
        </button>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <h3>코디북</h3>
          </div>
          <div className={styles.coordibookList}>
            {coordibooks.map((item) => (
              <button
                type="button"
                aria-label="코디북"
                key={item.coordinateId}
                className={styles.clothItem}
                onClick={() => handleCoordibookSelect(item.coordinateId)}
              >
                <Image
                  src={item.imageFile.filePath}
                  alt={item.name}
                  width={80}
                  height={80}
                />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateCoordibookModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateCoordibook}
        />
      )}
    </>
  )
}
