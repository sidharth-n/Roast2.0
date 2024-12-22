import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, ChevronDown, ChevronUp, Mic, Tag } from "lucide-react"
import { useState, useEffect } from "react"

interface PaymentConfirmationProps {
  agent: {
    name: string
    price: string
    duration: string
    roastLevel: string
    codename: string
  }
  onClose: () => void
  onConfirm: (withRecording: boolean) => void
}

const PaymentConfirmationModal = ({
  agent,
  onClose,
  onConfirm,
}: PaymentConfirmationProps) => {
  const [includeRecording, setIncludeRecording] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [offerApplied, setOfferApplied] = useState(false)

  const recordingPrice = 2.99
  const basePrice = parseFloat(agent.price.replace("$", ""))
  const discountedPrice = (basePrice * 0.7).toFixed(2)
  const totalPrice = includeRecording
    ? (parseFloat(discountedPrice) + recordingPrice).toFixed(2)
    : discountedPrice

  useEffect(() => {
    if (timeLeft > 0 && offerApplied) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, offerApplied])

  const handleApplyOffer = () => {
    setOfferApplied(true)
    setIncludeRecording(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-black/60 border-2 border-[#ff3e3e]/30 rounded-lg p-6 
                  max-w-sm w-full shadow-lg shadow-[#ff3e3e]/20"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-digital mb-2">
            DEPLOY {agent.name}
          </h2>
        </div>

        {/* Agent Box */}
        <div className="bg-black/40 rounded-lg p-4 mb-4 border border-[#ff3e3e]/20">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[#ff3e3e] text-sm font-digital mb-1">
                SELECTED AGENT
              </div>
              <div className="text-xl font-bold text-white font-digital">
                {agent.name}
              </div>
              <div className="text-gray-400 text-sm">
                CODENAME: {agent.codename}
              </div>
            </div>
            <div className="text-right relative">
              <AnimatePresence>
                {offerApplied && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-gray-500 line-through text-sm relative"
                    >
                      ${basePrice.toFixed(2)}
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 12 }}
                        className="absolute -top-3 -right-2 bg-[#ff3e3e] text-white 
                                 text-[10px] px-1 rounded font-digital"
                      >
                        -30%
                      </motion.span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl text-[#ff3e3e] font-bold font-digital"
                    >
                      ${discountedPrice}
                    </motion.div>
                  </>
                )}
                {!offerApplied && (
                  <div className="text-xl text-white font-bold font-digital">
                    ${basePrice.toFixed(2)}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Recording Option */}
        <div
          onClick={() => setIncludeRecording(!includeRecording)}
          className={`bg-gradient-to-r ${
            includeRecording
              ? "from-[#ff3e3e]/30 to-black/40 border-[#ff3e3e]"
              : "from-[#ff3e3e]/10 to-black/40 border-[#ff3e3e]/30"
          } rounded-lg p-4 mb-4 cursor-pointer border-2
          hover:bg-[#ff3e3e]/20 transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic
                className={`w-6 h-6 ${
                  includeRecording ? "text-[#ff3e3e]" : "text-gray-500"
                }`}
              />
              <div>
                <div className="text-white font-digital">SAVE THE ROAST</div>
                <div className="text-sm text-gray-400">HD Call Recording</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#ff3e3e] font-digital">+$2.99</div>
              <input
                type="checkbox"
                checked={includeRecording}
                onChange={e => setIncludeRecording(e.target.checked)}
                className="w-5 h-5 accent-[#ff3e3e]"
              />
            </div>
          </div>
        </div>

        {/* Coupon Section (only if not applied) */}
        {!offerApplied && (
          <div className="bg-[#ff3e3e]/5 border border-[#ff3e3e]/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 bg-black/30 rounded px-3 py-2 border border-[#ff3e3e]/20">
                <div className="text-[#ff3e3e] font-digital text-sm">
                  SPECIAL30
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyOffer}
                className="bg-[#ff3e3e] px-4 py-2 rounded font-digital text-sm
                         hover:bg-[#ff5555] transition-colors"
              >
                REDEEM
              </motion.button>
            </div>
            <div className="text-gray-400 text-xs mt-2">30% OFF</div>
          </div>
        )}

        {/* Total Price */}
        <div
          className="flex justify-between items-center mb-4 p-3
                    bg-gradient-to-r from-[#ff3e3e]/20 to-black/40 rounded-lg"
        >
          <span className="text-white font-digital">TOTAL</span>
          <span className="text-2xl text-[#ff3e3e] font-bold font-digital">
            ${offerApplied ? totalPrice : basePrice}
          </span>
        </div>

        {/* Deploy Section */}
        <div className="space-y-2">
          {offerApplied && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-[#ff3e3e]/10 rounded-lg p-2 border border-[#ff3e3e]/30"
            >
              <div className="text-[#ff3e3e] font-digital text-sm animate-pulse">
                OFFER EXPIRES IN {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? "0" : ""}
                {timeLeft % 60}
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirm(includeRecording)}
            className="w-full py-3 px-6 rounded-lg font-bold
                     bg-[#ff3e3e] hover:bg-[#ff5555] text-white
                     transform transition-all duration-200 
                     border-b-4 border-[#cc0000]
                     hover:border-b-2 hover:translate-y-[2px]
                     font-digital tracking-wide
                     flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            DEPLOY NOW
          </motion.button>

          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white 
                     transition-colors py-2 font-digital text-sm"
          >
            BACK
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PaymentConfirmationModal
