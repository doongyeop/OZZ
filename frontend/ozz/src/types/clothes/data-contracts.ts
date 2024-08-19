/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CoordinateClothesCreateRequest {
  /** @format int64 */
  clothesId?: number
  /** @format int32 */
  offset?: number
}

export interface CoordinateUpdateRequest {
  name?: string
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  clothesList?: CoordinateClothesCreateRequest[]
}

/** 하위 카테고리 정보 DTO */
export interface CategoryLowResponse {
  /** @format byte */
  categoryLowId?: number
  name?: string
}

/** 옷 기본 정보 DTO */
export interface ClothesBasicResponse {
  /** @format int64 */
  clothesId: number
  name?: string
  /** @format date-time */
  createdDate?: string
  /** @format int64 */
  imageFileId?: number
  /** 하위 카테고리 정보 DTO */
  categoryLow?: CategoryLowResponse
}

export interface CoordinateClothesBasicResponse {
  /** 옷 기본 정보 DTO */
  clothes?: ClothesBasicResponse
  /** @format int32 */
  offset?: number
}

export interface CoordinateResponse {
  /** @format int64 */
  coordinateId?: number
  name?: string
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  /** @format date-time */
  createdDate?: string
  clothesList?: CoordinateClothesBasicResponse[]
  imageFile?: FileInfo
}

export interface FileInfo {
  /** @format int64 */
  fileId: number
  filePath: string
  fileName?: string
  fileType?: string
}

/** 옷 수정 요청 DTO */
export interface ClothesUpdateRequest {
  /** @format byte */
  categoryLowId?: number
  name?: string
  size?: 'FREE' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  fit?: 'OVER_FIT' | 'SEMI_OVER_FIT' | 'REGULAR_FIT' | 'SLIM_FIT'
  memo?: string
  brand?: string
  /** @format date */
  purchaseDate?: string
  purchaseSite?: string
  colorList?: (
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
    | 'GOLD'
  )[]
  textureList?: (
    | 'FUR'
    | 'KNIT'
    | 'MOUTON'
    | 'LACE'
    | 'SUEDE'
    | 'LINEN'
    | 'ANGORA'
    | 'MESH'
    | 'CORDUROY'
    | 'FLEECE'
    | 'SEQUIN_GLITTER'
    | 'NEOPRENE'
    | 'DENIM'
    | 'SILK'
    | 'JERSEY'
    | 'SPANDEX'
    | 'TWEED'
    | 'JACQUARD'
    | 'VELVET'
    | 'LEATHER'
    | 'VINYL_PVC'
    | 'COTTON'
    | 'WOOL_CASHMERE'
    | 'CHIFFON'
    | 'SYNTHETIC_POLYESTER'
  )[]
  seasonList?: ('SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER')[]
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  patternList?: (
    | 'SOLID'
    | 'STRIPED'
    | 'ZIGZAG'
    | 'LEOPARD'
    | 'ZEBRA'
    | 'ARGYLE'
    | 'DOT'
    | 'PAISLEY'
    | 'CAMOUFLAGE'
    | 'FLORAL'
    | 'LETTERING'
    | 'GRAPHIC'
    | 'SKULL'
    | 'TIE_DYE'
    | 'GINGHAM'
    | 'GRADATION'
    | 'CHECK'
    | 'HOUNDSTOOTH'
  )[]
  extra?: string
  processing?: number
}

/** 상위 카테고리 기본 정보 DTO */
export interface CategoryHighBasicResponse {
  /** @format byte */
  categoryHighId?: number
  name?: string
}

