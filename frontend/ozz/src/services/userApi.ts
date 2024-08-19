// services/userApi.ts

import {
  UserUpdateRequest,
  UploadProfileImagePayload,
} from '@/types/user/data-contracts'
import { getUserApi, removeTokens } from './authApi'

export const getUserInfo = async () => {
  const userApi = getUserApi()
  if (!userApi) throw new Error('User API not initialized')
  const response = await userApi.getUserInfo()
  const userInfo = await response.json()
  return userInfo
}

export const updateUser = async (data: UserUpdateRequest) => {
  const userApi = getUserApi()
  // console.log(
  //   'User API updateUser 호출 시 사용된 토큰:',
  //   getTokens()?.accessToken,
  // )

  if (!userApi) throw new Error('User API not initialized')
  const response = await userApi.updateUser(data)
  // console.log('response: ', response)
  const userInfo = await response.json()
  // console.log('userInfo: ', userInfo)
  return userInfo
}

export const deleteUser = async () => {
  const userApi = getUserApi()
  if (!userApi) throw new Error('User API not initialized')
  const response = await userApi.deleteUser()
  removeTokens() // Logout after deleting the user
  return response.data
}

export const uploadProfileImage = async (file: File) => {
  const userApi = getUserApi()
  if (!userApi) throw new Error('User API not initialized')

  const payload: UploadProfileImagePayload = { file }
  // console.log('사진 올리기 요청 payload:', payload)

  const response = await userApi.uploadProfileImage(payload)
  // console.log('사진 업로드 응답 코드:', response.status)
  // console.log('사진 업로드 응답 메시지:', response.statusText)

  if (response.status === 403) {
    console.log('403 Forbidden 오류 발생: 인증 또는 권한 문제일 수 있습니다.')
  }

  const data = await response.json()
  // console.log('사진 올리기 응답 데이터:', data)

  return data
}

export const checkNickname = async (nickname: string) => {
  const userApi = getUserApi()
  if (!userApi) throw new Error('User API not initialized')
  const response = await userApi.checkNickname({ nickname })
  return response.text()
}

export const deleteProfileImage = async () => {
  const userApi = getUserApi()
  if (!userApi) throw new Error('User API not initialized')

  // console.log('이미지 삭제 요청을 보냅니다...')
  const response = await userApi.deleteProfileImage()
  // console.log('이미지 삭제 응답 코드:', response.status)
  // console.log('이미지 삭제 응답 메시지:', response.statusText)

  if (response.status === 403) {
    console.log('403 Forbidden 오류 발생: 인증 또는 권한 문제일 수 있습니다.')
  }

  return response.status
}
