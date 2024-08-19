'use client'

import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { Color } from '@/types/clothing'

interface SelectedColorContextProps {
  selectedColor: Color[]
  setSelectedColor: (colors: Color[]) => void
}

const SelectedColorContext = createContext<
  SelectedColorContextProps | undefined
>(undefined)

export function SelectedColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<Color[]>([])

  const value = useMemo(
    () => ({ selectedColor, setSelectedColor }),
    [selectedColor],
  )

  return (
    <SelectedColorContext.Provider value={value}>
      {children}
    </SelectedColorContext.Provider>
  )
}

export const useSelectedColor = () => {
  const context = useContext(SelectedColorContext)
  if (!context) {
    throw new Error(
      'useSelectedColor must be used within a SelectedColorProvider',
    )
  }
  return context
}
