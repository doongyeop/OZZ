import * as React from 'react'
import { format } from 'date-fns'
import cn from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HiPencil } from 'react-icons/hi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface DatePickerProps {
  defaultValue?: string
  buttonClassName?: string
  onDateChange: (date: Date) => void
}

const months = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 1 },
  { name: 'Mar', value: 2 },
  { name: 'Apr', value: 3 },
  { name: 'May', value: 4 },
  { name: 'Jun', value: 5 },
  { name: 'Jul', value: 6 },
  { name: 'Aug', value: 7 },
  { name: 'Sep', value: 8 },
  { name: 'Oct', value: 9 },
  { name: 'Nov', value: 10 },
  { name: 'Dec', value: 11 },
]

const daysOfWeek = [
  { day: 'S', id: 1 },
  { day: 'M', id: 2 },
  { day: 'T', id: 3 },
  { day: 'W', id: 4 },
  { day: 'T', id: 5 },
  { day: 'F', id: 6 },
  { day: 'S', id: 7 },
]

export default function DatePicker({
  defaultValue,
  buttonClassName,
  onDateChange,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [viewDate, setViewDate] = React.useState<Date>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )

  React.useEffect(() => {
    if (defaultValue) {
      const newDate = new Date(defaultValue)
      setSelectedDate(newDate)
      setViewDate(newDate)
    }
  }, [defaultValue])

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    setIsPopoverOpen(false)
    onDateChange(date) // 날짜 선택 시 부모 컴포넌트에 날짜를 전달
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10)
    setViewDate(new Date(viewDate.getFullYear(), month, 1))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10)
    setViewDate(new Date(year, viewDate.getMonth(), 1))
  }

  const renderCalendar = () => {
    const startOfMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      1,
    )
    const endOfMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0,
    )
    const startDay = startOfMonth.getDay()
    const daysInMonth = endOfMonth.getDate()

    const calendarDays = []
    for (let i = 0; i < startDay; i += 1) {
      calendarDays.push(<div key={`empty-${i}`} className="w-8 h-8" />)
    }
    for (let i = 1; i <= daysInMonth; i += 1) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), i)
      const isSelected =
        selectedDate && selectedDate.toDateString() === date.toDateString()
      calendarDays.push(
        <button
          type="button"
          aria-label="날짜 선택"
          key={i}
          onClick={() => handleSelectDate(date)}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded-full',
            isSelected ? 'bg-primary-400' : 'hover:bg-primary-400',
          )}
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div
            key={day.id}
            className="w-8 h-8 flex items-center justify-center font-normal"
          >
            {day.day}
          </div>
        ))}
        {calendarDays}
      </div>
    )
  }

  const renderYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 1900; i <= currentYear; i += 1) {
      years.push(i)
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))
  }

  return (
    <div className="relative inline-block">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="light"
            className={cn(
              'w-[360px] justify-between text-left font-normal border-primary-400 group',
              buttonClassName,
            )}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            {selectedDate ? (
              format(selectedDate, 'yyyy.MM.dd')
            ) : (
              <span>날짜를 선택하세요</span>
            )}
            <div className="absolute inset-y-0 end-0 flex items-center pr-3">
              <HiPencil className="text-gray-300 group-hover:text-primary-400" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 h-72 p-4 bg-primary-50 text-xs text-[#49454F]">
          <div className="flex justify-between mb-2 space-x-2">
            <button
              type="button"
              aria-label="이전 월로 이동"
              onClick={() =>
                handleMonthChange({
                  target: { value: (viewDate.getMonth() - 1).toString() },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <FiChevronLeft className="text-[#49454F]" />
            </button>
            <select
              value={viewDate.getMonth()}
              onChange={handleMonthChange}
              className="bg-primary-50 focus:outline-none"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              aria-label="다음 달로 이동"
              onClick={() =>
                handleMonthChange({
                  target: { value: (viewDate.getMonth() + 1).toString() },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <FiChevronRight className="text-[#49454F]" />
            </button>
            <button
              type="button"
              aria-label="이전 연도로 이동"
              onClick={() =>
                handleYearChange({
                  target: { value: (viewDate.getFullYear() - 1).toString() },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <FiChevronLeft className="text-[#49454F]" />
            </button>
            <select
              value={viewDate.getFullYear()}
              onChange={handleYearChange}
              className="bg-primary-50 focus:outline-none"
            >
              {renderYears()}
            </select>
            <button
              type="button"
              aria-label="다음 연도로 이동"
              onClick={() =>
                handleYearChange({
                  target: { value: (viewDate.getFullYear() + 1).toString() },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <FiChevronRight className="text-[#49454F]" />
            </button>
          </div>
          {renderCalendar()}
        </PopoverContent>
      </Popover>
    </div>
  )
}
