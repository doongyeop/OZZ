'use client'

import { useWeather } from '@/contexts/WeatherContext'
import { useEffect, useState } from 'react'
import { LiaSlashSolid } from 'react-icons/lia'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Image from 'next/image'

const getDayOfWeekColor = (dayOfWeek: string): string => {
  switch (dayOfWeek) {
    case '토':
      return 'text-blue-500'
    case '일':
      return 'text-red-500'
    default:
      return ''
  }
}

export default function Weather() {
  const { weather, selectedWeather, setSelectedWeather, error, location } =
    useWeather()
  const [selectedDay, setSelectedDay] = useState<number>(0) // 선택된 날짜의 인덱스

  useEffect(() => {
    if (weather) {
      setSelectedWeather(weather[selectedDay])
    }
  }, [selectedDay, weather, setSelectedWeather])

  return (
    <div className="m-4 p-2 flex justify-center bg-gray-light rounded-lg">
      <div className="w-full">
        {error && !weather && <p>Error: {error}</p>}
        {location.latitude === null && location.longitude === null && (
          <p>Loading location...</p>
        )}
        {weather ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center space-x-2 my-1">
              <span className="text-lg font-semibold">
                {format(weather[selectedDay].date, 'M월 d일', { locale: ko })} (
                {weather[selectedDay].dayOfWeek})
              </span>
              <span className="bg-secondary rounded-full text-white text-xs px-2 py-0.5">
                {weather[selectedDay].season}
              </span>
            </div>
            <div className="flex items-center space-x-10 font-semibold text-lg">
              <div className="flex flex-col items-center min-w-20">
                <span className="text-red-500 me-8">
                  {weather[selectedDay].maxTemp}°
                </span>
                <LiaSlashSolid className="absolute mt-5 text-secondary" />
                <span className="text-blue-500 ms-12">
                  {weather[selectedDay].minTemp}°
                </span>
              </div>
              <Image
                src={`/images/weather/${weather[selectedDay].icon}`}
                alt={weather[selectedDay].description}
                width={0}
                height={0}
                sizes="100%"
                className="w-16"
              />
              <div className="text-center min-w-20">
                <p className="text-lg">{weather[selectedDay].description}</p>
                <p className="text-sm">습도 {weather[selectedDay].humidity}%</p>
              </div>
            </div>
            <div className="flex justify-between min-w-full">
              {weather.map((day, index) => (
                <div
                  role="presentation"
                  key={day.dayOfWeek}
                  onClick={() => setSelectedDay(index)}
                  className={`shrink flex flex-col items-center cursor-pointer p-2 ${
                    selectedWeather && selectedWeather.date === day.date
                      ? 'bg-gray-medium rounded-lg'
                      : ''
                  }`}
                >
                  <p className={`text-sm ${getDayOfWeekColor(day.dayOfWeek)}`}>
                    {day.dayOfWeek}
                  </p>
                  <Image
                    src={`/images/weather/${day.icon}`}
                    alt={day.description}
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-6"
                  />
                  <p className="text-xs text-secondary font-light">
                    {format(day.date, 'MM/dd', { locale: ko })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          location.latitude !== null &&
          location.longitude !== null && <p>Loading weather...</p>
        )}
      </div>
    </div>
  )
}
