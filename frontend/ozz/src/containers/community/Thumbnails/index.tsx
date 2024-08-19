'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'
import { IoHeart } from 'react-icons/io5'

interface Item {
  image: string
  likes?: number
  style?: string
  age?: string
}

interface CoordinationProps {
  type: 'hot' | 'style' | 'age'
  items: Item[]
}

export default function Thumbnails({ type, items }: CoordinationProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToStart = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  const scrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'hot':
        return (
          <>
            지금{' '}
            <span className="bg-secondary text-primary-400 px-0.5">핫</span>한
            코디
          </>
        )
      case 'style':
        return (
          <>
            <span className="bg-secondary text-primary-400 px-0.5">스타일</span>
            별 코디
          </>
        )
      case 'age':
        return (
          <>
            <span className="bg-secondary text-primary-400 px-0.5">연령대</span>
            별 코디
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="mb-6">
      <div>
        <h1 className="ms-4 text-2xl font-bold">{getTitle()}</h1>
      </div>
      <div className="relative mt-2 h-44">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="p-2 bg-gray-300 bg-opacity-50 hover:bg-opacity-75 rounded-full shadow transition-transform transform hover:scale-125"
            onClick={scrollToStart}
          >
            <FaAnglesLeft />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="p-2 bg-gray-300 bg-opacity-50 hover:bg-opacity-75 rounded-full shadow transition-transform transform hover:scale-125"
            onClick={scrollToEnd}
          >
            <FaAnglesRight />
          </button>
        </div>
        <div ref={scrollRef} className="flex h-full overflow-x-auto space-x-1">
          {items.map((item, index) => (
            <div
              key={item.image}
              className="relative flex-none aspect-[9/16] shadow-lg"
            >
              <Image src={item.image} alt={`${type}-${index}`} fill />
              <div className="absolute bottom-0 left-0 right-0">
                <div
                  className={`bg-secondary/70 text-primary-400 py-1 text-sm rounded-b flex justify-center ${
                    type === 'hot' && 'items-center gap-1'
                  }`}
                >
                  {type === 'hot' && (
                    <>
                      <IoHeart className="text-red-500" />
                      <span className="text-white">{item.likes}</span>
                    </>
                  )}
                  {type === 'style' && <span>#{item.style}</span>}
                  {type === 'age' && <span>#{item.age}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
