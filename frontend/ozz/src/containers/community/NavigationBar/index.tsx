'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: '전체 보기', href: '/community/all' },
  { name: '스타일', href: '/community/style' },
  { name: '연령대', href: '/community/age' },
]

export default function NavigationBar() {
  const pathname = usePathname()

  return (
    <nav className="text-secondary p-4 border-b">
      <ul className="flex justify-around">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`hover:bg-primary-100 hover:text-secondary px-3 py-2 rounded-lg ${pathname === link.href ? 'bg-secondary font-bold text-primary-400 ' : ''}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