/** 옷 상세 정보 DTO with 파일 DTO */
export interface ClothesWithFileResponse {
  name?: string
  size?: 'FREE' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  fit?: 'OVER_FIT' | 'SEMI_OVER_FIT' | 'REGULAR_FIT' | 'SLIM_FIT'
  memo?: string
  brand?: string
  /** @format date */
  purchaseDate?: string
  purchaseSite?: string
  colorList?: (
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
    | 'GOLD'
  )[]
  textureList?: (
    | 'FUR'
    | 'KNIT'
    | 'MOUTON'
    | 'LACE'
    | 'SUEDE'
    | 'LINEN'
    | 'ANGORA'
    | 'MESH'
    | 'CORDUROY'
    | 'FLEECE'
    | 'SEQUIN_GLITTER'
    | 'NEOPRENE'
    | 'DENIM'
    | 'SILK'
    | 'JERSEY'
    | 'SPANDEX'
    | 'TWEED'
    | 'JACQUARD'
    | 'VELVET'
    | 'LEATHER'
    | 'VINYL_PVC'
    | 'COTTON'
    | 'WOOL_CASHMERE'
    | 'CHIFFON'
    | 'SYNTHETIC_POLYESTER'
  )[]
  seasonList?: ('SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER')[]
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  patternList?: (
    | 'SOLID'
    | 'STRIPED'
    | 'ZIGZAG'
    | 'LEOPARD'
    | 'ZEBRA'
    | 'ARGYLE'
    | 'DOT'
    | 'PAISLEY'
    | 'CAMOUFLAGE'
    | 'FLORAL'
    | 'LETTERING'
    | 'GRAPHIC'
    | 'SKULL'
    | 'TIE_DYE'
    | 'GINGHAM'
    | 'GRADATION'
    | 'CHECK'
    | 'HOUNDSTOOTH'
  )[]
  /** 상위 카테고리 기본 정보 DTO */
  categoryHigh?: CategoryHighBasicResponse
  /** 하위 카테고리 정보 DTO */
  categoryLow?: CategoryLowResponse
  imageFile?: FileInfo
}

export interface CoordinateCreateRequest {
  name?: string
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  clothesList?: CoordinateClothesCreateRequest[]
}

/** 옷 생성 요청 DTO */
export interface ClothesCreateRequest {
  name?: string
  size?: 'FREE' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  fit?: 'OVER_FIT' | 'SEMI_OVER_FIT' | 'REGULAR_FIT' | 'SLIM_FIT'
  memo?: string
  brand?: string
  /** @format date */
  purchaseDate?: string
  purchaseSite?: string
  colorList?: (
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
    | 'GOLD'
  )[]
  textureList?: (
    | 'FUR'
    | 'KNIT'
    | 'MOUTON'
    | 'LACE'
    | 'SUEDE'
    | 'LINEN'
    | 'ANGORA'
    | 'MESH'
    | 'CORDUROY'
    | 'FLEECE'
    | 'SEQUIN_GLITTER'
    | 'NEOPRENE'
    | 'DENIM'
    | 'SILK'
    | 'JERSEY'
    | 'SPANDEX'
    | 'TWEED'
    | 'JACQUARD'
    | 'VELVET'
    | 'LEATHER'
    | 'VINYL_PVC'
    | 'COTTON'
    | 'WOOL_CASHMERE'
    | 'CHIFFON'
    | 'SYNTHETIC_POLYESTER'
  )[]
  seasonList?: ('SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER')[]
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  patternList?: (
    | 'SOLID'
    | 'STRIPED'
    | 'ZIGZAG'
    | 'LEOPARD'
    | 'ZEBRA'
    | 'ARGYLE'
    | 'DOT'
    | 'PAISLEY'
    | 'CAMOUFLAGE'
    | 'FLORAL'
    | 'LETTERING'
    | 'GRAPHIC'
    | 'SKULL'
    | 'TIE_DYE'
    | 'GINGHAM'
    | 'GRADATION'
    | 'CHECK'
    | 'HOUNDSTOOTH'
  )[]
  extra?: string
  /** @format byte */
  categoryLowId?: number
}

export interface PurchaseHistory {
  name: string
  brand: string
  /** @format date */
  purchaseDate: string
  purchaseSite: string
  imgUrl: string
  option: string
}

export type ServerSentEventString = object

export interface CoordinateBasicResponse {
  /** @format int64 */
  coordinateId?: number
  name?: string
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  /** @format date-time */
  createdDate?: string
  imageFile?: FileInfo
}

