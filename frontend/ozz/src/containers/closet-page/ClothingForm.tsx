'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'

import BrandModal from '@/components/Modal/BrandModal'
import CategoryModal from '@/components/Modal/CategoryModal'
import PurchaseDateModal from '@/components/Modal/PurchaseDateModal'
import PurchaseSiteModal from '@/components/Modal/PurchaseSiteModal'
import SeasonModal from '@/components/Modal/SeasonModal'
import SizeModal from '@/components/Modal/SizeModal'
import FitModal from '@/components/Modal/FitModal'
import TextureModal from '@/components/Modal/TextureModal'
import ColorModal from '@/components/Modal/ColorModal'
import StyleModal from '@/components/Modal/StyleModal'
import PatternModal from '@/components/Modal/PatternModal'
import MemoModal from '@/components/Modal/MemoModal'
import AlertModal from '@/components/Modal/AlertModal'
import LoadingPage from '@/components/Loading/loading'
import LoadingModal from '@/components/Modal/LoadingModal'

import {
  ClothingData,
  Size,
  Fit,
  Season,
  Style,
  Texture,
  Color,
  colors,
  colorCodeMap,
  Pattern,
  fitInvMap,
  seasonInvMap,
  styleInvMap,
  textureInvMap,
  colorMap,
  colorInvMap,
  patternInvMap,
  categoryNameToLowIdMap,
  categoryLowNameToHighName,
} from '@/types/clothing'
import { extractClothing } from '@/services/clothingApi'
import {
  ClothesCreateRequest,
  ClothesUpdateRequest,
} from '@/types/clothes/data-contracts'
import CameraIcon from '../../../public/icons/camera.svg'

type OnSubmitFunction = (
  imageFile: File,
  request: ClothesCreateRequest | ClothesUpdateRequest,
) => void

type ClothingFormProps = {
  initialData?: ClothingData
  onSubmit: OnSubmitFunction
  submitButtonText: string
}

