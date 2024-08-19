interface ScrollableModalProps {
  onClose: () => void
  title?: string
  width?: string
  children: React.ReactNode
}

export default function ScrollableModal({
  onClose,
  title,
  width,
  children,
}: ScrollableModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary bg-opacity-50">
      <div
        className={`bg-secondary/80 rounded-xl shadow-lg overflow-hidden max-w-lg ${width || 'w-[250px]'} h-[500px] flex flex-col`}
      >
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className="text-primary-400 hover:text-primary-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  )
}
