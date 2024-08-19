'use client'

import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import Image from 'next/image'

import Header from '@/components/Header'
import HeaderButton from '@/components/Button/HeaderButton'
import ClosetPageContainer from '@/containers/closet-page'
import { useCategorySidebar } from '@/contexts/CategorySidebarContext'
import HelpModal from '@/components/Modal/HelpModal'

export default function Closet() {
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { toggleSidebar } = useCategorySidebar()

  const leftButton = <HeaderButton icon={<FaBars />} onClick={toggleSidebar} />
  const rightButton = (
    <HeaderButton
      icon={
        <Image
          src="/icons/fitting.svg"
          alt="Fitting Icon"
          width={24}
          height={24}
        />
      }
      href="/fitting"
    />
  )

  useEffect(() => {
    const hasVisitedCloset = localStorage.getItem('hasVisitedCloset')
    if (!hasVisitedCloset) {
      setShowHelpModal(true)
      localStorage.setItem('hasVisitedCloset', 'true')
    }
  }, [])

  const closeHelpModal = () => {
    setShowHelpModal(false)
  }

  return (
    <>
      <Header
        title="나의 옷짱"
        leftButton={leftButton}
        rightButton={rightButton}
      />
      {showHelpModal && <HelpModal onClose={closeHelpModal} />}
      <ClosetPageContainer />
    </>
  )
}
