import React from 'react'

export default function OutlineButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex justify-center items-center outline outline-primary-200 rounded-md p-2 w-full hover:outline-none hover:bg-secondary hover:text-white active:outline-none active:bg-secondary active:text-white transition-colors duration-200"
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      {children}
    </button>
  )
}
