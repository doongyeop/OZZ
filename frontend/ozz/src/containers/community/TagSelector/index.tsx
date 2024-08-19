'use client'

import TagButton from '@/components/Button/TagButton'
import { useState } from 'react'

const styleTags = [
  '스트릿',
  '캐주얼',
  '스포티',
  '포멀',
  '로맨틱',
  '엘레강스',
  '매니시',
  '모던',
  '내추럴',
  '에스닉',
]

const ageTags = [
  '10세 미만',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대 이상',
]

interface TagSelectorProps {
  group: 'style' | 'age'
}

export default function TagSelector({ group }: TagSelectorProps) {
  const [selectedTag, setSelectedTag] = useState<string>('')

  const tags = group === 'style' ? styleTags : ageTags

  return (
    <div className="flex justify-center">
      <div className="flex overflow-x-auto whitespace-nowrap p-2 space-x-1">
        {tags.map((tag) => (
          <TagButton
            key={tag}
            isSelected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </div>
    </div>
  )
}
