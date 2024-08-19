'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import {
  categoryMap,
  categoryLowIdToNameMap,
  CategoryHigh,
} from '@/types/clothing'

type CategoryModalProps = {
  onClose: () => void
  setValue: (value: string) => void
}

export default function CategoryModal({
  onClose,
  setValue,
}: CategoryModalProps) {
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryHigh | null>(null)

  const handleMainCategoryClick = (mainCategory: CategoryHigh) => {
    setSelectedMainCategory((prevCategory) =>
      prevCategory === mainCategory ? null : mainCategory,
    )
  }

  const handleSubCategoryClick = (subCategoryId: number) => {
    const subCategoryName = categoryLowIdToNameMap[subCategoryId]
    setValue(`${selectedMainCategory} > ${subCategoryName}`)
    onClose()
  }

  const handleBack = () => {
    setSelectedMainCategory(null)
  }

  return (
    <Modal title="카테고리" onClose={onClose}>
      {!selectedMainCategory ? (
        <div className="flex flex-wrap w-full pl-1 pr-2 mb-2">
          {Object.keys(categoryMap).map((mainCategory) => (
            <button
              key={mainCategory}
              type="button"
              className="px-2 py-0.5 m-1 rounded-lg border-2 border-primary-400 text-primary-400 text-sm"
              onClick={() =>
                handleMainCategoryClick(mainCategory as CategoryHigh)
              }
            >
              {mainCategory}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap w-full pl-1 pr-2 mb-2">
            <button
              type="button"
              className="px-2 py-0.5 m-1 rounded-lg border-2 border-primary-400 text-secondary text-sm bg-primary-400 font-bold"
            >
              {selectedMainCategory}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="m-1 px-3 py-0.5 rounded-lg border-2 border-primary-400 text-primary-400 text-sm"
            >
              ←
            </button>
          </div>
          {selectedMainCategory && (
            <div className="flex flex-wrap pl-1 pr-2 mb-4">
              {Object.entries(
                categoryMap[selectedMainCategory].subcategories,
              ).map(([subCategory, subCategoryId]) => (
                <button
                  key={subCategory}
                  type="button"
                  className="px-2 py-0.5 ml-1 mb-1.5 rounded-lg border-2 border-primary-400 bg-secondary text-primary-400 text-sm"
                  onClick={() => handleSubCategoryClick(subCategoryId)}
                >
                  {subCategory}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
