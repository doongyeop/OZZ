'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import cn from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type PurchaseDateModalProps = {
  onClose: () => void
  setValue: (value: string) => void
}

export default function PurchaseDateModal({
  onClose,
  setValue,
}: PurchaseDateModalProps) {
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>()

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setPurchaseDate(date)
      setValue(format(date, 'yyyy-MM-dd')) // 날짜를 문자열로 변환하여 전달
    }
    onClose()
  }

  return (
    <Modal title="구매일자" onClose={onClose}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal ',
              // !purchaseDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {purchaseDate ? (
              format(purchaseDate, 'PPP')
            ) : (
              <span className="text-primary-400 ">구매일자 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-secondary border-2 border-primary-400">
          <Calendar
            mode="single"
            selected={purchaseDate}
            onSelect={handleDateSelect}
            className=""
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </Modal>
  )
}
