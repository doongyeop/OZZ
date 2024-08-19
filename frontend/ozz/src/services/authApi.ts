'use client'

/* eslint-disable @typescript-eslint/no-use-before-define */

import { QueryClient } from '@tanstack/react-query'
import { Api as AuthApi } from '@/types/auth/Api'
import { Api as UserApi } from '@/types/user/Api'
import { Api as FavoriteApi } from '@/types/favorite/Api'
import { Api as ClothesApi } from '@/types/clothes/Api'
import { Api as FileApi } from '@/types/file/Api'
import cookie from 'cookie'

const API_URL = 'http://i11a804.p.ssafy.io:8080'

export interface Tokens {
  accessToken: string
  refreshToken: string
}
export const queryClient = new QueryClient()

let authApi: AuthApi<Tokens> | null = null
let userApi: UserApi<Tokens> | null = null
let favoriteApi: FavoriteApi<Tokens> | null = null
let clothesApi: ClothesApi<Tokens> | null = null
let fileApi: FileApi<Tokens> | null = null

export const getTokens = (): Tokens | undefined => {
  return queryClient.getQueryData<Tokens>(['tokens'])
}

export const setTokens = (newTokens: Tokens) => {
  queryClient.setQueryData(['tokens'], newTokens)
  initializeApiClients(newTokens)
}

export const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.exp < Date.now() / 1000
}

export const reissueToken = async () => {
  if (!authApi) throw new Error('API not initialized')
  try {
    const response = await authApi.reissue()
    const newTokens = response.data as Tokens
    setTokens(newTokens)
    return newTokens
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error('Refresh token expired')
      removeTokens()
      redirectToLogin()
      return null
    }
    throw error
  }
}

export const redirectToLogin = () => {
  window.location.href = '/login'
}

export const validateAndRefreshToken = async () => {
  const tokens = getTokens()
  // console.log('validateAndRefreshToken - tokens:', tokens) // 로그 추가
  // console.log('validateAndRefreshToken - tokens:', tokens?.accessToken) // 로그 추가

  if (!tokens) throw new Error('No tokens available')

  if (isTokenExpired(tokens.accessToken)) {
    // console.log('Access token expired, attempting to reissue') // 로그 추가
    try {
      const newTokens = await reissueToken()
      if (newTokens) {
        // console.log('Tokens successfully reissued:', newTokens) // 로그 추가
        setTokens(newTokens)
      } else {
        throw new Error('Failed to reissue tokens')
      }
    } catch (error: any) {
      // console.error('Error during token reissue:', error) // 로그 추가
      if (error.response?.status === 404) {
        console.error('Refresh token expired')
        removeTokens()
        redirectToLogin()
      } else {
        throw error
      }
    }
  }
}

export const initializeApiClients = (tokens: Tokens) => {
  // console.log('Initializing API Clients with tokens:', tokens)
  authApi = new AuthApi<Tokens>({
    securityWorker: async () => {
      await validateAndRefreshToken() // 토큰을 검증하고 갱신합니다.]
      return {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    },
  })

  userApi = new UserApi({
    securityWorker: async () => {
      await validateAndRefreshToken()
      // console.log('User API Token:', tokens?.accessToken) // userApi 토큰 확인
      return {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    },
  })

  favoriteApi = new FavoriteApi({
    securityWorker: async () => {
      await validateAndRefreshToken()
      return {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    },
  })

  clothesApi = new ClothesApi({
    securityWorker: async () => {
      await validateAndRefreshToken()
      return {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    },
  })

  fileApi = new FileApi({
    securityWorker: async () => {
      await validateAndRefreshToken()
      return {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    },
  })
}

// 쿠키와 react-query 상태를 동기화하는 함수
export const syncTokensWithCookies = async () => {
  const cookieString = document.cookie
  const cookies = cookie.parse(cookieString)
  // console.log('쿠키에서 가져온 토큰들:', cookies)

  const accessToken = cookies.access || ''
  const refreshToken = cookies.refresh || ''

  if (accessToken && refreshToken) {
    const tokens: Tokens = { accessToken, refreshToken }
    // console.log('쿠키에서 동기화된 토큰들:', tokens)
    setTokens(tokens)
  } else {
    console.log('토큰이 존재하지 않습니다.')
  }
}

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`
}

export const removeTokens = () => {
  removeCookie('access')
  removeCookie('refresh')
  queryClient.removeQueries({ queryKey: ['tokens'] })
  authApi = null
  userApi = null
  favoriteApi = null
  clothesApi = null
  fileApi = null
}

export const login = async (provider: 'kakao' | 'naver') => {
  window.location.href = `${API_URL}/oauth2/authorization/${provider}`
}

export const logout = async () => {
  if (!authApi) throw new Error('API not initialized')
  const response = await authApi.deleteRefreshTokenOfUser()
  await response.text()
  // console.log('로그아웃api에 대한 응답', data)
  removeTokens()
}

export const getAuthApi = (): AuthApi<Tokens> => {
  syncTokensWithCookies()
  validateAndRefreshToken()
  if (!authApi) throw new Error('Auth API not initialized')
  return authApi
}

export const getUserApi = (): UserApi<Tokens> => {
  syncTokensWithCookies()
  validateAndRefreshToken()
  if (!userApi) throw new Error('User API not initialized')
  return userApi
}

export const getFavoriteApi = (): FavoriteApi<Tokens> => {
  syncTokensWithCookies()
  validateAndRefreshToken()
  if (!favoriteApi) throw new Error('Favorite API 너 문제있어? 어 있어 ㅠㅠ')
  return favoriteApi
}

export const getClothesApi = (): ClothesApi<Tokens> => {
  syncTokensWithCookies()
  validateAndRefreshToken()
  if (!clothesApi) throw new Error('Clothes API not initialized')
  return clothesApi
}

export const getFileApi = (): FileApi<Tokens> => {
  syncTokensWithCookies()
  validateAndRefreshToken()
  if (!fileApi) throw new Error('File API not initialized')
  return fileApi
}
