'use client'

import Image from 'next/image'
import { login } from '@/services/authApi'

export default function SignIn() {
  const onKaKaoLogin = () => login('kakao')
  const onNaverLogin = () => login('naver')

  return (
    <div className="flex font-bold flex-col items-center justify-center mt-32 max-w-xs mx-auto">
      <Image
        src="/images/logo_3e3e3e.png"
        alt="OZZ LOGO"
        width={160} // 예시로 너비와 높이를 설정
        height={190}
        className="mb-8"
      />
      <h2 className="text-xl w-full text-left my-10">간편 로그인</h2>
      <div className="flex flex-col items-center space-y-2 w-full">
        <button
          type="button"
          onClick={onKaKaoLogin}
          className="w-full h-10 flex items-center bg-[#FEE500] mx-3 rounded-md"
        >
          <Image
            src="/images/kakao_logo.png"
            alt="카카오 로그인"
            width={40} // 너비와 높이를 적절히 설정
            height={40}
            className="h-full object-contain"
          />
          <span className="flex-grow text-center text-black">
            카카오 로그인
          </span>
        </button>
        <button
          type="button"
          onClick={onNaverLogin}
          id="naverIdLogin"
          className="w-full h-10 flex items-center bg-[#03C75A] mx-3 rounded-md"
        >
          <Image
            src="/images/btnG_아이콘사각.png"
            alt="네이버 로그인"
            width={40} // 너비와 높이를 적절히 설정
            height={40}
            className="h-full object-contain"
          />
          <span className="flex-grow text-center text-white">
            네이버 로그인
          </span>
        </button>
      </div>
    </div>
  )
}
