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
  AddFavoriteData,
  CreateFavoriteGroupData,
  DeleteFavorite1Data,
  DeleteFavoriteData,
  DeleteFavoriteGroupData,
  FavoriteGroupCreateRequest,
  FavoriteListDeleteRequest,
  GetFavoritesByGroupData,
  GetFavoritesGroupListOfUsersData,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 새로운 즐겨찾기 그룹을 생성합니다.
   *
   * @tags favorite-controller
   * @name CreateFavoriteGroup
   * @summary 즐겨찾기 그룹 생성
   * @request POST:/api/favorites
   * @secure
   * @response `200` `CreateFavoriteGroupData` OK
   */
  createFavoriteGroup = (
    data: FavoriteGroupCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateFavoriteGroupData, any>({
      path: `/api/favorites`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * @description 즐겨찾기 그룹에 새로운 코디를 추가합니다.
   *
   * @tags favorite-controller
   * @name AddFavorite
   * @summary 즐겨찾기 그룹에 코디 추가
   * @request POST:/api/favorites/{favoriteGroupId}/coordinate/{coordinateId}
   * @secure
   * @response `200` `AddFavoriteData` OK
   */
  addFavorite = (
    favoriteGroupId: number,
    coordinateId: number,
    params: RequestParams = {},
  ) =>
    this.request<AddFavoriteData, any>({
      path: `/api/favorites/${favoriteGroupId}/coordinate/${coordinateId}`,
      method: 'POST',
      secure: true,
      ...params,
    })
  /**
   * @description 즐겨찾기 그룹에서 특정 코디를 삭제합니다.
   *
   * @tags favorite-controller
   * @name DeleteFavorite1
   * @summary 즐겨찾기 코디 삭제
   * @request DELETE:/api/favorites/{favoriteGroupId}/coordinate/{coordinateId}
   * @secure
   * @response `200` `DeleteFavorite1Data` OK
   */
  deleteFavorite1 = (
    favoriteGroupId: number,
    coordinateId: number,
    params: RequestParams = {},
  ) =>
    this.request<DeleteFavorite1Data, any>({
      path: `/api/favorites/${favoriteGroupId}/coordinate/${coordinateId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * @description 특정 즐겨찾기 그룹의 코디 목록을 조회합니다.
   *
   * @tags favorite-controller
   * @name GetFavoritesByGroup
   * @summary 즐겨찾기 상세 코디 목록 조회
   * @request GET:/api/favorites/{favoriteGroupId}
   * @secure
   * @response `200` `GetFavoritesByGroupData` OK
   */
  getFavoritesByGroup = (favoriteGroupId: number, params: RequestParams = {}) =>
    this.request<GetFavoritesByGroupData, any>({
      path: `/api/favorites/${favoriteGroupId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description 특정 즐겨찾기 그룹을 삭제합니다.
   *
   * @tags favorite-controller
   * @name DeleteFavoriteGroup
   * @summary 즐겨찾기 삭제
   * @request DELETE:/api/favorites/{favoriteGroupId}
   * @secure
   * @response `200` `DeleteFavoriteGroupData` OK
   */
  deleteFavoriteGroup = (favoriteGroupId: number, params: RequestParams = {}) =>
    this.request<DeleteFavoriteGroupData, any>({
      path: `/api/favorites/${favoriteGroupId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * @description 내 즐겨찾기 그룹 목록을 조회합니다.
   *
   * @tags favorite-controller
   * @name GetFavoritesGroupListOfUsers
   * @summary 내 즐겨찾기 목록 조회
   * @request GET:/api/favorites/users
   * @secure
   * @response `200` `GetFavoritesGroupListOfUsersData` OK
   */
  getFavoritesGroupListOfUsers = (params: RequestParams = {}) =>
    this.request<GetFavoritesGroupListOfUsersData, any>({
      path: `/api/favorites/users`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * @description 즐겨찾기 그룹에서 여러 코디를 삭제합니다.
   *
   * @tags favorite-controller
   * @name DeleteFavorite
   * @summary 즐겨찾기 코디 삭제
   * @request DELETE:/api/favorites/{favoriteGroupId}/coordinate
   * @secure
   * @response `200` `DeleteFavoriteData` OK
   */
  deleteFavorite = (
    favoriteGroupId: number,
    data: FavoriteListDeleteRequest,
    params: RequestParams = {},
  ) =>
    this.request<DeleteFavoriteData, any>({
      path: `/api/favorites/${favoriteGroupId}/coordinate`,
      method: 'DELETE',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
