'use client'

import { useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import CoordibookSidebar from '@/components/Sidebar/CoordibookSidebar'

type BookmarkButtonProps = {
  isBookmarked: boolean
  boardId: number
  userId: number
  onBookmarkToggle: () => void
}

export default function BookmarkButton({
  isBookmarked,
  boardId,
  userId,
  onBookmarkToggle,
}: BookmarkButtonProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleBookmarkClick = () => {
    setIsSidebarOpen(true)
  }

  return (
    <>
      {isBookmarked ? (
        <FaBookmark
          size={20}
          onClick={handleBookmarkClick}
          className="cursor-pointer"
        />
      ) : (
        <FaRegBookmark
          size={20}
          onClick={handleBookmarkClick}
          className="cursor-pointer"
        />
      )}
      {isSidebarOpen && (
        <CoordibookSidebar
          boardId={boardId}
          userId={userId}
          onClose={() => setIsSidebarOpen(false)}
          onBookmarkToggle={onBookmarkToggle}
        />
      )}
    </>
  )
}
