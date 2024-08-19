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

import { DeleteRefreshTokenOfUserData, ReissueData } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth-controller
   * @name Reissue
   * @summary access토큰 재발급, rotate 적용
   * @request POST:/api/auth/reissue
   * @secure
   * @response `200` `ReissueData` OK
   */
  reissue = (params: RequestParams = {}) =>
    this.request<ReissueData, any>({
      path: `/api/auth/reissue`,
      method: 'POST',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags auth-controller
   * @name DeleteRefreshTokenOfUser
   * @summary 로그아웃
   * @request DELETE:/api/auth/users/{userId}/refresh
   * @secure
   * @response `200` `DeleteRefreshTokenOfUserData` OK
   */
  deleteRefreshTokenOfUser = (params: RequestParams = {}) =>
    this.request<DeleteRefreshTokenOfUserData, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      secure: true,
      ...params,
    })
}
