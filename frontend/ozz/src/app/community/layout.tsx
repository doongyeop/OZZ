import React from 'react'
import Header from '@/components/Header'
import HeaderButton from '@/components/Button/HeaderButton'
import { FaCirclePlus } from 'react-icons/fa6'
import { IoNotifications } from 'react-icons/io5'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header
        title="커뮤니티"
        leftButton={<HeaderButton icon={<FaCirclePlus size={20} />} />}
        rightButton={<HeaderButton icon={<IoNotifications size={20} />} />}
      />
      {children}
    </section>
  )
}
