'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'

import styles from '@/styles/FittingPage.module.css'
import SaveCoordiButton from '@/components/Button/SaveCoordiButton'
import ShareCommunityButton from '@/components/Button/ShareCommunityButton'
import ClosetSidebar from '@/components/Sidebar/ClosetSidebar'
import Modal from '@/components/Modal'
import CoordiNameModal from '@/components/Modal/CoordiNameModal'
import CoordiStyleModal from '@/components/Modal/CoordiStyleModal'
import CoordiBookSelectModal from '@/components/Modal/CoordiBookSelectModal'
// import Toast from '@/components/Modal/Toast'
import Toast from '@/components/Toast'
import AlertModal from '@/components/Modal/AlertModal'
import { FaPlus, FaMinus } from 'react-icons/fa'
import {
  ClothesBasicWithFileResponse,
  CoordinateCreateRequest,
  CreateCoordinatePayload,
} from '@/types/clothes/data-contracts'
import {
  categoryLowIdToHighNameMap,
  Style,
  categoryIdMap,
} from '@/types/clothing'
import {
  FavoriteGroupCreateRequest,
  FavoriteGroupImageResponse,
} from '@/types/favorite/data-contracts'
import { createCoordinate } from '@/services/clothingApi'
import {
  getFavoritesGroupListOfUsers,
  createFavoriteGroup,
  addFavorite,
} from '@/services/favoriteApi'

type FittingItem = {
  category: string
  type: string
  image: string | null
  isSelected: boolean
}

const placeholderImages: { [key: string]: string } = {
  악세서리: '/images/fitting/accessory.png',
  원피스: '/images/fitting/onepiece.png',
  상의: '/images/fitting/top.png',
  아우터: '/images/fitting/outer.png',
  하의: '/images/fitting/bottom.png',
  신발: '/images/fitting/shoes.png',
  가방: '/images/fitting/bag.png',
}

// 랜덤한 파스텔톤 색상을 생성하는 함수
const pastelColors = [
  { name: 'Light Baby Blue', hex: '#D0E7FF' },
  { name: 'Pale Lavender', hex: '#E6E6FA' },
  { name: 'Soft Peach', hex: '#FFE5D9' },
  { name: 'Mint Cream', hex: '#F5FFFA' },
  { name: 'Blush Pink', hex: '#FFDDE1' },
  { name: 'Lemon Chiffon', hex: '#FFF9DB' },
]

const generateRandomPastelColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length)
  return pastelColors[randomIndex].hex
}

export async function generateCoordiImage(
  fittingContainerRef: React.RefObject<HTMLDivElement>,
): Promise<File | null> {
  try {
    const fittingContainerElement = fittingContainerRef.current
    if (!fittingContainerElement) {
      throw new Error('Fitting container element not found')
    }

    const { width, height } = fittingContainerElement.getBoundingClientRect()
    // HTML을 캔버스로 변환
    const canvas = await html2canvas(fittingContainerElement, {
      width: Math.round(width),
      height: Math.round(height),
      logging: true,
      ignoreElements: (element) => element.tagName === 'BUTTON', // BUTTON 태그 무시
    })

    // Blob 생성 및 반환
    return await new Promise<File | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('이미지 생성에 실패했습니다.')
          resolve(null)
          return
        }

        const imageFile = new File([blob], 'coordinate.png', {
          type: 'image/png',
        })
        resolve(imageFile)
      })
    })
  } catch (error) {
    console.error('이미지 생성 중 오류 발생:', error)
    return null
  }
}

export async function saveCoordi(
  imageFile: File,
  coordinateRequest: CoordinateCreateRequest,
) {
  try {
    // Prepare the API request payload with coordinate information
    const payload: CreateCoordinatePayload = {
      imageFile,
      request: coordinateRequest,
    }

    // Call the API to create the coordinate
    const coordinateId = await createCoordinate(payload)

    // Retrieve favorite groups (i.e., coordinate books)
    const favoriteGroups = await getFavoritesGroupListOfUsers()

    let targetFavoriteGroupId: number

    // If no favorite group exists, create a default one
    if (favoriteGroups.length === 0) {
      const requestData: FavoriteGroupCreateRequest = {
        name: '기본 코디북',
      }
      const createdGroup = await createFavoriteGroup(requestData)
      targetFavoriteGroupId = createdGroup.favoriteGroupId
    } else {
      // If a favorite group exists, use the ID of the first one
      targetFavoriteGroupId = favoriteGroups[0].favoriteGroupId
    }

    // Add the coordinate to the favorite group
    await addFavorite(targetFavoriteGroupId, coordinateId)

    // Handle success (e.g., update the UI outside this function)
    return coordinateId
  } catch (error) {
    console.error('Failed to create coordinate:', error)
    throw error // Re-throw error for handling outside the function
  }
}

