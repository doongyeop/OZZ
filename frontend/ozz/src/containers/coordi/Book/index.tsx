'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { HiPencil, HiPlus } from 'react-icons/hi'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Modal from '@/components/Modal'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import { Coordibook } from '@/types/coordibook'
import {
  createFavoriteGroup,
  getFavoritesGroupListOfUsers,
  deleteFavoriteGroup,
} from '@/services/favoriteApi'
import { downloadFile } from '@/services/fileApi'
import Image from 'next/image' // next/image 컴포넌트 import
import AlertModal from '@/components/Modal/AlertModal'

export default function CoordiBook() {
  const [createModal, setCreateModal] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [groups, setGroups] = useState<Coordibook[]>([])
  const [groupImages, setGroupImages] = useState<{
    [key: number]: { src: string; fileId: number }[]
  }>({})
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const router = useRouter()
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const fetchFavoritesGroupList = async () => {
    try {
      const response: Coordibook[] = await getFavoritesGroupListOfUsers() // 타입 명시
      setGroups(response)

      // 각 그룹의 이미지를 다운로드하는 작업을 수행
      const groupImagePromises = response.map(async (group: Coordibook) => {
        if (group.imageFileList && group.imageFileList.length > 0) {
          const imagePromises = group.imageFileList
            .slice(0, 4) // 최대 4개의 이미지
            .map(async (image) => {
              const file = await downloadFile(image.filePath)
              if (file) {
                return { src: URL.createObjectURL(file), fileId: image.fileId } // Blob URL 생성 및 fileId 저장
              }
              return { src: '', fileId: image.fileId }
            })
          const images = await Promise.all(imagePromises)
          return { groupId: group.favoriteGroupId, images }
        }
        return { groupId: group.favoriteGroupId, images: [] }
      })

      const groupImagesArray = await Promise.all(groupImagePromises)

      // 각 그룹의 이미지 데이터를 상태로 저장
      const imagesByGroup: {
        [key: number]: { src: string; fileId: number }[]
      } = {}
      groupImagesArray.forEach(({ groupId, images }) => {
        imagesByGroup[groupId] = images
      })
      setGroupImages(imagesByGroup)
    } catch (error) {
      console.error('Error fetching favorites data:', error)
    }
  }

  useEffect(() => {
    fetchFavoritesGroupList()
  }, [])

  const goToCoordiBook = (id: number, name: string) => {
    router.push(`/book/${id}?name=${encodeURIComponent(name)}`)
  }

  const closeModal = () => {
    setCreateModal(false)
  }

  async function createCoordiBook() {
    if (newGroupName.length > 10 || newGroupName.length <= 0) {
      // alert('코디북 이름은 1-10글자여야 합니다.')
      setAlertMessage(['코디북 이름은', ' 1-10글자여야 합니다'])
      setIsAlertOpen(true)
      return
    }

    closeModal()

    const requestData = { name: newGroupName }
    try {
      const response = await createFavoriteGroup(requestData)
      setNewGroupName('')
      // 코디북 생성 후 즐겨찾기 목록 다시 불러오기
      fetchFavoritesGroupList()
    } catch (error) {
      console.error('코디북 생성 중 오류 발생:', error)
      setAlertMessage(['코디북 생성에 실패했습니다', ' 다시 시도해주세요'])
      setIsAlertOpen(true)
    }
  }

  const handlePointerDown = (groupId: number) => {
    longPressTimeout.current = setTimeout(() => {
      setSelectedGroupId(groupId)
      setDeleteModal(true)
    }, 500) // 0.5초 이상 클릭 시 롱프레스 발생
  }

  const handlePointerUpOrLeave = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current)
      longPressTimeout.current = null
    }
  }

  const deleteCoordiBook = async () => {
    if (selectedGroupId === null) return

    try {
      const res = await deleteFavoriteGroup(selectedGroupId)
      setDeleteModal(false)
      setSelectedGroupId(null)
      if (res.status === 204) {
        fetchFavoritesGroupList()
      } else {
        // console.log('삭제 요청은 갔지만 문제가 발생했습니다.')
        setAlertMessage(['코디북 삭제에 실패했습니다', ' 다시 시도해주세요'])
        setIsAlertOpen(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getFavGrp = (group: Coordibook) => {
    const images = groupImages[group.favoriteGroupId] || []
    return (
      <div key={group.favoriteGroupId} className="aspect-square">
        <Card
          className="flex items-center h-full overflow-hidden shadow-md"
          onClick={() => goToCoordiBook(group.favoriteGroupId, group.name)}
          onPointerDown={() => handlePointerDown(group.favoriteGroupId)}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          draggable={false}
        >
          <CardContent className="p-0 relative w-full h-full">
            {images.length >= 4 ? (
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                {images.slice(0, 4).map((image) => (
                  <div key={image.fileId} className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={group.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              images.length > 0 && (
                <Image
                  src={images[0].src}
                  alt={group.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="absolute w-full h-full"
                />
              )
            )}
          </CardContent>
        </Card>
        <CardTitle
          className="text-left text-black font-medium text-sm mt-2"
          draggable={false}
        >
          {group.name}
        </CardTitle>
      </div>
    )
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <div className="grid grid-cols-2 gap-4 m-4">
      <div className="aspect-square">
        <Card
          onClick={() => setCreateModal(true)}
          className="h-full bg-secondary flex items-center justify-center shadow-md"
        >
          <HiPlus className="w-8 h-8 fill-primary-400" />
        </Card>
        <CardTitle className="text-left text-black font-medium text-sm mt-2">
          <button type="button">새 코디북 생성</button>
        </CardTitle>
      </div>
      {groups.map((group) => (
        <div key={group.favoriteGroupId}>{getFavGrp(group)}</div>
      ))}
      {createModal && (
        <Modal title="코디북 이름" onClose={() => closeModal()}>
          <div className="flex flex-col items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="예시) 자주 입는 옷"
                className={`border border-primary-400 bg-secondary p-2 pl-10 w-full focus:outline-none text-right ${
                  inputFocused
                    ? 'text-primary-400'
                    : 'text-primary-400 text-opacity-30'
                }`}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <HiPencil className="w-5 h-5 fill-primary-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              type="button"
              onClick={createCoordiBook}
              className="px-3 py-1 mt-4 rounded-full text-sm text-primary-400 border border-primary-400 font-bold hover:text-secondary hover:bg-primary-400"
            >
              만들기
            </button>
          </div>
        </Modal>
      )}
      {deleteModal && (
        <ConfirmModal
          onClose={() => setDeleteModal(false)}
          onConfirm={deleteCoordiBook}
          message="코디북을 삭제하시겠습니까?"
        />
      )}
      {isAlertOpen && (
        <AlertModal onClose={handleAlertClose} messages={alertMessage} />
      )}
    </div>
  )
}
