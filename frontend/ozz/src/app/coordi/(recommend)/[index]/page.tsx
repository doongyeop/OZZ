'use client'

import OutlineButton from '@/components/Button/OutlineButton'
import TagButton from '@/components/Button/TagButton'
import HeaderWithBackward from '@/components/HeaderWithBackward'
import Link from 'next/link'
import { MdOutlineShare } from 'react-icons/md'
import { RiDownloadLine } from 'react-icons/ri'
import Image from 'next/image'
import { Style, styleInvMap } from '@/types/clothing'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { Coordination } from '@/containers/coordi/CoordiOfTheDay'
import { fetchImage } from '@/services/clothingApi'
import CoordiImage from '@/containers/coordi/CoordiImage'
import { CoordinateCreateRequest } from '@/types/clothes/data-contracts'
import { generateCoordiImage, saveCoordi } from '@/containers/fitting-page'
import { useRef, useState } from 'react'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'
import AlertModal from '@/components/Modal/AlertModal'

export default function CoordiDetailPage({
  params,
}: {
  params: { index: number }
}) {
  const [isToastOpen, setIsToastOpen] = useState(false) // 확인 모달
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const queryClient = useQueryClient()
  const coordinations = queryClient.getQueryData<Coordination[]>([
    'coordiRecommendations',
  ])

  const coordi = coordinations ? coordinations[params.index] : null
  const fittingContainerRef = useRef<HTMLDivElement | null>(null)

  // 각 item의 imgPath에 대해 fetchImage를 호출하여 이미지를 가져오는 쿼리 생성
  const queries =
    coordi?.items.map((item) => ({
      queryKey: ['image', item.imgPath],
      queryFn: () => fetchImage(item.imgPath),
      enabled: !!item.imgPath,
    })) || []

  // useQueries 호출
  const imageResults = useQueries({ queries })

  if (!coordi) return <div>something went wrong</div>

  const handleSaveCoordi = async () => {
    const coordinateRequest: CoordinateCreateRequest = {
      name: coordi.title,
      styleList: [coordi.style],
      clothesList: coordi.items.map((item) => ({
        clothesId: item.id,
        offset: item.offset,
      })),
    }

    const fittingContainerElement = fittingContainerRef.current

    if (!fittingContainerElement) {
      setAlertMessage([
        '피팅 컨테이너를 찾을 수 없습니다.',
        '다시 시도해주세요',
      ])
      setIsAlertOpen(true)
      return
    }

    try {
      const imageFile = await generateCoordiImage(fittingContainerRef)

      // 3. 이미지가 성공적으로 생성되었는지 확인 후 저장
      if (imageFile) {
        await saveCoordi(imageFile, coordinateRequest)

        // 코디 저장 성공 시 토스트 메시지
        setIsToastOpen(true)
      }
    } catch (error) {
      console.error('코디 저장 중 오류 발생:', error)
      setAlertMessage([
        '코디 저장 중 오류가 발생했습니다.',
        ' 다시 시도해주세요',
      ])
      setIsAlertOpen(true)
    }
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <>
      <HeaderWithBackward />

      <div className="aspect-[9/16] w-full" ref={fittingContainerRef}>
        <CoordiImage coordi={coordi} />
      </div>

      <div className="m-4">
        <h1 className="text-xl font-semibold">{coordi.title}</h1>
        <div className="my-4 flex gap-4">
          <OutlineButton onClick={handleSaveCoordi}>
            <RiDownloadLine className="text-primary-400" />
            <span className="ms-2 text-sm">내 코디에 저장하기</span>
          </OutlineButton>
          <OutlineButton>
            <MdOutlineShare className="text-primary-400" />
            <span className="ms-2 text-sm">커뮤니티에 공유하기</span>
          </OutlineButton>
        </div>
        <div className="my-10">
          <h4 className="font-semibold">스타일 태그</h4>
          <div className="my-2 flex flex-wrap gap-2">
            <TagButton isSelected>
              #{styleInvMap[coordi.style.toUpperCase() as Style]}
            </TagButton>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">코디에 사용된 아이템</h4>
          <div className="h-32 flex gap-4 my-2">
            {coordi.items.map((item, index) => (
              <Link href={`/closet/modify/${item.id}`} key={item.id}>
                <Image
                  src={imageResults[index]?.data || ''}
                  alt={`Item-${index}`}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="aspect-square w-auto h-full object-contain shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isToastOpen && (
        <Modal onClose={() => setIsToastOpen(false)}>
          <Toast
            onClose={() => setIsToastOpen(false)}
            message="코디북에 저장되었습니다!"
          />
        </Modal>
      )}
      {isAlertOpen && (
        <AlertModal onClose={handleAlertClose} messages={alertMessage} />
      )}
    </>
  )
}
