import React, { useState, useRef } from "react"
import { AlertTriangle, X, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [isChecked, setIsChecked] = useState(false)
  const [showCheckboxPrompt, setShowCheckboxPrompt] = useState(false)
  const checkboxRef = useRef<HTMLDivElement>(null)

  const handleSelectAgent = () => {
    if (!isChecked) {
      setShowCheckboxPrompt(true)
      // Scroll to and highlight checkbox
      checkboxRef.current?.scrollIntoView({ behavior: "smooth" })
      // Auto-hide prompt after 3 seconds
      setTimeout(() => setShowCheckboxPrompt(false), 3000)
      return
    }
    onConfirm()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#1a1a1a] border-2 border-[#ff3e3e] rounded-lg max-w-lg w-full p-6 relative"
      >
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

        <div ref={checkboxRef} className="relative">
          <div
            className={`bg-black/50 p-4 rounded-lg mb-6 transition-all duration-300
           `}
          >
            <label className="flex items-start gap-3 cursor-pointer group">
              <motion.div
                className="relative mt-1"
                animate={
                  showCheckboxPrompt
                    ? {
                        scale: [1, 1.1, 1],
                        borderColor: [
                          "rgba(255,62,62,0.3)",
                          "rgba(255,62,62,1)",
                          "rgba(255,62,62,0.3)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: showCheckboxPrompt ? Infinity : 0,
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={e => {
                    setIsChecked(e.target.checked)
                    setShowCheckboxPrompt(false)
                  }}
                  disabled={isSubmitting}
                  className="peer sr-only"
                />
                <div
                  className="w-6 h-6 border-2 border-[#ff3e3e]/60 rounded 
                             bg-black/60 transition-all duration-200
                             peer-checked:border-[#ff3e3e] peer-checked:bg-[#ff3e3e]
                             group-hover:border-[#ff3e3e]/60"
                >
                  {isChecked && (
                    <Check
                      className="w-5 h-5 text-white absolute 
                                  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              </motion.div>
              <span className="text-sm text-gray-300 flex-1">
                I confirm I have the recipient's consent or no objection for
                receiving this call and agree to the Terms and Privacy Policy.
              </span>
            </label>
          </div>

          {/* Checkbox Prompt Message */}
          {/*   <AnimatePresence>
            {showCheckboxPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-6 left-0 right-0 text-center text-[#ff3e3e] text-sm"
              >
                Please accept the terms to continue
              </motion.div>
            )}
          </AnimatePresence> */}
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
          <motion.button
            onClick={handleSelectAgent}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200
                     relative overflow-hidden
                     ${
                       isChecked
                         ? "bg-[#ff3e3e] hover:bg-[#ff5555] text-white"
                         : "bg-[#ff3e3e] text-white"
                     }`}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={isChecked ? { x: "100%" } : {}}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
                repeatDelay: 0.5,
              }}
            />
            <span className="relative z-10">
              {isSubmitting ? "Processing..." : "Select Agent"}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConsentModal
