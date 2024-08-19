'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ClothesUpdateRequest } from '@/types/clothes/data-contracts'
import { ClothingData } from '@/types/clothing'
import {
  getClothingDetails,
  updateClothing,
  deleteClothing,
} from '@/services/clothingApi'
import ClothingForm from '@/containers/closet-page/ClothingForm'
import ClothesDeleteButton from '@/components/Button/ClothesDeleteButton'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import HeaderWithBackward from '@/components/HeaderWithBackward'

export default function ModifyPage({ params }: { params: { id: number } }) {
  const [clothingData, setClothingData] = useState<ClothingData | undefined>(
    undefined,
  )
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (params.id) {
      const fetchClothingData = async () => {
        try {
          const formattedData = await getClothingDetails(params.id)
          setClothingData(formattedData)
        } catch (error) {
          console.error('Error fetching clothing data:', error)
        }
      }

      fetchClothingData()
    }
  }, [params.id])

  const handleSubmit = async (
    imageFile: File,
    request: ClothesUpdateRequest,
  ) => {
    try {
      const response = await updateClothing(params.id, imageFile, request)
      // console.log('Clothes added successfully', response)
      router.push('/closet')
    } catch (error) {
      console.error('Failed to add clothes', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteClothing(params.id)
      router.push('/closet')
    } catch (error) {
      console.error('Failed to delete clothes', error)
    }
  }

  return (
    <>
      <HeaderWithBackward title="나의 옷짱" />
      <ClothingForm
        initialData={clothingData}
        onSubmit={handleSubmit}
        submitButtonText="수정하기"
      />
      <ClothesDeleteButton onClick={() => setShowConfirmModal(true)} />
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
          message="정말 삭제하시겠습니까?"
        />
      )}
    </>
  )
}
