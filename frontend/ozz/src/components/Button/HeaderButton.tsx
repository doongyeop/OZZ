import { ReactElement } from 'react'
import Link from 'next/link'

interface HeaderButtonProps {
  icon: ReactElement
  onClick?: () => void
  href?: string
}

export default function HeaderButton({
  icon,
  onClick,
  href,
}: HeaderButtonProps) {
  const buttonContent = <div className="p-2">{icon}</div>

  if (href) {
    return <Link href={href}>{buttonContent}</Link>
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className=""
      aria-label="header button"
    >
      {buttonContent}
    </button>
  )
}