export default function FittingContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // 사이드바 열고 닫는 변수
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // 사이드바에 카테고리 설정하기
  const [fittingItems, setFittingItems] = useState<FittingItem[]>([
    // 가상피팅 배경의 컴포넌트
    { category: '악세서리', type: 'accessory', image: null, isSelected: false },
    { category: '원피스', type: 'onepiece', image: null, isSelected: false },
    { category: '상의', type: 'top', image: null, isSelected: false },
    { category: '아우터', type: 'outer', image: null, isSelected: false },
    { category: '하의', type: 'bottom', image: null, isSelected: false },
    { category: '신발', type: 'shoes', image: null, isSelected: false },
    { category: '가방', type: 'bag', image: null, isSelected: false },
  ])
  const [selectedClothes, setSelectedClothes] = useState<
    (ClothesBasicWithFileResponse & { imageUrl: string })[]
  >([]) // 선택한 옷 리스트

  const router = useRouter()
  const [isCoordiModalOpen, setIsCoordiModalOpen] = useState(false) // 코디 이름 설정 모달
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false) // 스타일 태그 설정 모달
  const [isCoordiBookModalOpen, setIsCoordiBookModalOpen] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false) // 확인 모달
  const [coordiName, setCoordiName] = useState('') // 코디 이름
  const [styleList, setStyleList] = useState<Style[]>([]) // 스타일 태그
  const fittingContainerRef = useRef<HTMLDivElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])
  const [favoriteGroups, setFavoriteGroups] = useState<
    FavoriteGroupImageResponse[]
  >([])
  const [selectedFavoriteGroupId, setSelectedFavoriteGroupId] = useState<
    number | null
  >(null)
  const [coordinateId, setCoordinateId] = useState<number | null>(null) // 코디 ID 저장용
  const [targetFavoriteGroupId, setTargetFavoriteGroupId] = useState<
    number | null
  >(null)

  const handleAddItem = (category: string) => {
    // + 버튼을 눌렀을 때
    setSelectedCategory(category)
    setIsSidebarOpen(true)
  }

  const handleRemoveItem = (category: string) => {
    // - 버튼을 눌렀을 때
    setFittingItems(
      fittingItems.map((item) =>
        item.category === category
          ? { ...item, image: null, isSelected: false }
          : item,
      ),
    )
    setSelectedClothes(
      selectedClothes.filter((cloth) => {
        const categoryLowId = cloth.categoryLow?.categoryLowId
        if (categoryLowId === undefined) {
          return true // `undefined`인 경우 필터링하지 않음 (필요에 따라 다르게 처리할 수 있음)
        }
        return categoryLowIdToHighNameMap[categoryLowId] !== category
      }),
    )
  }

  const handleSelectClothingItem = (
    item: ClothesBasicWithFileResponse & { imageUrl: string },
  ) => {
    // 사이드바에서 아이템을 선택하면
    const existingItem = selectedClothes.find(
      (clothingItem) => clothingItem.clothesId === item.clothesId,
    )
    if (existingItem) {
      setAlertMessage(['이미 선택한 아이템입니다', ' 다시 시도해주세요'])
      setIsAlertOpen(true)
      return
    }

    const categoryLowId = item.categoryLow?.categoryLowId // 선택한 아이템의 하위 카테고리 아이디
    const categoryHighName = categoryLowId // 선택한 아이템의 상위 카테고리 이름
      ? categoryLowIdToHighNameMap[categoryLowId]
      : undefined

    if (!categoryHighName) {
      setAlertMessage(['잘못된 카테고리 ID입니다', ' 다시 시도해주세요'])
      setIsAlertOpen(true)
      return
    }

    const placeholder = fittingItems.find((imageholder) => {
      return imageholder.category === categoryHighName
    })

    if (!placeholder || placeholder.category !== categoryHighName) {
      setAlertMessage(['잘못된 위치입니다', ' 다시 시도해주세요'])
      setIsAlertOpen(true)
      return
    }

    const updatedFittingItems = fittingItems.map((fittingItem) =>
      fittingItem.category === categoryHighName
        ? {
            ...fittingItem,
            image: item.imageUrl ? item.imageUrl : '',
            isSelected: true,
          }
        : fittingItem,
    )
    setFittingItems(updatedFittingItems)
    setSelectedClothes([...selectedClothes, item])
    setIsSidebarOpen(false)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    // console.log('사이드바에서 선택 ', category)
  }

  const handleSaveCoordi = async () => {
    if (selectedClothes.length === 0) {
      setAlertMessage([
        '적어도 한 가지 아이템을',
        '선택해야 합니다',
        ' 다시 시도해주세요',
      ])
      setIsAlertOpen(true)
      return
    }
    setIsCoordiModalOpen(true)
  }

  const handleCoordiNameSubmit = (name: string) => {
    setCoordiName(name)
    setIsCoordiModalOpen(false)
    setIsStyleModalOpen(true)
  }

  const closeModal = () => {
    setIsCoordiModalOpen(false) // 코디 이름 설정 모달
    setIsStyleModalOpen(false) // 스타일 태그 설정 모달
  }

  const handleConfirm = () => {
    closeModal()
    router.push('/book')
  }

  const handleFavoriteGroupSelect = async (favoriteGroupId: number) => {
    // console.log('coordiId', coordinateId)
    // console.log('favoriteGroupId', favoriteGroupId)
    try {
      if (!coordinateId) return
      const res = await addFavorite(favoriteGroupId, coordinateId)
      setIsToastOpen(true)
      setIsCoordiBookModalOpen(false)
      handleConfirm()
    } catch (error) {
      // console.error('코디 추가 실패:', error)
      setAlertMessage(['코디 추가에 실패했습니다', ' 다시 시도해주세요'])
      setIsAlertOpen(true)
    }
  }

  const handleStyleSubmit = async (selectedStyles: Style[]) => {
    // console.log('코디이름 : ', coordiName)
    // console.log('selectedStyles : ', selectedStyles)
    setStyleList(selectedStyles)
    setIsStyleModalOpen(false)

    // 로딩 화면?

    // 코디 생성하기 START
    const clothesList = selectedClothes.map((item) => {
      const categoryLowId = item.categoryLow?.categoryLowId
      const offset =
        categoryLowId !== undefined ? categoryIdMap[categoryLowId] : null // 기본값으로 null 사용

      return {
        clothesId: item.clothesId,
        offset: offset || 0, // null이거나 정의되지 않은 경우 기본값 0 사용 (필요에 따라 조정 가능)
      }
    })

    const coordinateRequest: CoordinateCreateRequest = {
      name: coordiName,
      styleList,
      clothesList,
    }

    // 1. 랜덤 파스텔톤 배경색 생성
    const randomBackgroundColor = generateRandomPastelColor()
    const originalBackgroundColor =
      fittingContainerRef.current!.style.backgroundColor

    // 2. 이미지 생성 전에 배경색 적용
    fittingContainerRef.current!.style.backgroundColor = randomBackgroundColor

    // 3. null 이미지를 가진 요소 숨기기
    const hiddenElements: HTMLElement[] = []
    fittingItems.forEach((item, index) => {
      if (item.image === null) {
        const element = fittingContainerRef.current!.querySelectorAll(
          `.${styles.clothingItem}`,
        )[index] as HTMLElement

        const imageElement = element.querySelector('img') as HTMLImageElement
        if (imageElement) {
          imageElement.style.opacity = '0' // 이미지가 투명해지도록 설정
        }
        hiddenElements.push(imageElement)
      }
    })

    try {
      const gridElement = fittingContainerRef.current!
      const { width, height } = gridElement.getBoundingClientRect()

      const canvas = await html2canvas(gridElement, {
        width: Math.round(width),
        height: Math.round(height),
        backgroundColor: null, // 배경 투명으로 설정
        logging: true,
        ignoreElements: (element) => element.tagName === 'BUTTON', // BUTTON 태그 무시
      })

      // const dataUrl = canvas.toDataURL('image/png')
      // setPreviewUrl(dataUrl)

      // 5. 숨겨진 요소 다시 표시
      /* eslint-disable no-param-reassign */
      hiddenElements.forEach((element) => {
        element.style.opacity = '0.1'
      })
      /* eslint-disable no-param-reassign */

      // 6. 캔버스를 Blob (이미지 파일)로 변환
      canvas.toBlob(async (blob) => {
        fittingContainerRef.current!.style.backgroundColor =
          originalBackgroundColor
        if (!blob) {
          // alert('이미지 생성에 실패했습니다.')
          setAlertMessage([
            '이미지 생성에',
            '실패했습니다',
            ' 다시 시도해주세요',
          ])
          setIsAlertOpen(true)
          return
        }

        const imageFile = new File([blob], 'coordinate.png', {
          type: 'image/png',
        })

        // 7. 코디 정보 생성 후 API 요청 데이터 준비
        const payload: CreateCoordinatePayload = {
          imageFile,
          request: coordinateRequest,
        }

        // console.log('payload ', payload)

        try {
          const coordiId = await createCoordinate(payload)
          setCoordinateId(coordiId)

          // 코디북 조회
          const favGroups = await getFavoritesGroupListOfUsers()
          // 코디북이 없으면 기본 코디북 생성
          if (favGroups.length === 0) {
            const requestData: FavoriteGroupCreateRequest = {
              name: '기본 코디북',
            }
            const createdGroup = await createFavoriteGroup(requestData)
            // handleFavoriteGroupSelect(createdGroup.favoriteGroupId)
            const res = await addFavorite(
              createdGroup.favoriteGroupId,
              coordiId,
            )
            // console.log('res', res)
            setIsCoordiBookModalOpen(false)
            setIsToastOpen(true)
            handleConfirm()
          } else {
            // TODO: 코디북 선택 모달을 띄워 사용자에게 선택하게 할 수 있습니다.
            // 코디북이 여러 개 있으면 선택 모달을 띄움
            setFavoriteGroups(favGroups)
            setIsCoordiBookModalOpen(true)
          }

          // const response = await addFavorite(
          //   targetFavoriteGroupId,
          //   coordinateId,
          // )
          // // console.log('response ', response)
          // setIsToastOpen(true)
        } catch (error) {
          // console.error('코디 생성 실패:', error)
          // 실패 처리 (예: 에러 메시지 표시)
          setAlertMessage(['코디 생성에 실패했습니다', ' 다시 시도해주세요'])
          setIsAlertOpen(true)
        }
      })
    } catch (error) {
      // console.error('코디 저장 중 오류 발생:', error)
      setAlertMessage([
        '코디 저장 중 오류가',
        '발생했습니다',
        ' 다시 시도해주세요',
      ])
      setIsAlertOpen(true)
      fittingContainerRef.current!.style.backgroundColor =
        originalBackgroundColor

      // 5. 숨겨진 요소 다시 표l (오류 발생 시에도 복원)
      /* eslint-disable no-param-reassign */
      hiddenElements.forEach((element) => {
        element.style.opacity = '0.1'
      })
      /* eslint-disable no-param-reassign */
    }
  }

  const handlePrevFromStyle = () => {
    setIsStyleModalOpen(false)
    setIsCoordiModalOpen(true)
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-5">
        {/* <div
          className="relative w-full max-w-[360px] h-auto aspect-w-9 aspect-h-16"
          ref={fittingContainerRef}
        > */}
        <div
          className="relative w-full max-w-[360px] h-auto mb-20"
          ref={fittingContainerRef} // gridRef를 설정합니다.
          style={{
            aspectRatio: '9 / 16', // 9:16 비율을 적용
          }}
        >
          <div className={styles.clothingGrid}>
            {fittingItems.map((item) => (
              <div
                key={item.type}
                className={`${styles.clothingItem} ${styles[item.type]} flex items-center justify-center`}
              >
                {item.image ? (
                  <>
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.category}
                        layout="fill" // 이미지가 부모 div를 채우도록
                        objectFit="contain" // 비율을 유지하며 최대 크기에 맞춤
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="제거"
                      onClick={() => handleRemoveItem(item.category)}
                      className={styles.removeButton}
                    >
                      <FaMinus />
                    </button>
                  </>
                ) : (
                  <>
                    <Image
                      src={placeholderImages[item.category]}
                      alt={item.category}
                      width={100}
                      height={100}
                      layout="responsive"
                      className="opacity-10"
                    />
                    <button
                      type="button"
                      aria-label="옷 추가"
                      onClick={() => handleAddItem(item.category)}
                      className={styles.addButton}
                    >
                      <FaPlus />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md mt-4">
            <h2 className="text-xl font-semibold pl-10 m-2">선택한 옷</h2>
            {selectedClothes.length > 0 ? (
              <ul className="mt-2 px-6">
                {selectedClothes.map((item) => (
                  <li key={item.clothesId} className="mb-2 p-3 border-b">
                    <div className="flex items-center cursor-pointer">
                      <Link href={`/closet/modify/${item.clothesId}`} passHref>
                        <div className="flex justify-center items-center w-16 h-16 bg-gray-light mr-4">
                          <Image
                            src={item.imageUrl}
                            alt={item.name ?? 'No name'}
                            width={75}
                            height={75}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      </Link>
                      <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col">
                          <p className="mb-2">{item.categoryLow?.name}</p>
                          <p className="text-md font-semibold">{item.name}</p>
                        </div>
                        <button
                          type="button"
                          aria-label="제거"
                          onClick={() => {
                            const categoryLowId =
                              item.categoryLow?.categoryLowId
                            if (categoryLowId !== undefined) {
                              const highCategoryName =
                                categoryLowIdToHighNameMap[categoryLowId]
                              handleRemoveItem(highCategoryName)
                            } else {
                              // console.error('카테고리 ID가 유효하지 않습니다.')
                              setAlertMessage([
                                '카테고리 ID가',
                                '유효하지 않습니다',
                              ])
                              setIsAlertOpen(true)
                            }
                          }}
                          className="flex items-center justify-center bg-secondary text-primary-400 rounded-full h-6 w-6"
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-dark text-center mb-10">
                아직 추가된 옷이 없어요
              </p>
            )}
            <div className="my-6 flex justify-around">
              <SaveCoordiButton
                onClick={handleSaveCoordi}
                disabled={selectedClothes.length === 0}
              />
              <ShareCommunityButton onClick={closeModal} disabled />
            </div>
            {/* 미리보기 영역 */}
            {previewUrl && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">코디 미리보기</h2>
                <Image
                  src={previewUrl}
                  alt="코디 미리보기"
                  width={300}
                  height={300}
                />
              </div>
            )}
            {isCoordiModalOpen && (
              <Modal onClose={() => setIsCoordiModalOpen(false)}>
                <CoordiNameModal
                  setValue={handleCoordiNameSubmit}
                  onClose={closeModal}
                />
              </Modal>
            )}
            {isStyleModalOpen && (
              <Modal onClose={() => setIsStyleModalOpen(false)}>
                <CoordiStyleModal
                  setValue={handleStyleSubmit}
                  onPrev={handlePrevFromStyle}
                  onClose={closeModal}
                />
              </Modal>
            )}
            {isCoordiBookModalOpen && (
              <CoordiBookSelectModal
                favoriteGroups={favoriteGroups}
                onSelect={handleFavoriteGroupSelect}
                onClose={() => setIsCoordiBookModalOpen(false)}
              />
            )}
            {isToastOpen && (
              <Toast
                onClose={() => handleConfirm()}
                message="코디북에 저장되었습니다!"
              />
            )}
            {isAlertOpen && (
              <AlertModal onClose={handleAlertClose} messages={alertMessage} />
            )}
          </div>
        </div>
      </div>

      <ClosetSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        category={selectedCategory}
        onSelectItem={handleSelectClothingItem}
        onCategoryChange={handleCategoryChange}
      />
    </>
  )
}
