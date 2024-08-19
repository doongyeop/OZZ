'use client'

import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { ClothesBasicWithFileResponse } from '@/types/clothes/data-contracts'

export type ClothingItem = ClothesBasicWithFileResponse & { imageUrl: string }

interface SelectedItemContextType {
  selectedItem: ClothingItem | null
  setSelectedItem: (item: ClothingItem | null) => void
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
  undefined,
)

interface SelectedItemProviderProps {
  children: ReactNode
}

export function SelectedItemProvider({ children }: SelectedItemProviderProps) {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null)

  const value = useMemo(
    () => ({ selectedItem, setSelectedItem }),
    [selectedItem],
  )

  return (
    <SelectedItemContext.Provider value={value}>
      {children}
    </SelectedItemContext.Provider>
  )
}

export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext)
  if (!context) {
    throw new Error(
      'useSelectedItem must be used within a SelectedItemProvider',
    )
  }
  return context
}
