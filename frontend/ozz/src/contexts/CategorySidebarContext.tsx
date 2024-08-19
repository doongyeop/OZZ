'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react'

interface CategorySidebarContextType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  selectedCategory: string | undefined
  selectedSubcategory: string | undefined
  setCategory: (category: string, subcategory: string) => void
}

const CategorySidebarContext = createContext<
  CategorySidebarContextType | undefined
>(undefined)

export function CategorySidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | undefined
  >(undefined)

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  const setCategory = useCallback(
    (category: string, subcategory: string) => {
      setSelectedCategory(category)
      setSelectedSubcategory(subcategory)
      closeSidebar()
    },
    [closeSidebar],
  )

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      selectedCategory,
      selectedSubcategory,
      setCategory,
    }),
    [
      isSidebarOpen,
      selectedCategory,
      selectedSubcategory,
      toggleSidebar,
      closeSidebar,
      setCategory,
    ],
  )

  return (
    <CategorySidebarContext.Provider value={value}>
      {children}
    </CategorySidebarContext.Provider>
  )
}

export function useCategorySidebar() {
  const context = useContext(CategorySidebarContext)
  if (context === undefined) {
    throw new Error(
      'useCategorySidebar must be used within a CategorySidebarProvider',
    )
  }
  return context
}
