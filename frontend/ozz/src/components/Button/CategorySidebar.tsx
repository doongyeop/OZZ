// src/components/CategorySidebar.tsx
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useCategorySidebar } from '@/contexts/CategorySidebarContext'

// interface CategorySidebarProps {
//   onSelectCategory: (category: string, subcategory: string) => void
//   onClose: () => void
// }

const categories = {
  전체: [],
  상의: [
    '전체',
    '탑',
    '블라우스',
    '티셔츠',
    '니트웨어',
    '셔츠',
    '브라탑',
    '후드티',
  ],
  하의: ['전체', '청바지', '팬츠', '스커트', '레깅스', '조거팬츠'],
  신발: ['전체', '운동화', '구두', '샌들/슬리퍼'],
  가방: ['전체', '백팩', '힙색'],
  아우터: ['전체', '코트', '재킷', '점퍼', '패딩', '베스트', '가디건', '짚업'],
  원피스: ['전체', '드레스', '점프수트'],
  악세서리: ['전체', '주얼리', '기타', '모자'],
}

export default function CategorySidebar() {
  const { closeSidebar, setCategory } = useCategorySidebar()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    if (category === '전체') {
      setCategory('', '')
      return
    }
    setExpandedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    )
  }

  return (
    <div className="relative">
      <div className="z-50 fixed top-20 h-screen-minus-36 w-32 bg-secondary shadow-md transform translate-x-0 transition-transform flex flex-col">
        <div className="flex flex-col">
          <div className="mt-2 text-right">
            <button
              onClick={closeSidebar}
              className="text-primary-400 w-6 h-6"
              type="button"
              aria-label="Close sidebar"
            >
              <IoClose />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pl-4 pr-4">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={category} className="mb-2">
                <button
                  type="button"
                  className={`w-full flex justify-center items-center p-2 text-center text-lg ${
                    expandedCategory === category
                      ? 'text-primary-400'
                      : 'text-gray-light'
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
                {expandedCategory === category && (
                  <div className="ml-4">
                    {subcategories.map((subcategory) => (
                      <button
                        type="button"
                        key={subcategory}
                        className="block w-full text-right p-1 text-gray-light hover:text-primary-400"
                        onClick={() => setCategory(category, subcategory)}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
