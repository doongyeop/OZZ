'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import TagButton from '@/components/Button/TagButton'
import { useWeather } from '@/contexts/WeatherContext'
import { useSelectedColor } from '@/contexts/SelectedColorContext'
import { ClothingItem, useSelectedItem } from '@/contexts/SelectedItemContext'
import { Color, Style, styleMap } from '@/types/clothing'
import { ImSpinner8 } from 'react-icons/im'
import OutlineButton from '@/components/Button/OutlineButton'
import { LuBrainCircuit } from 'react-icons/lu'
import CoordiImage from '@/containers/coordi/CoordiImage'

export interface CoordiItem {
  id: number
  imgPath: string
  offset: number
}
export interface Coordination {
  title: string
  items: CoordiItem[]
  style: Style
}

const styleTags = ['전체', ...Object.keys(styleMap)]

const fetchRecommendations = async ({
  selectedWeather,
  selectedTags,
  selectedColors,
  selectedItem,
  token,
}: {
  selectedWeather: any
  selectedTags: string[]
  selectedColors: Color[]
  selectedItem: ClothingItem | null
  token: string
}): Promise<Coordination[]> => {
  const pointColor =
    selectedColors.length > 0
      ? selectedColors.map((color: Color) => color.code)
      : null
  const essential: number[] | null = selectedItem
    ? [selectedItem.clothesId]
    : null
  const style =
    selectedTags[0] !== '전체'
      ? selectedTags.map((tag) => styleMap[tag]).join(',')
      : null

  const requestBody = {
    weather: {
      temperature: Math.round(
        (selectedWeather.minTemp + selectedWeather.maxTemp) / 2,
      ),
      weather: selectedWeather.description,
    },
    pointColor,
    essential,
    style,
  }

  const response = await fetch('https://i11a804.p.ssafy.io/api/ai/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations')
  }

  const data = await response.json()
  // console.log(data)

  return data.map((item: Coordination) => ({
    title: item.title,
    items: item.items,
    style: item.style,
  }))
}

export default function CoordiOfTheDay({ token }: { token: string }) {
  const { selectedWeather } = useWeather()
  const { selectedColor } = useSelectedColor()
  const { selectedItem } = useSelectedItem()
  const [selectedTags, setSelectedTags] = useState<string[]>(['전체'])

  const queryClient = useQueryClient()

  // 캐시된 코디 데이터를 가져오는 useQuery
  const { data: coordinations } = useQuery<Coordination[] | null>({
    queryKey: ['coordiRecommendations'],
    staleTime: Infinity, // 데이터를 오래 유지
    queryFn: () => {
      const cachedData = queryClient.getQueryData<Coordination[]>([
        'coordiRecommendations',
      ])
      return cachedData ?? null
    },
  })

  // 새로운 코디 데이터를 요청하는 useMutation
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () =>
      fetchRecommendations({
        selectedWeather,
        selectedTags,
        selectedColors: selectedColor,
        selectedItem,
        token,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['coordiRecommendations'], data)
    },
  })

  const handleTagClick = (tag: string) => {
    if (tag === '전체') {
      setSelectedTags(['전체'])
    } else {
      setSelectedTags((prevTags) => {
        if (prevTags.includes(tag)) {
          return prevTags.length === 1
            ? ['전체']
            : prevTags.filter((t) => t !== tag)
        }
        // tag가 선택되지 않은 경우
        // '전체'가 선택된 경우에는 '전체'를 제외하고 tag를 추가
        return [...prevTags.filter((t) => t !== '전체'), tag]
      })
    }
  }

  const today = format(new Date(), 'M월 d일', { locale: ko })

  return (
    <div className="m-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          {selectedWeather
            ? format(selectedWeather.date, 'M월 d일', { locale: ko })
            : today}{' '}
          <span className="bg-secondary text-primary-400 px-0.5">
            #추천_코디
          </span>
        </h1>

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex gap-1 items-center bg-gray-light hover:bg-gray-medium border border-gray-dark rounded-lg px-3"
            >
              스타일 태그
              <IoIosArrowDown />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="bg-gray-light w-60">
            <div className="flex flex-wrap gap-2">
              {styleTags.map((tag) => (
                <TagButton
                  key={tag}
                  isSelected={selectedTags.includes(tag)}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </TagButton>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mb-3">
        <div className="my-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <TagButton key={tag} isSelected onClick={() => handleTagClick(tag)}>
              #{tag}
            </TagButton>
          ))}
        </div>
      </div>

      <OutlineButton onClick={() => mutate()}>
        <LuBrainCircuit className="text-primary-400" />
        <span className="ms-1">AI 코디 추천 받기</span>
      </OutlineButton>

      {/* eslint-disable-next-line no-nested-ternary */}
      {isPending ? (
        <div className="mt-16 flex flex-col items-center">
          <ImSpinner8 size="70" className="animate-spin text-gray-dark" />
          <div className="text-center font-semibold my-4">
            추천 코디 생성 중...
          </div>
        </div>
      ) : isError || (coordinations && coordinations.length === 0) ? (
        <div className="mt-10 flex flex-col items-center">
          <RxCross2 size="90" className="text-gray-dark" />
          <div className="text-center font-semibold">
            <p>AI 코디 추천을 위해서는</p>
            <p>옷장에 더 많은 옷이 필요해요 ㅜ.ㅜ</p>
          </div>
          <Link
            href="/closet"
            className="bg-secondary text-primary-400 rounded-full font-bold mt-8 px-10 py-2"
          >
            내 옷장 바로가기
          </Link>
        </div>
      ) : (
        coordinations &&
        coordinations.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {coordinations.map((coordination, index) => {
              const href = `coordi/${index}`

              return (
                <Link key={coordination.title} href={href}>
                  <div className="aspect-[9/16] shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
                    <CoordiImage coordi={coordination} />
                  </div>
                </Link>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
