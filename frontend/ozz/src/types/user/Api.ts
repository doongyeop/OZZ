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
  CheckNicknameData,
  DeleteUserData,
  GetUserInfoData,
  UpdateUserData,
  UploadProfileImageData,
  UploadProfileImagePayload,
  UserUpdateRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user-controller
   * @name GetUserInfo
   * @summary 토큰으로 유저정보를 조회
   * @request GET:/api/users/
   * @secure
   * @response `200` `GetUserInfoData` OK
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<GetUserInfoData, any>({
      path: `/api/users/`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags user-controller
   * @name UpdateUser
   * @summary 토큰으로 유저정보 수정
   * @request PUT:/api/users/
   * @secure
   * @response `200` `UpdateUserData` OK
   */
  updateUser = (data: UserUpdateRequest, params: RequestParams = {}) =>
    this.request<UpdateUserData, any>({
      path: `/api/users/`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags user-controller
   * @name DeleteUser
   * @summary 회원 탈퇴
   * @request DELETE:/api/users/
   * @secure
   * @response `200` `DeleteUserData` OK
   */
  deleteUser = (params: RequestParams = {}) =>
    this.request<DeleteUserData, any>({
      path: `/api/users/`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags user-controller
   * @name UploadProfileImage
   * @summary 유저 프로필 변경
   * @request PATCH:/api/users/profile
   * @secure
   * @response `200` `UploadProfileImageData` OK
   */
  uploadProfileImage = (
    data: UploadProfileImagePayload,
    params: RequestParams = {},
  ) =>
    this.request<UploadProfileImageData, any>({
      path: `/api/users/profile`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })

  /**
   * No description
   *
   * @tags user-controller
   * @name CheckNickname
   * @summary 닉네임 중복 조회
   * @request GET:/api/users/check
   * @secure
   * @response `200` `CheckNicknameData` OK
   */
  checkNickname = (
    query: {
      nickname: string
    },
    params: RequestParams = {},
  ) =>
    this.request<CheckNicknameData, any>({
      path: `/api/users/check`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })

  /**
   * No description
   *
   * @tags user-controller
   * @name DeleteProfileImage
   * @summary 프로필 이미지 삭제
   * @request PATCH:/api/users/
   * @secure
   * @response `204` `void` Profile image has been deleted successfully
   * @response `500` `void` Failed to delete profile image
   */
  deleteProfileImage = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/users/`,
      method: 'PATCH',
      secure: true,
      ...params,
    })
}