export default function ClothingForm({
  initialData,
  onSubmit,
  submitButtonText,
}: ClothingFormProps) {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  const [name, setName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [purchaseDate, setPurchaseDate] = useState<string | null>(null)
  const [purchaseSite, setPurchaseSite] = useState<string | null>(null)
  const [season, setSeason] = useState<Season[]>([])
  const [size, setSize] = useState<Size>('FREE')
  const [fit, setFit] = useState<Fit | null>(null)
  const [texture, setTexture] = useState<Texture[]>([])
  const [color, setColor] = useState<Color[]>([])
  const [style, setStyle] = useState<Style[]>([])
  const [pattern, setPattern] = useState<Pattern[]>([])
  const [memo, setMemo] = useState<string | null>(null)
  const [extra, setExtra] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setBrandName(initialData.brandName || '')
      const categoryHighName =
        categoryLowNameToHighName[initialData.categoryName || '']
      setCategoryName(`${categoryHighName} > ${initialData.categoryName}` || '')
      setPurchaseDate(initialData.purchaseDate || null)
      setPurchaseSite(initialData.purchaseSite || null)
      setSeason(initialData.season || [])
      setSize(initialData.size || 'FREE')
      setFit(initialData.fit || null)
      setTexture(initialData.texture || [])
      setColor(initialData.color || [])
      setStyle(initialData.style || [])
      setPattern(initialData.pattern || [])
      setMemo(initialData.memo || null)
      setExtra(initialData.extra || null)

      // 이미지 미리보기 설정 (실제 환경에서는 이미지 URL을 사용해야 합니다)
      if (initialData.image) {
        setImageFile(initialData.imageFile)
        setImagePreview(initialData.image)
      }
    }
  }, [initialData])

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      let processedFile = file

      // 2MB 초과하는 경우 파일 압축
      if (file.size > 1 * 1024 * 1024) {
        const options = {
          maxSizeMB: 1, // 1MB로 압축
          maxWidthOrHeight: 1920, // 너비 또는 높이를 1920px 이하로
          useWebWorker: true, // Web Worker를 사용하여 성능 향상
        }
        try {
          setIsLoadingModal(true)
          processedFile = await imageCompression(file, options)
          setIsLoadingModal(false)
        } catch (error) {
          console.error('이미지 압축 중 오류 발생:', error)
          setAlertMessage(['이미지 압축 실패', ' 다시 시도해주세요'])
          setIsAlertOpen(true)
        }
      }

      setImageFile(processedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(processedFile)
    }
  }

  const handleExtractImage = async () => {
    if (imageFile && categoryName) {
      setLoading(true)
      setIsSubmitting(true) // 중복 요청 방지

      const [categoryHighName] = categoryName.split(' > ')
      try {
        // console.log('이미지 분석 시작')
        // console.log('imageFile ', imageFile)
        const result = await extractClothing(imageFile, categoryHighName)

        setName(name || '')
        setBrandName(result.brand || '')
        setCategoryName(
          `${result.categoryHigh.name} > ${result.categoryLow.name}`,
        )
        setPurchaseDate(result.purchaseDate || null)
        setPurchaseSite(result.purchaseSite || null)
        setSeason(result.seasonList || [])
        setSize(result.size || 'FREE')
        setFit(result.fit || null)
        setTexture(result.textureList || [])
        setColor(
          result.colorList
            ? result.colorList.map((colorCode: string) => {
                // 색상 코드를 기반으로 Color 객체를 찾음
                const colorObj = colors.find((c) => c.code === colorCode)

                if (colorObj) {
                  return colorObj
                }
                console.warn(`No match found for color code: ${colorCode}`)
                // colorObj가 없으면 기본값으로 빈 Color 객체를 반환하거나 다른 적절한 처리
                return {
                  code: colorCode,
                  name: colorMap[colorCode] || 'Unknown', // colorMap에서 이름을 찾거나 기본값 설정
                  colorCode: colorCodeMap[colorCode] || '#000000', // 기본 색상 코드
                }
              })
            : [],
        )
        setStyle(result.styleList || [])
        setPattern(result.patternList || [])
        setMemo(result.memo || null)
        setExtra(result.extra || '')

        // 이미지 데이터 처리 (Base64 디코딩 후 파일로 변환)
        const byteCharacters = atob(result.image)
        const byteNumbers = new Array(byteCharacters.length)
          .fill(0)
          .map((_, i) => byteCharacters.charCodeAt(i))
        const byteArray = new Uint8Array(byteNumbers)
        const img = new Blob([byteArray], { type: 'image/png' })

        let imageFileObj = new File([img], 'extracted-image.png', {
          type: 'image/png',
        })

        // 이미지 파일 크기가 1MB를 초과하는 경우 압축
        if (imageFileObj.size > 1 * 1024 * 1024) {
          const options = {
            maxSizeMB: 1, // 1MB로 압축
            maxWidthOrHeight: 1920, // 너비 또는 높이를 1920px 이하로
            useWebWorker: true, // Web Worker를 사용하여 성능 향상
          }

          try {
            const compressedBlob = await imageCompression(imageFileObj, options)
            // 압축된 Blob을 다시 File로 변환
            imageFileObj = new File([compressedBlob], 'extracted-image.png', {
              type: 'image/png',
            })
          } catch (error) {
            console.error('이미지 압축 중 오류 발생:', error)
            // 오류 처리 (예: 에러 메시지 표시)
            setAlertMessage(['이미지 압축 실패', ' 다시 시도해주세요'])
            setIsAlertOpen(true)
          }
        }

        setImageFile(imageFileObj)
        setImagePreview(URL.createObjectURL(imageFileObj))
      } catch (error: any) {
        console.error('AI 분석 실패 : ', error)
        setAlertMessage(['AI 분석 실패', ' 다시 시도해주세요'])
        setIsAlertOpen(true)
      } finally {
        // 로딩 상태 종료
        setLoading(false)
        setIsSubmitting(false)
      }
    } else {
      console.error('분석할 이미지가 없습니다.')
      // alert('이미지와 카테고리를 설정해주세요.')
      setAlertMessage(['이미지와 카테고리를', ' 설정해주세요'])
      setIsAlertOpen(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 입력 필드 확인
    if (!name || !categoryName || !imageFile || color.length === 0) {
      // alert('이름, 카테고리, 색상 및 이미지는 필수 입력 사항입니다.')
      setAlertMessage([
        '이름, 카테고리,',
        '색상 및 이미지는',
        '필수 입력 사항입니다',
      ])
      setIsAlertOpen(true)
      return
    }

    const categoryLowName = categoryName.split(' > ').pop() || ''
    const categoryLowId = categoryNameToLowIdMap[categoryLowName] || undefined

    const request = initialData
      ? ({
          name,
          size: size || 'FREE',
          fit: fit || undefined,
          memo: memo || '',
          brand: brandName || '',
          purchaseDate: purchaseDate || '',
          purchaseSite: purchaseSite || '',
          colorList: color.map(
            (c) =>
              colorInvMap[c.name] as
                | 'WHITE'
                | 'BLACK'
                | 'GRAY'
                | 'RED'
                | 'PINK'
                | 'ORANGE'
                | 'BEIGE'
                | 'YELLOW'
                | 'BROWN'
                | 'GREEN'
                | 'KHAKI'
                | 'MINT'
                | 'BLUE'
                | 'NAVY'
                | 'SKY'
                | 'PURPLE'
                | 'LAVENDER'
                | 'WINE'
                | 'NEON'
                | 'GOLD',
          ),
          textureList: texture || [],
          seasonList: season || [],
          styleList: style || [],
          patternList: pattern || [],
          categoryLowId,
          extra: extra || '',
          processing: 0,
          // 수정모드의 경우 processing이 추가되거나 수정되는 경우 처리 필요
        } as ClothesUpdateRequest)
      : ({
          name,
          size: size || 'FREE',
          fit: fit || undefined,
          memo: memo || '',
          brand: brandName || '',
          purchaseDate: purchaseDate || '',
          purchaseSite: purchaseSite || '',
          colorList: color.map(
            (c) =>
              colorInvMap[c.name] as
                | 'WHITE'
                | 'BLACK'
                | 'GRAY'
                | 'RED'
                | 'PINK'
                | 'ORANGE'
                | 'BEIGE'
                | 'YELLOW'
                | 'BROWN'
                | 'GREEN'
                | 'KHAKI'
                | 'MINT'
                | 'BLUE'
                | 'NAVY'
                | 'SKY'
                | 'PURPLE'
                | 'LAVENDER'
                | 'WINE'
                | 'NEON'
                | 'GOLD',
          ),
          textureList: texture || [],
          seasonList: season || [],
          styleList: style || [],
          patternList: pattern || [],
          categoryLowId,
          extra: extra || '',
        } as ClothesCreateRequest)

    onSubmit(imageFile, request)
  }

  function formatValue<T extends string>(
    array: T[],
    map: { [key in string]: string },
  ): string {
    const joined = array.map((item) => map[item]).join(', ')
    return joined.length > 10 ? `${joined.substring(0, 10)}...` : joined
  }

  function formatMemo(note: string) {
    return note.length > 10 ? `${note.substring(0, 10)}...` : note
  }

  const closeModal = () => setOpenModal(null)

  const modalItems = [
    {
      label: '브랜드',
      path: 'brand',
      component: BrandModal,
      value:
        brandName.length > 10 ? `${brandName.substring(0, 10)}...` : brandName,
      setValue: (brand: string) => setBrandName(brand),
    },
    {
      label: '카테고리',
      path: 'category',
      component: CategoryModal,
      value: categoryName,
      setValue: (category: string) => setCategoryName(category),
    },
    {
      label: '구매일자',
      path: 'purchase-date',
      component: PurchaseDateModal,
      value: purchaseDate,
      setValue: (date: string) => setPurchaseDate(date),
    },
    {
      label: '구매처',
      path: 'purchase-site',
      component: PurchaseSiteModal,
      value: purchaseSite,
      setValue: (site: string) => setPurchaseSite(site),
    },
    {
      label: '계절감',
      path: 'season',
      component: SeasonModal,
      value: season ? season.map((s) => seasonInvMap[s]).join(', ') : '',
      setValue: (ss: Season[]) => setSeason(ss),
    },
    {
      label: '사이즈',
      path: 'size',
      component: SizeModal,
      value: size,
      setValue: (s: Size) => setSize(s),
    },
    {
      label: '핏',
      path: 'fit',
      component: FitModal,
      value: fit ? fitInvMap[fit] : '',
      setValue: (f: Fit) => setFit(f),
    },
    {
      label: '소재',
      path: 'texture',
      component: TextureModal,
      value: texture ? formatValue(texture, textureInvMap) : '',
      setValue: (t: Texture[]) => setTexture(t),
    },
    {
      label: '색',
      path: 'color',
      component: ColorModal,
      value: color
        ? formatValue(
            color.map((c) => c.code),
            colorMap,
          )
        : '',
      setValue: (c: Color[]) => setColor(c),
    },
    {
      label: '스타일',
      path: 'style',
      component: StyleModal,
      value: style ? formatValue(style, styleInvMap) : '',
      setValue: (st: Style[]) => setStyle(st),
    },
    {
      label: '패턴',
      path: 'pattern',
      component: PatternModal,
      value: pattern ? formatValue(pattern, patternInvMap) : '',
      setValue: (p: Pattern[]) => setPattern(p),
    },
    {
      label: '메모',
      path: 'memo',
      component: MemoModal,
      value: memo ? formatMemo(memo) : '',
      setValue: (m: string) => setMemo(m),
    },
  ]
  return loading ? (
    <LoadingPage
      messages={['AI 분석 중입니다...', '잠시만 기다려주세요.']}
      footerMessage="분석 결과를 가져오는 중입니다."
    />
  ) : (
    <div className="py-12 px-10 min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-3">
          <input
            type="file"
            name="image"
            id="image"
            className="sr-only"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className={`relative flex min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] items-center justify-center text-center rounded-lg ${imagePreview ? 'border-none' : 'border border-secondary'} `}
          >
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="p-6 object-cover"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
                <button
                  type="button"
                  onClick={handleExtractImage}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-400 text-secondary px-4 py-2 rounded-full font-bold text-xs"
                >
                  AI 분석
                </button>
              </>
            ) : (
              <div>
                <Image
                  src={CameraIcon}
                  alt="camera"
                  width={100}
                  className="opacity-50"
                />
                <span className="mb-2 block text-sm font-semibold text-[#000000] opacity-20">
                  옷 이미지 등록
                </span>
                <button
                  type="button"
                  onClick={handleExtractImage}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-400 text-secondary px-4 py-2 rounded-full font-bold text-xs"
                >
                  AI 분석
                </button>
              </div>
            )}
          </label>
        </div>
        <div className="bg-secondary p-5 max-w-[300px] rounded-lg">
          <div className="flex items-center mb-5 ">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="이름 입력"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              className="flex-1 py-2 text-center bg-secondary font-extrabold text-lg
                    text-primary-400 placeholder:text-gray-light outline-none truncate"
            />
          </div>
          {/* Form */}
          <div className="w-full max-w-md text-gray-light rounded-lg shadow-md space-y-2 mb-4">
            {modalItems.map((item) => (
              <div
                key={item.path}
                className="flex justify-between items-center border-b border-[#000000] border-opacity-30 py-2"
              >
                <span>{item.label}</span>

                <div className="flex justify-center items-center">
                  {item.value &&
                    (item.label === '색' && Array.isArray(color) ? (
                      <>
                        {color.slice(0, 3).map((c) => {
                          return (
                            <div key={c.code} className="flex">
                              <span
                                className="inline-block w-5 h-5 rounded-full mr-1.5"
                                style={{ backgroundColor: c.colorCode }}
                              />
                              <button
                                type="button"
                                className="text-primary-400 mr-2"
                                onClick={() => setOpenModal(item.path)}
                              >
                                {c.name}
                              </button>
                            </div>
                          )
                        })}
                        {color.length > 3 && (
                          <span className="text-primary-400 mr-2">...</span>
                        )}
                      </>
                    ) : (
                      <button
                        type="button"
                        className="text-primary-400 mr-2"
                        onClick={() => setOpenModal(item.path)}
                      >
                        {typeof item.value === 'string' ? item.value : ''}
                      </button>
                    ))}
                  <button
                    onClick={() => setOpenModal(item.path)}
                    className=""
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center align-middle">
            <button
              type="submit"
              className="px-8 w-[180px] h-[40px] bg-primary-400 align-middle rounded-3xl text-secondary text-md font-bold"
              disabled={isSubmitting}
            >
              {submitButtonText}
            </button>
          </div>
          {/* Modals */}
          {openModal === 'brand' && (
            <BrandModal onClose={closeModal} setValue={setBrandName} />
          )}
          {openModal === 'category' && (
            <CategoryModal onClose={closeModal} setValue={setCategoryName} />
          )}
          {openModal === 'purchase-date' && (
            <PurchaseDateModal
              onClose={closeModal}
              setValue={setPurchaseDate}
            />
          )}
          {openModal === 'purchase-site' && (
            <PurchaseSiteModal
              onClose={closeModal}
              setValue={setPurchaseSite}
            />
          )}
          {openModal === 'season' && (
            <SeasonModal onClose={closeModal} setValue={setSeason} />
          )}
          {openModal === 'size' && (
            <SizeModal onClose={closeModal} setValue={setSize} />
          )}
          {openModal === 'fit' && (
            <FitModal onClose={closeModal} setValue={setFit} />
          )}
          {openModal === 'texture' && (
            <TextureModal onClose={closeModal} setValue={setTexture} />
          )}
          {openModal === 'color' && (
            <ColorModal onClose={closeModal} setValue={setColor} />
          )}
          {openModal === 'style' && (
            <StyleModal onClose={closeModal} setValue={setStyle} />
          )}
          {openModal === 'pattern' && (
            <PatternModal onClose={closeModal} setValue={setPattern} />
          )}
          {openModal === 'memo' && (
            <MemoModal onClose={closeModal} setValue={setMemo} />
          )}
          {isAlertOpen && (
            <AlertModal onClose={handleAlertClose} messages={alertMessage} />
          )}
        </div>
      </form>
      {isLoadingModal && <LoadingModal />}
    </div>
  )
}
