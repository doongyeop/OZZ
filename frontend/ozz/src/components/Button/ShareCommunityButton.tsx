/* eslint-disable @typescript-eslint/no-unused-vars */

import { FaShareAlt } from 'react-icons/fa'
import { Button } from '../ui/button'

type ShareCommunityButtonProps = {
  onClick: () => void
  disabled: boolean
}

export default function ShareCommunityButton({
  onClick,
  disabled,
}: ShareCommunityButtonProps) {
  return (
    <Button variant="line" className="w-48 h-9 p-4" disabled={disabled}>
      {' '}
      <FaShareAlt className="text-primary-400 mr-2" /> 커뮤니티에 공유하기{' '}
    </Button>
  )
}
