'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegistMenu() {
  const router = useRouter()

  const handleClick = (mall: string) => router.push(`closet/regist/${mall}`)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-2 items-center">
        <button
          type="button"
          onClick={() => handleClick('musinsa')}
          className="w-60 h-10 bg-black text-white rounded-full px-6 py-2 flex items-center justify-center shadow-md"
        >
          <Image
            src="/images/malls/logo_musinsa.png"
            alt="MUSINSA"
            width={0}
            height={0}
            sizes="100%"
            className="w-auto h-3 pe-0.5"
          />
          에서 옷 가져오기
        </button>
        <button
          type="button"
          onClick={() => handleClick('zigzag')}
          className="w-60 h-10 text-black font-semibold rounded-full px-6 py-2 flex items-center justify-center bg-[#FA6EE3] shadow-md"
        >
          <Image
            src="/images/malls/logo_zigzag.png"
            alt="ZIGZAG"
            width={0}
            height={0}
            sizes="100%"
            className="w-auto h-3 pe-0.5"
          />{' '}
          에서 옷 가져오기
        </button>
        <button
          type="button"
          onClick={() => handleClick('ably')}
          className="w-60 h-10 border-2 rounded-full px-6 py-2 flex items-center justify-center shadow-md"
        >
          <Image
            src="/images/malls/logo_ably.png"
            alt="ABLY"
            width={0}
            height={0}
            sizes="100%"
            className="w-auto h-3 pe-0.5"
          />{' '}
          에서 옷 가져오기
        </button>
        <button
          type="button"
          onClick={() => handleClick('')}
          className="w-60 h-10 bg-secondary text-primary-400 rounded-full px-6 py-2 shadow-md"
        >
          직접 옷 등록하기
        </button>
      </div>
    </div>
  )
}
