import Modal from '@/components/Modal'
import { Fit, fitMap } from '@/types/clothing'

type FitModalProps = {
  onClose: () => void
  setValue: (value: Fit) => void
}

const fits = ['오버핏', '세미오버핏', '레귤러핏', '슬림핏']

export default function FitModal({ onClose, setValue }: FitModalProps) {
  const handleSave = (fit: string) => {
    setValue(fitMap[fit])
    onClose()
  }

  return (
    <Modal title="핏" onClose={onClose} width="w-[200px]">
      <div className="flex flex-wrap  w-full l-1 pr-2">
        {fits.map((fit) => (
          <button
            key={fit}
            type="button"
            className="px-2 py-0.5 m-1 rounded-lg border-2 border-primary-400 text-primary-400 text-sm font-semibold"
            onClick={() => handleSave(fit)}
          >
            {fit}
          </button>
        ))}
      </div>
    </Modal>
  )
}
