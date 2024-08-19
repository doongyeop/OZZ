import { useCategorySidebar } from '@/contexts/CategorySidebarContext'
import CategorySidebar from '@/components/Button/CategorySidebar'
import ClothesRegistButton from '@/components/Button/ClothesRegistButton'
import { categoryMap, categoryNameToLowIdMap } from '@/types/clothing'
import UserCloset from '@/components/UserCloset'

export default function ClosetPageContainer() {
  const { isSidebarOpen, selectedCategory, selectedSubcategory } =
    useCategorySidebar()

  // 카테고리 이름을 ID로 변환
  const categoryHighId =
    selectedCategory && selectedCategory
      ? categoryMap[selectedCategory]?.id
      : ''
  const categoryLowId =
    selectedSubcategory && selectedSubcategory !== '전체'
      ? categoryNameToLowIdMap[selectedSubcategory]
      : ''

  return (
    <div>
      {isSidebarOpen && <CategorySidebar />}
      <UserCloset
        categoryHighId={categoryHighId}
        categoryLowId={categoryLowId}
        isSelectable={false}
      />
      <ClothesRegistButton />
    </div>
  )
}
