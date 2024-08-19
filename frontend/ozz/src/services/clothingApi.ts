'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { ClothingData, colors, colorCodeMap, colorMap } from '@/types/clothing'
import {
  ClothesSearchCondition,
  GetClothesOfUserData,
  Pageable,
  ClothesCreateRequest,
  AddClothesPayload,
  ClothesUpdateRequest,
  UpdateClothesPayload,
  CreateCoordinatePayload,
  UpdateCoordinatePayload,
  CoordinateSearchCondition,
} from '@/types/clothes/data-contracts'
import {
  getTokens,
  syncTokensWithCookies,
  validateAndRefreshToken,
  getClothesApi,
  getFileApi,
} from '@/services/authApi'

export async function fetchUserClothes(
  pageable: Pageable,
  searchCondition: ClothesSearchCondition,
): Promise<GetClothesOfUserData> {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.getClothesOfUser({
    condition: searchCondition,
    pageable,
  })
  return response.json()
}

export async function fetchImage(filePath: string): Promise<string> {
  const fileApi = await getFileApi()

  const response = await fileApi.downloadFile(filePath)
  const blob = await response.blob()

  return URL.createObjectURL(blob)
}

export async function fetchImageFile(filePath: string): Promise<File> {
  const fileApi = await getFileApi()

  const response = await fileApi.downloadFile(filePath)
  const blob = await response.blob()

  const fileName = filePath.split('/').pop() || 'downloaded-image.png'
  return new File([blob], fileName, { type: blob.type })
}

export const createClothing = async (
  imageFile: File,
  request: ClothesCreateRequest,
) => {
  const clothesApi = await getClothesApi()
  const payload: AddClothesPayload = {
    imageFile,
    request,
  }
  const response = await clothesApi.addClothes(payload)
  return response
}

export async function getClothingDetails(clothesId: number) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.getClothes(clothesId)
  const data = await response.json()

  // 포맷팅 작업
  const formattedData: ClothingData = {
    id: data.id,
    name: data.name,
    categoryName: data.categoryLow.name, // categoryLow.name을 사용
    brandName: data.brand || null,
    purchaseDate: data.purchaseDate || null,
    purchaseSite: data.purchaseSite || null,
    season: data.seasonList || [],
    size: data.size || null,
    fit: data.fit || null,
    texture: data.textureList || [],
    color: data.colorList
      ? data.colorList.map((colorCode: string) => {
          // 색상 코드를 기반으로 Color 객체를 찾음
          const colorObj = colors.find((color) => color.code === colorCode)

          if (colorObj) {
            return colorObj
          }
          console.warn(`No match found for color code: ${colorCode}`)
          // colorObj가 없으면 기본값으로 빈 Color 객체를 반환하거나 다른 적절한 처리
          return {
            code: colorCode,
            name: colorMap[colorCode], // colorMap에서 이름을 찾음
            colorCode: colorCodeMap[colorCode], // 또는 적절한 기본 색상 코드를 지정
          }
        })
      : [],
    style: data.styleList || [],
    pattern: data.patternList || [],
    memo: data.memo || null,
    image: data.imageFile ? await fetchImage(data.imageFile.filePath) : null, // 이미지 파일을 변환
    imageFile: data.imageFile ? data.imageFile : null,
    extra: data.extra || null,
  }

  return formattedData
}

export const updateClothing = async (
  id: number,
  imageFile: File,
  request: ClothesUpdateRequest,
) => {
  const clothesApi = await getClothesApi()
  const payload: UpdateClothesPayload = {
    imageFile,
    request,
  }

  const response = await clothesApi.updateClothes(id, payload)
  return response.data
}

export const deleteClothing = async (id: number) => {
  const clothesApi = await getClothesApi()
  const response = await clothesApi.deleteClothes(id)
  return response.data
}

