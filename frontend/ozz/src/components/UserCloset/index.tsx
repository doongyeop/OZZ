import SearchArea, { OrderValue } from '@/containers/closet-page/SearchArea'
import ClothesList from '@/components/ClothesList'
import { ImSpinner8 } from 'react-icons/im'
import { useInfiniteQuery, useQueries } from '@tanstack/react-query'
import { fetchImage, fetchUserClothes } from '@/services/clothingApi'
import { useEffect, useRef, useState } from 'react'
import Loading from '@/app/closet/loading'
import EmptyCloset from '@/containers/closet-page/EmptyCloset/page'

export default function UserCloset({
  categoryHighId,
  categoryLowId,
  isSelectable,
}: {
  categoryHighId: string | number
  categoryLowId: string | number
  isSelectable: boolean
}) {
  const [order, setOrder] = useState<OrderValue>('createdDate')
  const [searchKeyword, setSearchKeyword] = useState('')

  const observerElem = useRef(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['userClothes', categoryHighId, categoryLowId],
    queryFn: ({ pageParam = 0 }) => {
      return fetchUserClothes(
        { page: pageParam, size: 20, sort: [`${order},desc`] },
        {
          categoryHighId,
          categoryLowId,
          keyword: searchKeyword,
        },
      )
    },
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
  })

  const handleSubmit = () => {
    refetch().then()
  }

  useEffect(() => {
    refetch().then()
  }, [order, refetch])

  const clothingList = data?.pages.flatMap((page) => page.content) || []

  useEffect(() => {
    const currentElem = observerElem.current

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          await fetchNextPage()
        }
      },
      { threshold: 1.0 },
    )

    if (currentElem) {
      observer.observe(currentElem)
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem)
      }
    }
  }, [hasNextPage, fetchNextPage])

  const imageQueries = clothingList.map((item) => ({
    queryKey: ['image', item.imageFile?.filePath],
    queryFn: () => fetchImage(item.imageFile?.filePath || ''),
    enabled: !!item.imageFile?.filePath,
    staleTime: 0,
  }))

  const imageResults = useQueries({ queries: imageQueries })

  const defaultImageUrl = '/images/mockup/tops11.png'

  const clothingWithImages = clothingList.map((item, index) => ({
    ...item,
    imageUrl: imageResults[index]?.data || defaultImageUrl,
  }))

  if (isLoading) return <Loading />

  return isError || clothingWithImages.length === 0 ? (
    <EmptyCloset />
  ) : (
    <>
      <SearchArea
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        order={order}
        setOrder={setOrder}
        onSubmit={handleSubmit}
      />
      <ClothesList
        clothingList={clothingWithImages}
        isSelectable={isSelectable}
      />
      <div ref={observerElem}>
        {isFetchingNextPage && (
          <div className="flex justify-center p-4 text-gray-dark">
            <ImSpinner8 className="animate-spin" />
          </div>
        )}
      </div>
    </>
  )
}
