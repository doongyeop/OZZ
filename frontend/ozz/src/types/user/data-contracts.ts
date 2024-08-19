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

/** 유저 정보 수정 요청 DTO */
export interface UserUpdateRequest {
  /** @format date-time */
  birth?: string
  nickname?: string
}

export type GetUserInfoData = object

export type UpdateUserData = object

export type DeleteUserData = object

export interface UploadProfileImagePayload {
  /** @format binary */
  file: File
}

export type UploadProfileImageData = object

export type CheckNicknameData = object
