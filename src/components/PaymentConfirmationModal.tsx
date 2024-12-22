import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Minus, Plus, Flame, Star } from "lucide-react"
import { useState, useEffect } from "react"
import * as Slider from "@radix-ui/react-slider"

interface PaymentConfirmationProps {
  agent: {
    name: string
    codename: string
    pricePerMinute: number
    roastLevel: string
    icon: string
  }
  onClose: () => void
  onConfirm: (config: {
    duration: number
    intensity: number
    recording: boolean
  }) => void
}

const PaymentConfirmationModal = ({
  agent,
  onClose,
  onConfirm,
}: PaymentConfirmationProps) => {
  const [duration, setDuration] = useState(1.5)
  const [intensity, setIntensity] = useState(50)
  const [includeRecording, setIncludeRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [offerApplied, setOfferApplied] = useState(false)
  const [showSavingsModal, setShowSavingsModal] = useState(false)

  // Calculate prices
  const basePrice = agent.pricePerMinute * duration
  const intensityPrice = (intensity / 100) * 1.0 // Max $1.00 for highest intensity
  const recordingPrice = includeRecording ? 2.99 : 0

  const subtotal = basePrice + intensityPrice + recordingPrice
  const discount = offerApplied ? subtotal * 0.3 : 0
  const total = subtotal - discount

  const handleDurationChange = (increment: boolean) => {
    setDuration(prev => {
      const newValue = increment ? prev + 0.5 : prev - 0.5
      return Math.min(Math.max(newValue, 1.5), 10)
    })
  }

  useEffect(() => {
    if (timeLeft > 0 && offerApplied) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, offerApplied])

  const handleApplyOffer = () => {
    setOfferApplied(true)
    setShowSavingsModal(true)
    setTimeout(() => setShowSavingsModal(false), 3000)
  }

  return (
    <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
      <motion.div
        className="bg-black/60 border-2 border-[#ff3e3e]/30 rounded-lg p-4 
                           max-w-sm w-full shadow-lg shadow-[#ff3e3e]/20 max-h-[90vh] overflow-y-auto"
      >
        {/* Agent Info - Compact */}
        <div className="flex items-center gap-3 mb-3 bg-black/40 p-2 rounded-lg border border-[#ff3e3e]/20">
          <img
            src={agent.icon}
            alt={agent.name}
            className="w-12 h-12 rounded border border-[#ff3e3e]/30"
          />
          <div>
            <h3 className="text-white font-digital text-lg">{agent.name}</h3>
            <div className="text-[#ff3e3e] font-digital">
              ${agent.pricePerMinute.toFixed(2)}/min
            </div>
          </div>
        </div>

        {/* Duration Control */}
        <div className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-digital text-sm">DURATION</span>
            <div className="text-[#00ff87] font-digital">
              ${basePrice.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => handleDurationChange(false)}
              disabled={duration <= 1.5}
              className="bg-black/30 p-1.5 rounded border border-[#ff3e3e]/20 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-white" />
            </button>
            <div className="text-white font-digital text-lg">
              {duration.toFixed(1)} min
            </div>
            <button
              onClick={() => handleDurationChange(true)}
              disabled={duration >= 10}
              className="bg-black/30 p-1.5 rounded border border-[#ff3e3e]/20
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Roast Intensity Slider */}
        <div className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ff3e3e]" />
              <span className="text-white font-digital text-sm">
                ROAST INTENSITY
              </span>
            </div>
            <div className="text-[#ff3e3e] font-digital">
              +${intensityPrice.toFixed(2)}
            </div>
          </div>

          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[intensity]}
            onValueChange={([value]) => setIntensity(value)}
            max={100}
            step={1}
          >
            <Slider.Track className="bg-black/40 relative grow rounded-full h-1.5 border border-[#ff3e3e]/30">
              <Slider.Range className="absolute bg-gradient-to-r from-yellow-500 to-[#ff3e3e] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white rounded-full border-2 border-[#ff3e3e] 
                       hover:bg-gray-50 focus:outline-none"
            />
          </Slider.Root>

          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Mild</span>
            <span>Spicy</span>
            <span>Inferno</span>
          </div>
        </div>

        {/* Recording Option */}
        <div
          className="flex items-center justify-between bg-black/40 p-3 rounded-lg 
                     border border-[#ff3e3e]/20 mb-3"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeRecording}
              onChange={e => setIncludeRecording(e.target.checked)}
              className="rounded border-[#ff3e3e]/30 bg-black/30"
            />
            <span className="text-white font-digital text-sm">
              HD CALL RECORDING
            </span>
          </label>
          <span className="text-[#00ff87] font-digital text-sm">+$2.99</span>
        </div>

        {/* Offer Section - Compact */}
        {!offerApplied && timeLeft > 0 && (
          <div
            className="bg-[#ff3e3e]/5 border border-dashed border-[#ff3e3e]/30 
                       rounded-lg p-2 mb-3 flex items-center justify-between gap-2"
          >
            <div className="bg-black/30 px-2 py-1 rounded">
              <span className="text-[#ff3e3e] font-digital text-sm">
                SPECIAL30
              </span>
            </div>
            <button
              onClick={handleApplyOffer}
              className="bg-[#ff3e3e] px-3 py-1 rounded font-digital text-sm
                       hover:bg-[#ff5555] transition-colors"
            >
              APPLY
            </button>
          </div>
        )}

        {/* Price Breakdown Section */}
        <div className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <div className="space-y-1 text-sm mb-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Base ({duration} min)</span>
              <span className="text-white">${basePrice.toFixed(2)}</span>
            </div>
            {intensityPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Intensity</span>
                <span className="text-[#ff3e3e]">
                  +${intensityPrice.toFixed(2)}
                </span>
              </div>
            )}
            {includeRecording && (
              <div className="flex justify-between">
                <span className="text-gray-400">Recording</span>
                <span className="text-[#00ff87]">+$2.99</span>
              </div>
            )}
            {offerApplied && (
              <div className="flex justify-between text-[#00ff87]">
                <span>DISCOUNT</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="pt-2 border-t border-[#ff3e3e]/20 flex justify-between items-center">
            <span className="text-white font-digital">TOTAL</span>
            <div className="text-right">
              {offerApplied && (
                <div className="text-gray-500 line-through text-xs">
                  ${subtotal.toFixed(2)}
                </div>
              )}
              <div className="text-xl text-[#ff3e3e] font-bold font-digital">
                ${total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Timer and Deploy Button Section */}
        <div className="relative">
          {offerApplied && timeLeft > 0 && (
            <div className="text-center text-[#00ff87] font-digital text-sm mb-2">
              OFFER EXPIRES IN {timeLeft}s
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              onConfirm({ duration, intensity, recording: includeRecording })
            }
            className="relative w-full py-2 px-4 rounded font-bold
                     bg-[#ff3e3e] hover:bg-[#ff5555] text-white
                     transform transition-all duration-200 
                     border-b-4 border-[#cc0000]
                     hover:border-b-2 hover:translate-y-[2px]
                     font-digital tracking-wide text-sm
                     flex items-center justify-center gap-2
                     overflow-hidden"
          >
            {offerApplied && timeLeft > 0 && (
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: timeLeft, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-[#8b0000]/40 to-[#cc0000]/40"
              />
            )}

            <motion.div
              animate={{
                scale: offerApplied && timeLeft > 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center gap-2 relative z-10"
            >
              <CreditCard className="w-4 h-4" />
              DEPLOY NOW • ${total.toFixed(2)}
            </motion.div>
          </motion.button>
        </div>

        <button
          onClick={onClose}
          className="w-full text-gray-400 hover:text-white 
                   transition-colors py-2 mt-1 font-digital text-xs"
        >
          BACK
        </button>

        {/* Savings Modal */}
        <AnimatePresence>
          {showSavingsModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div
                className="bg-black/95 border-2 border-[#00ff87] rounded-lg p-4 
                           text-center max-w-sm mx-4"
              >
                <div className="text-[#00ff87] text-3xl font-digital mb-2">
                  ${discount.toFixed(2)}
                </div>
                <div className="text-white font-digital text-base mb-2">
                  SAVED ON YOUR ROAST!
                </div>
                <div className="text-gray-400 text-xs">
                  Offer applied successfully
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default PaymentConfirmationModal
