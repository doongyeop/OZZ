import { PiSpinnerGapThin } from 'react-icons/pi'

export default function LoadingIcon() {
  return (
    <div className="w-screen h-screen bg-secondary bg-opacity-30 flex justify-center items-center">
      <PiSpinnerGapThin className="animate-spin text-6xl text-primary-400" />
    </div>
  )
}
