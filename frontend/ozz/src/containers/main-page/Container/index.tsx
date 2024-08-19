'use client'

import HeroSection from '@/containers/main-page/HeroSection'
import Preview from '@/containers/main-page/Preview'
import { useQuery } from '@tanstack/react-query'
import { fetchUserClothes } from '@/services/clothingApi'
import { useEffect, useState } from 'react'
import { getFavoritesGroupListOfUsers } from '@/services/favoriteApi'
import { downloadFile } from '@/services/fileApi'

const queryKeys = {
  userClothes: ['userClothes'],
  image: (filePath: string) => ['image', filePath],
}

export default function MainPageContainer() {
  const [closetItems, setClosetItems] = useState<
    { id: number; image: string }[]
  >([])
  const [bookItems, setBookItems] = useState<{ id: number; image: string }[]>(
    [],
  )

  // 옷 목록을 가져오는 React Query 설정
  const { data: clothesData } = useQuery({
    queryKey: queryKeys.userClothes,
    queryFn: () =>
      fetchUserClothes({ page: 0, size: 4, sort: ['createdDate,desc'] }, {}),
  })

  // 이미지 다운로드 함수
  const getImage = async (path: string | undefined): Promise<string> => {
    if (!path) return '/placeholder.png'
    try {
      const file = await downloadFile(path)
      return file ? URL.createObjectURL(file) : '/placeholder.png'
    } catch (error) {
      console.error('이미지 다운로드 실패:', error)
      return '/placeholder.png'
    }
  }

  // useEffect에서 이미지 쿼리 생성 및 실행
  useEffect(() => {
    const fetchImages = async () => {
      if (clothesData && clothesData.content) {
        const imageResults = await Promise.all(
          clothesData.content.map(async (item) => ({
            id: item.clothesId,
            image: await getImage(item.imageFile?.filePath),
          })),
        )
        setClosetItems(imageResults)
      }
    }

    const fetchBookImages = async () => {
      try {
        const books = await getFavoritesGroupListOfUsers()
        if (books && Array.isArray(books)) {
          const bookResults = await Promise.all(
            books.map(async (book) => ({
              id: book.favoriteGroupId,
              image: await getImage(book.imageFileList[0]?.filePath), // 첫 번째 이미지 파일을 가져옴
            })),
          )
          setBookItems(bookResults)
        }
      } catch (error) {
        console.error('코디북 불러오기 실패:', error)
      }
    }

    fetchImages()
    fetchBookImages()
  }, [clothesData])

  return (
    <>
      <HeroSection />
      <Preview title="옷장" items={closetItems} />
      <Preview title="코디북" items={bookItems} />
    </>
  )
}
