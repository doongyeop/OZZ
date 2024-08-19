import { ImSpinner8 } from 'react-icons/im'

export default function LoadingModal() {
  return (
    // <div className="relative w-full h-full">
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center w-[200px] h-[200px] bg-secondary text-primary-400 rounded-lg">
        <ImSpinner8 className="animate-spin" size="40" />
        <p className="mt-4">로딩 중...</p>
      </div>
    </div>
    // </div>
  )
}
