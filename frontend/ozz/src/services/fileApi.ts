import { getFileApi } from './authApi'
import {
  DeleteData,
  GetFileData,
  UpdateData,
  UpdatePayload,
  UploadData,
  UploadPayload,
} from '../types/file/data-contracts'

// 파일 정보 가져오기
export const getFile = async (fileId: number): Promise<GetFileData> => {
  const fileApi = getFileApi()
  if (!fileApi) throw new Error('File API not initialized')
  const response = fileApi.getFile(fileId)
  const data = (await response).json()
  return data
}

// 파일 업데이트
export const updateFile = async (
  fileId: number,
  data: UpdatePayload,
): Promise<UpdateData> => {
  const fileApi = getFileApi()
  if (!fileApi) throw new Error('File API not initialized')
  return fileApi.update(fileId, data)
}

// 파일 삭제
export const deleteFile = async (fileId: number): Promise<DeleteData> => {
  const fileApi = getFileApi()
  if (!fileApi) throw new Error('File API not initialized')
  return fileApi.delete(fileId)
}

// 파일 업로드
export const uploadFile = async (data: UploadPayload): Promise<UploadData> => {
  const fileApi = getFileApi()
  if (!fileApi) throw new Error('File API not initialized')
  return fileApi.upload(data)
}

// 파일 다운로드
export const downloadFile = async (
  filePath: string,
): Promise<File | undefined> => {
  const fileApi = getFileApi()
  if (!fileApi) throw new Error('File API not initialized')
  try {
    const response = await fileApi.downloadFile(filePath)
    // console.log('downloadFile실행중 response:', response)
    const blob = await response.blob()
    // console.log('downloadFile실행중 blob: ', blob)
    const fileName = filePath.split('/').pop() || 'downloaded_file'
    return new File([blob], fileName)
  } catch (error) {
    console.log('downloadFile 중 에러발생', error)
    return undefined
  }
}
