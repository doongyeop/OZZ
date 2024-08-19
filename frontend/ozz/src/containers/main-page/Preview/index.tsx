import Link from 'next/link'
import { FaCirclePlus } from 'react-icons/fa6'
import Image from 'next/image'
import { getUserInfo } from '@/services/userApi'
import { useEffect, useState } from 'react'

interface PreviewProps {
  title: '옷장' | '코디북'
  items: { id: number; image: string }[]
}

export default function Preview({ title, items }: PreviewProps) {
  const content = {
    옷장: {
      link: '/closet',
      itemName: '옷',
    },
    코디북: {
      link: '/book',
      itemName: '코디',
    },
  }

  const [nickname, setNickname] = useState<string | null>(null)

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const userInfo = await getUserInfo()
        setNickname(userInfo.nickname)
      } catch (error) {
        console.error('Failed to fetch user nickname:', error)
      }
    }

    fetchNickname().then()
  }, [])

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mx-4 my-2">
        <h2 className="text-2xl font-bold">
          <span className="bg-secondary text-primary-400 px-0.5">
            {nickname}
          </span>
          {` 님의 ${title}`}
        </h2>
        <Link href={content[title].link} prefetch className="hover:underline">
          전체보기 &gt;
        </Link>
      </div>
      {items.length > 0 ? (
        <div className="mx-3 h-32 flex justify-around">
          {items.map((item, index) => (
            <Link href={`/closet/modify/${item.id}`} key={item.image}>
              <Image
                src={item.image}
                alt={`${content[title]}-${index}`}
                width={0}
                height={0}
                sizes="100%"
                className="aspect-square object-cover w-auto h-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mx-3 h-32 bg-primary-50 flex flex-col justify-center items-center">
          <Link
            href={content[title].link}
            className="flex flex-col items-center"
          >
            <p>{content[title].itemName} 등록하기</p>
            <FaCirclePlus />
          </Link>
        </div>
      )}
    </div>
  )
}
