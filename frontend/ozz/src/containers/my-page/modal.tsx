import React, { useRef } from 'react'
import { HiPhotograph, HiFolder } from 'react-icons/hi'

interface UploadModalProps {
  onClose: () => void
  onFileSelect: (file: File) => void // 상위 컴포넌트로 파일을 전달할 함수
}

export default function UploadModal({
  onClose,
  onFileSelect,
}: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() // 파일 입력 필드를 클릭하여 파일 선택 창을 엽니다.
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // 사용자가 선택한 파일을 가져옵니다.
    if (file) {
      onFileSelect(file) // 선택한 파일을 상위 컴포넌트로 전달합니다.
      onClose() // 모달을 닫습니다.
    }
  }

  return (
    <div className="absolute left-[60%] top-0 z-50 bg-gray-50 border border-gray-300 rounded-lg p-4 w-36 mt-8 mr-[-1rem] text-black">
      <div className="w-full h-full text-sm flex flex-col space-y-4 px-3">
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center justify-between w-full text-left"
        >
          사진 보관함
          <HiPhotograph />
        </button>
        <div className="border-t border-gray-300" />
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center justify-between w-full text-left"
        >
          파일 선택
          <HiFolder />
        </button>
        <input
          type="file"
          accept="image/*" // 이미지 파일만 선택할 수 있도록 제한합니다.
          ref={fileInputRef} // fileInputRef를 사용하여 이 요소에 접근합니다.
          onChange={handleFileChange} // 파일이 선택되면 handleFileChange가 호출됩니다.
          style={{ display: 'none' }} // 화면에 보이지 않게 숨깁니다.
        />
      </div>
    </div>
  )
}
