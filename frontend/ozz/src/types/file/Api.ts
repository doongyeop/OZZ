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
  DeleteData,
  DownloadFileData,
  GetFileData,
  UpdateData,
  UpdatePayload,
  UploadData,
  UploadPayload,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags file-controller
   * @name GetFile
   * @request GET:/api/file/{fileId}
   * @secure
   * @response `200` `GetFileData` OK
   */
  getFile = (fileId: number, params: RequestParams = {}) =>
    this.request<GetFileData, any>({
      path: `/api/file/${fileId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags file-controller
   * @name Update
   * @request PUT:/api/file/{fileId}
   * @secure
   * @response `200` `UpdateData` OK
   */
  update = (fileId: number, data: UpdatePayload, params: RequestParams = {}) =>
    this.request<UpdateData, any>({
      path: `/api/file/${fileId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags file-controller
   * @name Delete
   * @request DELETE:/api/file/{fileId}
   * @secure
   * @response `200` `DeleteData` OK
   */
  delete = (fileId: number, params: RequestParams = {}) =>
    this.request<DeleteData, any>({
      path: `/api/file/${fileId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags file-controller
   * @name Upload
   * @request POST:/api/file
   * @secure
   * @response `200` `UploadData` OK
   */
  upload = (data: UploadPayload, params: RequestParams = {}) =>
    this.request<UploadData, any>({
      path: `/api/file`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags file-controller
   * @name DownloadFile
   * @request GET:/api/file/download/{filePath}
   * @secure
   * @response `200` `DownloadFileData` OK
   */
  downloadFile = (filePath: string, params: RequestParams = {}) =>
    this.request<DownloadFileData, any>({
      path: `/api/file/download/${filePath}`,
      method: 'GET',
      secure: true,
      ...params,
    })
}
