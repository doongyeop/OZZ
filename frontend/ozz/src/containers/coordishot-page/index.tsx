'use client'

import { useEffect, useState } from 'react'
import { CoordishotDetail } from '@/types/coordishot'
import CoordiTag from '@/components/CoordiTag'
// import CoordiContents from '@/containers/coordishot-page/CoordiContents'
import CoordishotCard from '@/components/Card/CoordishotCard'

const mockData: CoordishotDetail = {
  boardId: 1,
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryds standard dummy text ever since the 1500s, when an unknown printer took a galley of type a',
  createdDate: '2024-07-17T08:30:00',
  imageFile: {
    fileId: 1,
    filePath: '/images/coordishot/coordi.png',
    fileName: 'coordi.png',
    fileType: 'png',
  },
  user: {
    usersId: 1,
    nickname: 'OZZ',
    profileFileId: {
      fileId: 2,
      filePath: '/images/coordishot/profile.png',
      fileName: 'profile.png',
      fileType: 'png',
    },
  },
  like: {
    total: 120,
    isLike: false,
  },
  isBookmark: false,
  tags: [
    {
      clothesTagId: 1,
      clothes: {
        imageFile: {
          fileId: 1,
          filePath: '/images/coordishot/image1.png',
          fileName: 'image1.png',
          fileType: 'png',
        },
        categoryLow: {
          categoryLowId: 1,
          name: '셔츠',
        },
        name: 'Basic White T-shirt',
      },
      x_position: 1,
      y_position: 1,
    },
    {
      clothesTagId: 2,
      clothes: {
        imageFile: {
          fileId: 2,
          filePath: '/images/coordishot/image2.png',
          fileName: 'image2.png',
          fileType: 'png',
        },
        categoryLow: {
          categoryLowId: 1,
          name: '셔츠',
        },
        name: 'Basic Blue T-shirt',
      },
      x_position: 2,
      y_position: 1.5,
    },
    {
      clothesTagId: 3,
      clothes: {
        imageFile: {
          fileId: 3,
          filePath: '/images/coordishot/image3.png',
          fileName: 'image3.png',
          fileType: 'png',
        },
        categoryLow: {
          categoryLowId: 1,
          name: '셔츠',
        },
        name: 'Basic Gray T-shirt',
      },
      x_position: 1,
      y_position: 2,
    },
  ],
  style: ['스트릿', '캐주얼'],
  age: 20,
}

// 컨테이너가 필요할까? 라는 리팩토링적 의문
export default function CoordiShotContainer() {
  const [coordishot, setCoordishot] = useState<CoordishotDetail | null>(null)

  useEffect(() => {
    // if (id) {
    //   const foundCoordishot = mockData.find((data) => data.boardId === Number(id))
    setCoordishot(mockData)
    // }
    //   }, [id])
  })

  if (!coordishot) {
    return <p>Loading...</p>
  }

  return (
    <div className="">
      {/* 스타일 태그 */}
      <CoordiTag styles={coordishot.style} age={coordishot.age} />
      {/* 게시글 내용 */}
      <CoordishotCard coordishot={coordishot} />
    </div>
  )
}
