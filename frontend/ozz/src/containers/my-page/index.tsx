'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getUserInfo } from '@/services/userApi'
import { getFile, downloadFile } from '@/services/fileApi'
import { syncTokensWithCookies } from '@/services/authApi'
import Image from 'next/image'
import Modal from '@/components/Modal'
import { FaUser } from 'react-icons/fa6'
import { HiPhotograph, HiBell } from 'react-icons/hi'
import { IoIosSettings } from 'react-icons/io'
import { FaChevronRight } from 'react-icons/fa'
import LoadingPage from '@/components/Loading/loading'

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';')
  cookies.forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim()
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}

export default function MyPageIndex() {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profileSrc, setProfileSrc] = useState('')
  const [loading, setLoading] = useState(true)

  const getProfilePic = async (picId: number) => {
    try {
      const fileData = await getFile(picId)
      // console.log('getFile 성공', fileData)
      const picture = await downloadFile(fileData.filePath)
      // console.log('downloadFile 성공', picture)
      if (picture !== undefined) {
        const pictureUrl = URL.createObjectURL(picture)
        setProfileSrc(pictureUrl)
      }
    } catch (error) {
      console.log('프로필사진 가져오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    setLoading(true)
    syncTokensWithCookies()
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo()
        setUser(userInfo)
        if (userInfo.profileFileId) {
          await getProfilePic(userInfo.profileFileId)
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch user info:', error)
        setLoading(false)
      }
    }
    fetchUserInfo()
  }, [])

  const goEdit = () => {
    router.push('/mypage/edit')
  }
  const goSetting = () => {
    router.push('/mypage/settings')
  }

  const goCoordiShot = () => {
    router.push('/coordishot')
  }

  const logOut = async () => {
    try {
      deleteAllCookies()
      // await logout()
      router.push('/login')
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
    }
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {loading ? (
        <LoadingPage
          messages={['유저 정보를', '로딩 중입니다']}
          footerMessage="조금만 기다려주세요"
        />
      ) : (
        <div>
          <div className="flex items-center p-6 rounded-lg w-full max-w-sm">
            {profileSrc ? (
              <Image
                src={profileSrc}
                alt="프로필 사진"
                className="rounded-full w-16 h-16 object-cover"
                width={64} // w-16에 해당하는 픽셀 값
                height={64} // h-16에 해당하는 픽셀 값
                style={{ aspectRatio: '1 / 1' }}
                priority // 페이지 로딩 시 우선적으로 로드할 경우
              />
            ) : (
              <FaUser className="fill-gray-300 w-16 h-16 rounded-full" />
            )}
            <div className="ml-4 flex-1">
              <div
                className={`bg-secondary text-primary-400 font-bold ${user.nickname.length > 12 ? 'text-base' : 'text-xl'} inline-block`}
              >
                {user.nickname}
              </div>
              <span className="font-bold text-xl">님</span>
              <div className="text-secondary text-sm">{user.email}</div>
            </div>
            <FaChevronRight onClick={goEdit} className="w-7 fill-[#CCCED0]" />
          </div>
          <div className="flex mt-4 mb-6 border border-primary-400 w-full max-w-96 rounded-lg h-24 font-medium text-sm">
            <button
              type="button"
              onClick={goCoordiShot}
              className="flex-1 py-2 flex flex-col items-center justify-center h-24 "
            >
              <HiPhotograph className="fill-primary-400 w-5 h-5" />
              코디샷
            </button>
            <span className="w-px bg-primary-400 my-8" />
            <button
              type="button"
              className="flex-1 py-2 flex flex-col items-center justify-center"
            >
              <HiBell className="fill-primary-400 w-5 h-5" />
              알림
            </button>
            <span className="w-px bg-primary-400 my-8" />
            <button
              type="button"
              onClick={goSetting}
              className="flex-1 py-2 flex flex-col items-center justify-center"
            >
              <IoIosSettings className="fill-primary-400 w-5 h-5" />
              설정
            </button>
          </div>
          <div className="flex flex-col mt-4 space-y-2 w-full max-w-sm text-sm font-medium">
            <h3 className="font-bold text-base py-2">더보기</h3>
            <button type="button" className="py-2 text-left">
              서비스 소개
            </button>
            <button type="button" className="py-2 text-left">
              약관 및 정책
            </button>
            <button type="button" className="py-2 text-left">
              오픈소스 라이브러리
            </button>
            <button
              type="button"
              className="py-2 text-left"
              onClick={() => setModal(true)}
            >
              로그아웃
            </button>
            {modal && (
              <Modal onClose={() => setModal(false)}>
                <p className="font-bold text-base text-center text-primary-400">
                  로그아웃 하시겠습니까?
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="font-bold mr-4 p-1 w-14 border border-primary-400 rounded-full text-xs text-primary-400 hover:bg-primary-400 hover:text-secondary"
                  >
                    아니오
                  </button>
                  <button
                    type="button"
                    onClick={() => logOut()}
                    className="font-bold w-14 p-1 border border-primary-400 rounded-full text-xs text-primary-400 hover:bg-primary-400 hover:text-secondary"
                  >
                    예
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
