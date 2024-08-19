'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { syncTokensWithCookies } from '@/services/authApi'
import { getUserInfo } from '@/services/userApi'

export default function SignUpDone() {
  const [nickname, setNickname] = useState<string>('')

  useEffect(() => {
    syncTokensWithCookies()
    const fetchUserInfo = async () => {
      try {
        await getUserInfo().then((userInfo) => {
          setNickname(userInfo.nickname)
        })
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }
    fetchUserInfo()
  }, [])

  const router = useRouter()
  const goCloset = () => {
    router.push('/closet')
  }

  return (
    <div className="w-full max-w-xs mx-auto min-h-screen flex flex-col justify-center items-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-10"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
          className="fill-primary-400"
        />
      </svg>
      <div className="text-center mt-4 font-bold text-[#7A7C7E]">
        <span className="text-secondary">{nickname}</span>님 가입을
        축하드립니다!
        <br />
        지금 바로 옷짱을 채워보세요
      </div>
      <button
        type="button"
        onClick={goCloset}
        className="font-extrabold mt-4 px-4 py-2 bg-secondary text-primary-400 rounded-full"
      >
        나의 옷짱 바로 가기
      </button>
    </div>
  )
}
