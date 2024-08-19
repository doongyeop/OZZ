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

import {
  AddClothesData,
  AddClothesPayload,
  ClothesSearchCondition,
  CoordinateSearchCondition,
  CreateCoordinateData,
  CreateCoordinatePayload,
  DeleteClothesData,
  DeleteCoordinateData,
  GetCategoriesData,
  GetCategoryHighData,
  GetClothesData,
  GetClothesOfUserData,
  GetColorListData,
  GetCoordinateBasicResponseData,
  GetCoordinateData,
  GetCoordinateListData,
  GetPropertyListData,
  Pageable,
  SearchClothesData,
  SearchCoordinateListData,
  StartBatchData,
  StartBatchPayload,
  UpdateClothesData,
  UpdateClothesPayload,
  UpdateCoordinateData,
  UpdateCoordinatePayload,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description ID를 통해 특정 코디 세부 정보를 조회합니다.
   *
   * @tags Coordinate API
   * @name GetCoordinate
   * @summary 코디 상세 조회
   * @request GET:/api/coordinates/{coordinateId}
   * @secure
   * @response `200` `GetCoordinateData` OK
   */
  getCoordinate = (coordinateId: number, params: RequestParams = {}) =>
    this.request<GetCoordinateData, any>({
      path: `/api/coordinates/${coordinateId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description ID를 통해 특정 코디의 세부 정보를 수정합니다.
   *
   * @tags Coordinate API
   * @name UpdateCoordinate
   * @summary 코디 정보 수정
   * @request PUT:/api/coordinates/{coordinateId}
   * @secure
   * @response `200` `UpdateCoordinateData` OK
   */
  updateCoordinate = (
    coordinateId: number,
    data: UpdateCoordinatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateCoordinateData, any>({
      path: `/api/coordinates/${coordinateId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * @description ID를 통해 특정 코디를 삭제합니다.
   *
   * @tags Coordinate API
   * @name DeleteCoordinate
   * @summary 코디 삭제
   * @request DELETE:/api/coordinates/{coordinateId}
   * @secure
   * @response `200` `DeleteCoordinateData` OK
   */
  deleteCoordinate = (coordinateId: number, params: RequestParams = {}) =>
    this.request<DeleteCoordinateData, any>({
      path: `/api/coordinates/${coordinateId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * @description ID를 통해 특정 옷의 세부 정보를 조회합니다.
   *
   * @tags Clothes API
   * @name GetClothes
   * @summary 옷 상세 조회
   * @request GET:/api/clothes/{clothesId}
   * @secure
   * @response `200` `GetClothesData` OK
   */
  getClothes = (clothesId: number, params: RequestParams = {}) =>
    this.request<GetClothesData, any>({
      path: `/api/clothes/${clothesId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description ID를 통해 특정 옷의 세부 정보를 수정합니다.
   *
   * @tags Clothes API
   * @name UpdateClothes
   * @summary 옷 정보 수정
   * @request PUT:/api/clothes/{clothesId}
   * @secure
   * @response `200` `UpdateClothesData` OK
   */
  updateClothes = (
    clothesId: number,
    data: UpdateClothesPayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateClothesData, any>({
      path: `/api/clothes/${clothesId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * @description ID를 통해 특정 옷을 삭제합니다.
   *
   * @tags Clothes API
   * @name DeleteClothes
   * @summary 옷 삭제
   * @request DELETE:/api/clothes/{clothesId}
   * @secure
   * @response `200` `DeleteClothesData` OK
   */
  deleteClothes = (clothesId: number, params: RequestParams = {}) =>
    this.request<DeleteClothesData, any>({
      path: `/api/clothes/${clothesId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * @description 데이터베이스에 새 코디를 추가합니다.
   *
   * @tags Coordinate API
   * @name CreateCoordinate
   * @summary 새 코디 추가
   * @request POST:/api/coordinates
   * @secure
   * @response `200` `CreateCoordinateData` OK
   */
  createCoordinate = (
    data: CreateCoordinatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CreateCoordinateData, any>({
      path: `/api/coordinates`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * @description 데이터베이스에 새 옷을 추가합니다.
   *
   * @tags Clothes API
   * @name AddClothes
   * @summary 새 옷 추가
   * @request POST:/api/clothes
   * @secure
   * @response `200` `AddClothesData` OK
   */
  addClothes = (data: AddClothesPayload, params: RequestParams = {}) =>
    this.request<AddClothesData, any>({
      path: `/api/clothes`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * @description 온라인 마켓의 구매내역을 통해 옷장을 채웁니다
   *
   * @tags Clothes API
   * @name StartBatch
   * @summary 불러오기로 새 옷 추가
   * @request POST:/api/clothes/batch
   * @secure
   * @response `200` `StartBatchData` OK
   */
  startBatch = (data: StartBatchPayload, params: RequestParams = {}) =>
    this.request<StartBatchData, any>({
      path: `/api/clothes/batch`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })

  /**
   * @description ID를 통해 특정 코디 세부 정보를 조회합니다.
   *
   * @tags Coordinate API
   * @name GetCoordinateBasicResponse
   * @summary 코디 상세 조회
   * @request GET:/api/coordinates/{coordinateId}/basic
   * @secure
   * @response `200` `GetCoordinateBasicResponseData` OK
   */
  getCoordinateBasicResponse = (
    coordinateId: number,
    params: RequestParams = {},
  ) =>
    this.request<GetCoordinateBasicResponseData, any>({
      path: `/api/coordinates/${coordinateId}/basic`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description 특정 사용자의 코디 목록을 슬라이스 형태로 조회합니다.
   *
   * @tags Coordinate API
   * @name GetCoordinateList
   * @summary 사용자의 코디 조회
   * @request GET:/api/coordinates/users
   * @secure
   * @response `200` `GetCoordinateListData` OK
   */
  getCoordinateList = (
    query: {
      condition: CoordinateSearchCondition
      pageable: Pageable
    },
    params: RequestParams = {},
  ) =>
    this.request<GetCoordinateListData, any>({
      path: `/api/coordinates/users`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * @description 검색된 코디 목록을 슬라이스 형태로 조회합니다.
   *
   * @tags Coordinate API
   * @name SearchCoordinateList
   * @summary 키워드로 코디 검색
   * @request GET:/api/coordinates/search
   * @secure
   * @response `200` `SearchCoordinateListData` OK
   */
  searchCoordinateList = (
    query: {
      condition: CoordinateSearchCondition
      pageable: Pageable
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchCoordinateListData, any>({
      path: `/api/coordinates/search`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * @description 특정 사용자의 옷 목록을 슬라이스 형태로 조회합니다.
   *
   * @tags Clothes API
   * @name GetClothesOfUser
   * @summary 사용자의 옷 조회
   * @request GET:/api/clothes/users
   * @secure
   * @response `200` `GetClothesOfUserData` OK
   */
  getClothesOfUser = (
    query: {
      /** 옷 검색 DTO */
      condition: ClothesSearchCondition
      pageable: Pageable
    },
    params: RequestParams = {},
  ) =>
    this.request<GetClothesOfUserData>({
      path: `/api/clothes/users`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * @description 검색된 옷 목록을 슬라이스 형태로 조회합니다.
   *
   * @tags Clothes API
   * @name SearchClothes
   * @summary 키워드로 옷 검색
   * @request GET:/api/clothes/search
   * @secure
   * @response `200` `SearchClothesData` OK
   */
  searchClothes = (
    query: {
      /** 옷 검색 DTO */
      condition: ClothesSearchCondition
      pageable: Pageable
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchClothesData, any>({
      path: `/api/clothes/search`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * @description 옷 속성 목록 정보를 조회합니다. [FIT, SEASON, SIZE, STYLE, TEXTURE] 중 택1
   *
   * @tags Clothes API
   * @name GetPropertyList
   * @summary 옷 속성 목록 정보 조회
   * @request GET:/api/clothes/properties
   * @secure
   * @response `200` `GetPropertyListData` OK
   */
  getPropertyList = (
    query: {
      property:
        | 'FIT'
        | 'SEASON'
        | 'SIZE'
        | 'STYLE'
        | 'TEXTURE'
        | 'COLOR'
        | 'PATTERN'
    },
    params: RequestParams = {},
  ) =>
    this.request<GetPropertyListData, any>({
      path: `/api/clothes/properties`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * @description 색상 목록 정보를 조회합니다.
   *
   * @tags Clothes API
   * @name GetColorList
   * @summary 색상 목록 정보 조회
   * @request GET:/api/clothes/properties/colors
   * @secure
   * @response `200` `GetColorListData` OK
   */
  getColorList = (params: RequestParams = {}) =>
    this.request<GetColorListData, any>({
      path: `/api/clothes/properties/colors`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description 상위, 하위의 모든 카테고리 정보를 조회합니다.
   *
   * @tags Category API
   * @name GetCategories
   * @summary 상위 카테고리 목록 세부 조회
   * @request GET:/api/categories
   * @secure
   * @response `200` `GetCategoriesData` OK
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<GetCategoriesData, any>({
      path: `/api/categories`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description 특정 상위 카테고리의 하위 카테고리 목록 조회합니다.
   *
   * @tags Category API
   * @name GetCategoryHigh
   * @summary 특정 상위 카테고리의 하위 카테고리 목록 조회
   * @request GET:/api/categories/{categoryHighId}
   * @secure
   * @response `200` `GetCategoryHighData` OK
   */
  getCategoryHigh = (categoryHighId: string, params: RequestParams = {}) =>
    this.request<GetCategoryHighData, any>({
      path: `/api/categories/${categoryHighId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
}
