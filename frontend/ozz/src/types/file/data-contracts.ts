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

export type GetFileData = {
  fileId: number
  fileName: string
  filePath: string
  fileType: string
}

export interface UpdatePayload {
  /** @format binary */
  file: File
}

export type UpdateData = object

export type DeleteData = object

export interface UploadPayload {
  /** @format binary */
  file: File
}

export type UploadData = object

/** @format binary */
export type DownloadFileData = File
