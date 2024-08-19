'use client'

import { useRouter } from 'next/navigation'

import ClothingForm from '@/containers/closet-page/ClothingForm'
import { ClothesCreateRequest } from '@/types/clothes/data-contracts'
import { createClothing } from '@/services/clothingApi'
import HeaderWithBackward from '@/components/HeaderWithBackward'

export default function Page() {
  const router = useRouter()

  const handleSubmit = async (
    imageFile: File,
    request: ClothesCreateRequest,
  ) => {
    try {
      await createClothing(imageFile, request)
      router.push('/closet')
    } catch (error) {
      console.error('Failed to add clothes', error)
    }
  }

  return (
    <>
      <HeaderWithBackward title="나의 옷짱" />
      <ClothingForm onSubmit={handleSubmit} submitButtonText="등록하기" />
    </>
  )
}
