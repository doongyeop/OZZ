import { CgClose } from 'react-icons/cg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EmptyCloset() {
  return (
    <div className="flex flex-col items-center justify-center h-screen-minus-36">
      <CgClose size={80} className="text-gray-dark" />
      <p className="text-gray-dar mt-2">아직 옷짱에 옷이 없어요 ㅜ.ㅜ</p>
      <Link href="/closet/regist">
        <Button className="w-44 h-10 bg-secondary text-primary-400 rounded-full px-6 py-2 mt-6">
          옷 등록하기
        </Button>
      </Link>
    </div>
  )
}
