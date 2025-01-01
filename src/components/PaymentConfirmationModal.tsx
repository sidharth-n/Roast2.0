import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Flame } from "lucide-react"
import * as Slider from "@radix-ui/react-slider"

interface PaymentConfirmationProps {
  agent: {
    name: string
    codename: string
    pricePerCall: string | number
    roastLevel: string
    icon: string
    maxCallDuration: number
  }
  language: string
  onClose: () => void
  onConfirm: (config: {
    intensity: number
    recording: boolean
    language: string
  }) => void
}

const PaymentConfirmationModal = ({
  agent,
  language,
  onClose,
  onConfirm,
}: PaymentConfirmationProps) => {
  const [intensity, setIntensity] = useState(50)
  const [includeRecording, setIncludeRecording] = useState(false)
  const [discountApplied, setDiscountApplied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showSavingsModal, setShowSavingsModal] = useState(false)
  const [discountUsed, setDiscountUsed] = useState(false)

  // Calculate prices
  const originalPrice =
    typeof agent.pricePerCall === "string" ? 0 : agent.pricePerCall
  const discount = 0.2 // 20% discount
  const discountedPrice = originalPrice * (1 - discount)
  const total = agent.pricePerCall === "FREE" ? 0 : Math.floor(discountedPrice)
  const savings = originalPrice - total

  useEffect(() => {
    if (timeLeft > 0 && discountApplied) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && discountApplied) {
      setDiscountApplied(false)
      setDiscountUsed(true)
    }
  }, [timeLeft, discountApplied])

  const handleApplyDiscount = () => {
    setDiscountApplied(true)
    setShowSavingsModal(true)
    setTimeLeft(30)
    setTimeout(() => setShowSavingsModal(false), 3000)
  }

  return (
    <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
      <motion.div
        className="bg-black/60 border-2 border-[#ff3e3e]/30 rounded-lg p-4 
                  max-w-sm w-full shadow-lg shadow-[#ff3e3e]/20 max-h-[90vh] overflow-y-auto"
      >
        {/* Agent Info */}
        <div className="flex items-center gap-3 mb-3 bg-black/40 p-2 rounded-lg border border-[#ff3e3e]/20">
          <img
            src={agent.icon}
            alt={agent.name}
            className="w-12 h-12 rounded border border-[#ff3e3e]/30"
          />
          <div>
            <h3 className="text-white font-digital text-lg">{agent.name}</h3>
            <div className="text-[#ff3e3e] font-digital">
              {agent.pricePerCall === "FREE"
                ? "FREE"
                : `₹${discountApplied ? total : originalPrice}`}
            </div>
            <div className="text-sm text-[#ff3e3e]/80 font-digital">
              Max Duration: {agent.maxCallDuration / 60} min
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <div className="text-white font-digital text-sm mb-2">
            ROAST LANGUAGE
          </div>
          <div className="text-[#00ff87] font-digital">
            {language === "HINDI" ? "हिंदी (Hindi)" : "English"}
          </div>
        </div>

        {/* Roast Intensity Slider */}
        <div className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-[#ff3e3e]" />
            <span className="text-white font-digital text-sm">
              ROAST INTENSITY
            </span>
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
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
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
            <div>
              <span className="text-white font-digital text-sm">
                I NEED THE CALL RECORDING
              </span>
              <div className="text-[#ff3e3e]/60 text-xs font-digital"></div>
            </div>
          </label>
        </div>

        {/* Discount Button - Only show if not used before and not free */}
        {agent.pricePerCall !== "FREE" && !discountApplied && !discountUsed && (
          <motion.button
            onClick={handleApplyDiscount}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-3 py-2 px-4 rounded font-bold
                      bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30
                      hover:bg-[#00ff87]/30 transition-all duration-200
                      font-digital tracking-wide text-sm
                      flex items-center justify-center gap-2"
          >
            APPLY 20% DISCOUNT
          </motion.button>
        )}

        {/* Discount Timer Section */}
        {discountApplied && timeLeft > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#00ff87] font-digital text-sm">
                LIMITED TIME OFFER
              </div>
              <div className="text-white font-digital bg-black/40 px-2 py-0.5 rounded">
                {timeLeft}s remaining
              </div>
            </div>
            <div className="relative w-full h-1 bg-[#ff3e3e]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 30, ease: "linear" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff87] to-[#00ff87]/50"
              />
            </div>
          </div>
        )}

        {/* Deploy Button with Pulsing Text */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            onConfirm({
              intensity,
              recording: includeRecording,
              language,
            })
          }
          className="relative w-full py-2 px-4 rounded font-bold
                   bg-[#ff3e3e] hover:bg-[#ff5555] text-white
                   transform transition-all duration-200 
                   border-b-4 border-[#cc0000]
                   hover:border-b-2 hover:translate-y-[2px]
                   font-digital tracking-wide text-sm
                   flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          <motion.span
            animate={
              discountApplied && timeLeft > 0
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {agent.pricePerCall === "FREE"
              ? "DEPLOY FREE"
              : `DEPLOY NOW • ₹${
                  discountApplied && timeLeft > 0 ? total : originalPrice
                }`}
          </motion.span>
        </motion.button>

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
                  ₹{savings}
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
