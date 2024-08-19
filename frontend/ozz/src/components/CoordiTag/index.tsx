/* eslint-disable @typescript-eslint/no-unused-vars */

import { CoordishotDetail } from '@/types/coordishot'

type CoordiTagProps = {
  styles: string[]
  age: number
}

export default function CoordiTag({ styles, age }: CoordiTagProps) {
  return (
    <div className="flex justify-center my-4 text-xs">
      {styles.map((style) => (
        <span
          key={style}
          className="bg-primary-100 text-secondary px-2 py-1 mx-1 rounded-full"
        >
          #{style}
        </span>
      ))}
      <span className="bg-primary-100 text-secondary px-2 py-1 mx-1 rounded-full">
        #{age}대
      </span>
    </div>
  )
}
