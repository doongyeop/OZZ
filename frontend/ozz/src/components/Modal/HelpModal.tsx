'use client'

import { useState } from 'react'
import Image from 'next/image'

import { IoMdClose } from 'react-icons/io'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'

interface HelpModalProps {
  onClose: () => void
}

export default function HelpModal({ onClose }: HelpModalProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4

  const helpContent = [
    {
      title: '옷 가져오기',
      text: '옷짱에서는 쉽게 옷을\n 등록할 수 있어요. \n원하는 쇼핑몰을 클릭하세요.',
      image: '/images/help/help1.PNG',
    },
    {
      title: '쇼핑몰 로그인',
      text: '평소 사용하는 쇼핑몰에 로그인을 하고 \n조금만 기다리면 구매내역을 통해 \n옷을 쉽게 가져올 수 있어요.',
      image: '/images/help/help2.PNG',
    },
    {
      title: '직접 옷 등록하기',
      text: '직접 쇼핑몰 이미지를 \n캡쳐하여 등록하면 \n자동으로 속성을 추출해줘요.',
      image: '/images/help/help3.PNG',
    },
    {
      title: '옷 수정 하기',
      text: '혹시 문제가 있다면 \n정보를 수정하거나 \n새로운 사진으로 등록해요.',
      image: '/images/help/help4.PNG',
    },
  ]

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg p-6 max-w-md w-72">
        <div className="flex justify-end items-center">
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className="text-primary-400 hover:text-primary-300"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-center text-primary-400 mb-4">
          {helpContent[currentPage - 1].title}
        </h2>
        <div className="flex flex-col justify-items-center mb-4">
          <p className="my-2 text-primary-400 text-center">
            {helpContent[currentPage - 1].text.split('\n').map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <Image
            src={helpContent[currentPage - 1].image}
            alt={`Help ${currentPage}`}
            className="w-full object-cover"
            width={180}
            height={120}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            aria-label="이전"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="text-primary-400 disabled:text-gray-300"
          >
            <FaLessThan size={12} />
          </button>
          <span className="text-primary-400 px-2">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="다음"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="text-primary-400 disabled:text-gray-300"
          >
            <FaGreaterThan size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
