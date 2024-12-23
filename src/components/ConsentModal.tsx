import React from "react"
import { AlertTriangle, X } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isSubmitting?: boolean
}

const ConsentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#ff3e3e] rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute right-4 top-4 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-[#ff3e3e]" size={28} />
          <h2 className="text-2xl text-[#ff3e3e]">Before We Start</h2>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-gray-300">
            • Calls are made from random US numbers - ensure the recipient picks
            up
          </p>
          <p className="text-gray-300">• Credits are non-refundable</p>
          <p className="text-gray-300">
            • No hate speech or inappropriate content allowed
          </p>
          <p className="text-gray-300">
            • This is for fun and entertainment - you are responsible for any
            misuse
          </p>
        </div>

        <div className="bg-black/50 p-4 rounded-lg mb-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1.5"
              disabled={isSubmitting}
              onChange={e => (e.target.checked ? onConfirm : null)}
            />
            <span className="text-sm text-gray-300">
              I confirm the recipient's consent or no objection for receiving
              this call and agree to the Terms and Privacy Policy. This
              non-commercial call complies with regional telecom and data
              protection law of respective countries.
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-[#ff3e3e] hover:bg-[#ff5555] px-6 py-2 rounded-lg font-semibold
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Select Agent"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsentModal
