import { HiDownload } from 'react-icons/hi'
import { Button } from '../ui/button'

type SaveCoordiButtonProps = {
  onClick: () => void
  disabled: boolean
}

export default function SaveCoordiButton({
  onClick,
  disabled,
}: SaveCoordiButtonProps) {
  return (
    <Button
      variant="line"
      className="w-48 h-9 p-4"
      onClick={onClick}
      disabled={disabled}
    >
      {' '}
      <HiDownload className="text-primary-400 mr-2" /> 내 코디에 저장하기{' '}
    </Button>
  )
}
