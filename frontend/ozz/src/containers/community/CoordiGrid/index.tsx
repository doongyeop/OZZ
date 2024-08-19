'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import Image from 'next/image'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type OrderValue = 'regist' | 'popularity'

export default function CoordiGrid() {
  const [order, setOrder] = useState<OrderValue>('regist')

  const items = [
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/36996/detail_36996_66a197b67daad_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/37026/detail_37026_66a2ee8c7c5fa_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/36996/detail_36996_66a197b67daad_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/37026/detail_37026_66a2ee8c7c5fa_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
    {
      image:
        'https://image.msscdn.net/thumbnails/images/codimap/detail/36996/detail_36996_66a197b67daad_500.jpg?w=1000',
      title: '싸피 출근룩',
    },
  ] // 임시 데이터

  return (
    <>
      <div className="flex justify-end p-1">
        <Select
          value={order}
          onValueChange={(value: OrderValue) => setOrder(value)}
        >
          <SelectTrigger className="w-20 border-0">
            <SelectValue placeholder="등록순" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regist">등록순</SelectItem>
            <SelectItem value="popularity">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-1 px-4">
        {items.map((item, index) => (
          <div key={item.image} className="relative flex-none aspect-[9/16]">
            <Image
              src={item.image}
              alt={`item-${index}`}
              fill
              className="absolute h-full w-full object-cover"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center text-sm p-1 bg-white/50">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <Pagination className="p-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
