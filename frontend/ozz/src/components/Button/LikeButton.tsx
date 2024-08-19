'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type LikeButtonProps = {
  boardId: number
  userId: number
  isLiked: boolean
  totalLikes: number
  onLikeChange: (isLiked: boolean, totalLikes: number) => void
}

export default function LikeButton({
  boardId,
  userId,
  isLiked: initialIsLiked,
  totalLikes: initialTotalLikes,
  onLikeChange,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [totalLikes, setTotalLikes] = useState(initialTotalLikes)

  const handleLikeToggle = async () => {
    // TODO: 좋아요 토글 API 요청
    // try {
    //   const response = await axios.post('/api/boardlikes', {
    //     boardId,
    //     userId,
    //   })
    //   if (response.status === 200) {
    //     const newIsLiked = !isLiked
    //     const newTotalLikes = newIsLiked ? totalLikes + 1 : totalLikes - 1
    //     setIsLiked(newIsLiked)
    //     setTotalLikes(newTotalLikes)
    //     onLikeChange(newIsLiked, newTotalLikes)
    //   }
    // } catch (error) {
    //   console.error('Failed to toggle like:', error)
    // }

    setIsLiked(!isLiked)
    setTotalLikes(totalLikes)
    // onLikeChange(newIsLiked, newTotalLikes)
  }

  return (
    <div className="flex items-center mb-2">
      {isLiked ? (
        <FaHeart
          className="text-[#FF505B] mr-1 cursor-pointer"
          size={20}
          onClick={handleLikeToggle}
        />
      ) : (
        <FaRegHeart
          className="text-[#FF505B] mr-1 cursor-pointer"
          size={20}
          onClick={handleLikeToggle}
        />
      )}
      {totalLikes}
    </div>
  )
}
