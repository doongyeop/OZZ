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

export interface FavoriteGroupCreateRequest {
  name?: string
}

export interface FavoriteGroupBasicResponse {
  /** @format int64 */
  favoriteGroupId?: number
  name?: string
}

export interface CoordinateBasicResponse {
  /** @format int64 */
  coordinateId?: number
  name?: string
  styleList?: (
    | 'CASUAL'
    | 'CLASSIC'
    | 'MANNISH'
    | 'FEMININE'
    | 'HIPPIE'
    | 'MODERN'
    | 'COUNTRY'
    | 'GENDERLESS'
    | 'SPORTY'
    | 'RETRO'
    | 'MILITARY'
    | 'PREPPY'
    | 'TOMBOY'
    | 'ROMANTIC'
    | 'WESTERN'
    | 'SOPHISTICATED'
    | 'COTTAGER'
    | 'RESORT'
    | 'KITSCH'
    | 'KIDULT'
    | 'STREET'
    | 'SEXY'
    | 'ORIENTAL'
    | 'AVANT_GARDE'
    | 'HIPHOP'
    | 'PUNK'
  )[]
  /** @format date-time */
  createdDate?: string
  imageFile?: FileInfo
}

export interface FavoriteResponse {
  /** @format int64 */
  favoriteId?: number
  coordinate?: CoordinateBasicResponse
}

export interface FileInfo {
  /** @format int64 */
  fileId: number
  filePath: string
  fileName: string
  fileType: string
}

export interface FavoriteGroupImageResponse {
  /** @format int64 */
  favoriteGroupId: number
  name: string
  imageFileList: FileInfo[]
}

export interface FavoriteListDeleteRequest {
  coordinateIdList?: number[]
}

export type CreateFavoriteGroupData = FavoriteGroupBasicResponse

export type AddFavoriteData = FavoriteResponse

export type DeleteFavorite1Data = any

export type GetFavoritesByGroupData = FavoriteResponse[]

export type DeleteFavoriteGroupData = any

export type GetFavoritesGroupListOfUsersData = FavoriteGroupImageResponse[]

export type DeleteFavoriteData = any
