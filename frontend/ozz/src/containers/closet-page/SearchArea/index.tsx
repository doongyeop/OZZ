import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

export type OrderValue = 'createdDate' | 'purchaseDate'

interface SearchAreaProps {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  order: OrderValue
  setOrder: (order: OrderValue) => void
  onSubmit: () => void
}

export default function SearchArea({
  searchKeyword,
  setSearchKeyword,
  order,
  setOrder,
  onSubmit,
}: SearchAreaProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="p-4 flex justify-between bg-white sticky top-20 shadow-sm">
      <form
        className="ps-4 flex items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearch size="20" className="text-secondary" />
          </div>
          <Input
            className="pl-10 border-secondary"
            type="search"
            placeholder="키워드를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </form>
      <div>
        <Select
          value={order}
          onValueChange={(value: OrderValue) => setOrder(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="등록순" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="createdDate">등록순</SelectItem>
              <SelectItem value="purchaseDate">구매일자순</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
