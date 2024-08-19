'use client'

import OutlineButton from '@/components/Button/OutlineButton'
import TagButton from '@/components/Button/TagButton'
import HeaderWithBackward from '@/components/HeaderWithBackward'
import Link from 'next/link'
import { MdOutlineShare } from 'react-icons/md'
import Image from 'next/image'
import { IoPencil } from 'react-icons/io5'
import { HiTrash } from 'react-icons/hi2'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import { useState, useEffect } from 'react'
import { deleteCoordinate, getCoordinate } from '@/services/clothingApi'
import Toast from '@/components/Toast'
import { useRouter } from 'next/navigation'
import { downloadFile, getFile } from '@/services/fileApi'

interface Coordinate {
  coordinateId: number
  name: string
  styleList: string[]
  createdDate: string
  clothesList: {
    clothes: {
      clothesId: number
      name: string
      createdDate: string
      imageFileId: number
      categoryLow: {
        categoryLowId: string
        name: string
      }
    }
    offset: number
  }[]
  imageFile: {
    fileId: number
    filePath: string
    fileName: string
    fileType: string
  }
}

// 컴포넌트 밖으로 이동
function ClothesItem({
  clothesId,
  imageFileId,
}: {
  clothesId: number
  imageFileId: number
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getFile(imageFileId)
        const file = await downloadFile(data.filePath)
        if (file) {
          setImageUrl(URL.createObjectURL(file))
        }
      } catch (error) {
        console.error('이미지를 가져오는 중 오류 발생:', error)
      }
    }

    fetchImage()
  }, [imageFileId])

  return (
    <Link href={`/closet/modify/${clothesId}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Item-${clothesId}`}
          width={0}
          height={0}
          sizes="100%"
          className="aspect-square w-auto h-full object-contain shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
        />
      ) : (
        <div className="aspect-square w-auto h-full bg-gray-200" />
      )}
    </Link>
  )
}

export default function SavedCoordiPage({
  params,
}: {
  params: { id: string }
}) {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const router = useRouter()

  const toggleModal = () => {
    setDeleteModal((prev) => !prev)
  }

  const updateCoordi = () => {
    router.push('/fix')
  }

  // 코디 데이터 및 이미지 가져오기
  useEffect(() => {
    const fetchCoordinateData = async () => {
      try {
        const data = await getCoordinate(Number(params.id))
        setCoordinate(data)

        // 이미지 다운로드
        if (data.imageFile?.filePath) {
          const file = await downloadFile(data.imageFile.filePath)
          if (file) {
            setImageUrl(URL.createObjectURL(file))
          }
        }
      } catch (error) {
        console.error('코디 데이터를 가져오는 중 오류 발생:', error)
      }
    }

    fetchCoordinateData()
  }, [params.id])

  const deleteCoordi = async () => {
    try {
      const res = await deleteCoordinate(Number(params.id))
      if (res.status === 200) {
        // console.log('삭제 완료')
        setToastMessage('삭제 완료')
        router.push('/book')
      }
    } catch (error) {
      console.error('코디 삭제 중 오류 발생:', error)
    }
  }

  return (
    <>
      <HeaderWithBackward title="코디북" />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={coordinate?.name || '코디 이미지'}
          width={720}
          height={1280}
          sizes="100vw"
          className="w-full h-auto"
        />
      )}
      <div className="m-4">
        <h1 className="text-xl font-semibold">{coordinate?.name}</h1>
        <div className="my-4 flex gap-4">
          <OutlineButton
            onClick={() => {
              updateCoordi()
            }}
          >
            <IoPencil className="text-primary-400" />
            <span className="ms-2 text-sm">코디 수정하기</span>
          </OutlineButton>
          <OutlineButton>
            <MdOutlineShare className="text-primary-400" />
            <span className="ms-2 text-sm">커뮤니티에 공유하기</span>
          </OutlineButton>
        </div>
        <div className="my-10">
          <h4 className="font-semibold">스타일 태그</h4>
          <div className="my-2 flex flex-wrap gap-2">
            {coordinate?.styleList.map((style) => (
              <TagButton key={style} isSelected>
                # {style}
              </TagButton>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">코디에 사용된 아이템</h4>
          <div className="h-32 flex gap-4 my-2">
            {coordinate?.clothesList.map((clothesItem) => (
              <ClothesItem
                key={clothesItem.clothes.clothesId}
                clothesId={clothesItem.clothes.clothesId}
                imageFileId={clothesItem.clothes.imageFileId}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div
          className="sticky bottom-[88px] float-right me-8 flex items-center justify-center bg-secondary rounded-full w-[60px] h-[60px] border border-primary-400 hover:bg-primary-400 group"
          onClick={toggleModal}
          role="presentation"
          aria-hidden="true"
        >
          <HiTrash
            className="text-primary-400 group-hover:text-secondary"
            size={20}
          />
        </div>
        {deleteModal && (
          <ConfirmModal
            message={
              <div>
                <p>코디를 코디북에서</p>
                <p>제거하시겠습니까?</p>
              </div>
            }
            messageClassName="text-base"
            onClose={toggleModal}
            onConfirm={deleteCoordi} // 함수 실행
          />
        )}
        {toastMessage && (
          <Toast onClose={() => setToastMessage(null)} message={toastMessage} />
        )}
      </div>
    </>
  )
}