export interface CoordinateSearchCondition {
  styleList?: (
    | 'FORMAL'
    | 'MANNISH'
    | 'ELEGANT'
    | 'ETHNIC'
    | 'MODERN'
    | 'NATURAL'
    | 'ROMANTIC'
    | 'SPORTY'
    | 'STREET'
    | 'CASUAL'
  )[]
  /** @format int64 */
  favoriteGroupId?: number
  keyword?: string
}

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number
  /**
   * @format int32
   * @min 1
   */
  size?: number
  sort?: string[]
}

export interface PageableObject {
  /** @format int64 */
  offset: number
  sort?: SortObject
  paged: boolean
  /** @format int32 */
  pageNumber: number
  /** @format int32 */
  pageSize: number
  unpaged: boolean
}

export interface SliceCoordinateBasicResponse {
  /** @format int32 */
  size?: number
  content?: CoordinateBasicResponse[]
  /** @format int32 */
  number?: number
  sort?: SortObject
  pageable?: PageableObject
  /** @format int32 */
  numberOfElements?: number
  first?: boolean
  last?: boolean
  empty?: boolean
}

export interface SortObject {
  empty?: boolean
  sorted?: boolean
  unsorted?: boolean
}

/** 옷 검색 DTO */
export interface ClothesSearchCondition {
  /** @format byte */
  categoryHighId?: number | string
  /** @format byte */
  categoryLowId?: number | string
  keyword?: string
}

/** 옷 기본 정보 DTO */
export interface ClothesBasicWithFileResponse {
  /** @format int64 */
  clothesId: number
  name: string
  /** @format date-time */
  createdDate?: string
  /** 하위 카테고리 정보 DTO */
  categoryLow?: CategoryLowResponse
  imageFile: FileInfo | null
}

export interface SliceClothesBasicWithFileResponse {
  /** @format int32 */
  size: number
  content: ClothesBasicWithFileResponse[]
  /** @format int32 */
  number: number
  sort?: SortObject
  pageable: PageableObject
  /** @format int32 */
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface PropertyResponse {
  code?: string
  name?: string
}

export interface ColorResponse {
  code?: string
  name?: string
  colorCode?: string
}

/** 상위 카테고리 정보 DTO */
export interface CategoryHighResponse {
  /** @format byte */
  categoryHighId?: string
  name?: string
  categoryLowList?: CategoryLowResponse[]
}

export type GetCoordinateData = CoordinateResponse

export interface UpdateCoordinatePayload {
  /** @format binary */
  imageFile: File
  request: CoordinateUpdateRequest
}

export type UpdateCoordinateData = CoordinateResponse

export type DeleteCoordinateData = any

export type GetClothesData = ClothesWithFileResponse

export interface UpdateClothesPayload {
  /** @format binary */
  imageFile?: File
  /** 옷 수정 요청 DTO */
  request: ClothesUpdateRequest
}

export type UpdateClothesData = ClothesWithFileResponse

export type DeleteClothesData = any

export interface CreateCoordinatePayload {
  /** @format binary */
  imageFile: File
  request: CoordinateCreateRequest
}

/** @format int64 */
export type CreateCoordinateData = number

export interface AddClothesPayload {
  /** @format binary */
  imageFile: File
  /** 옷 생성 요청 DTO */
  request: ClothesCreateRequest
}

/** @format int64 */
export type AddClothesData = number

export type StartBatchPayload = PurchaseHistory[]

export type StartBatchData = ServerSentEventString[]

export type GetCoordinateBasicResponseData = CoordinateBasicResponse

export type GetCoordinateListData = SliceCoordinateBasicResponse

export type SearchCoordinateListData = SliceCoordinateBasicResponse

export type GetClothesOfUserData = SliceClothesBasicWithFileResponse

export type SearchClothesData = SliceClothesBasicWithFileResponse

export type GetPropertyListData = PropertyResponse[]

export type GetColorListData = ColorResponse[]

export type GetCategoriesData = CategoryHighResponse[]

export type GetCategoryHighData = CategoryHighResponse