export const extractClothing = async (
  file: File | { filePath: string },
  highCategory: string,
) => {
  const url = 'https://i11a804.p.ssafy.io/api/ai/attributes/extract'
  syncTokensWithCookies()
  validateAndRefreshToken()

  const tokens = getTokens()
  if (!tokens || !tokens.accessToken) {
    throw new Error('Access token is missing')
  }

  let imageFile: File

  // 파일이 객체 형태로 전달되었을 경우, 파일로 변환
  if (!(file instanceof File)) {
    imageFile = await fetchImageFile(file.filePath)
  } else {
    imageFile = file
  }

  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('highCategory', highCategory)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
    body: formData,
    redirect: 'follow',
  }

  // console.log('requestOptions ', requestOptions)
  // console.log('image : ', file)
  // formData.forEach((value, key) => {
  //   console.log(`${key}:`, value)
  // })

  try {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json() // Assuming the API returns JSON
    return result
  } catch (error) {
    console.error('Error extracting clothing attributes:', error)
    throw error
  }
}

export const createCoordinate = async (payload: CreateCoordinatePayload) => {
  const clothesApi = await getClothesApi()
  const response = await clothesApi.createCoordinate(payload)
  const data = await response.json()
  return data
}

export const fetchMockClothingList = () => [
  {
    size: 2,
    content: [
      {
        clothesId: 1,
        name: 'SPRAY CARTOON GRAPHIC SS WHITE',
        createdDate: '2024-07-27T01:14:35.702Z',
        categoryLow: {
          categoryLowId: '1',
          name: '반팔',
        },
        imageFile: {
          fileId: 1,
          filePath: '/images/sample-shirt.png', // 실제 이미지 파일 경로로 대체
          fileName: 'sample-shirt.png',
          fileType: 'image/png',
        },
      },
      {
        clothesId: 2,
        name: '기본 반팔티',
        createdDate: '2024-07-30T01:14:35.702Z',
        categoryLow: {
          categoryLowId: '1',
          name: '반팔',
        },
        imageFile: {
          fileId: 1,
          filePath: '/images/mockup/tops02.png', // 실제 이미지 파일 경로로 대체
          fileName: 'sample-shirt.png',
          fileType: 'image/png',
        },
      },
    ],
    number: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    pageable: {
      offset: 0,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      paged: true,
      pageNumber: 0,
      pageSize: 1,
      unpaged: true,
    },
    first: true,
    last: true,
    numberOfElements: 1,
    empty: false,
  },
]

export const fetchMockClothing = (id: number): ClothingData => ({
  id,
  name: `SPRAY CARTOON GRAPHIC SS WHITE`,
  brandName: '팀코믹스',
  categoryName: '상의 > 반팔',
  purchaseDate: '2023-01-01',
  purchaseSite: '온라인 스토어',
  season: ['SPRING', 'AUTUMN'],
  size: 'M',
  fit: 'REGULAR_FIT',
  texture: ['COTTON', 'SYNTHETIC_POLYESTER'],
  color: [],
  style: ['CASUAL', 'STREET'],
  pattern: ['SOLID'],
  memo: '자주 입는 옷입니다.',
  image: null, // 실제 이미지 파일은 목업 데이터에서 제외
  imageFile: null,
  extra: '',
  // processing: 0,
})

export async function getCoordinate(coordinateId: number) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.getCoordinate(coordinateId)
  const data = await response.json()
  return data
}

export async function updateCoordinate(
  coordinateId: number,
  data: UpdateCoordinatePayload,
) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.updateCoordinate(coordinateId, data)
  return response.json()
}

export async function deleteCoordinate(coordinateId: number) {
  const clothesApi = await getClothesApi()
  // console.log('삭제 요청 보낼게요')
  const response = await clothesApi.deleteCoordinate(coordinateId)
  // console.log('삭제 완료 response는', response)
  return response
}

export async function getCoordinateBasicResponse(coordinateId: number) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.getCoordinateBasicResponse(coordinateId)
  const data = await response.json()
  return data
}

export async function getCoordinateList(
  condition: CoordinateSearchCondition,
  pageable: Pageable,
) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.getCoordinateList({
    condition,
    pageable,
  })
  return response.json()
}

export async function searchCoordinateList(
  condition: CoordinateSearchCondition,
  pageable: Pageable,
) {
  const clothesApi = await getClothesApi()

  const response = await clothesApi.searchCoordinateList({
    condition,
    pageable,
  })
  return response.json()
}
