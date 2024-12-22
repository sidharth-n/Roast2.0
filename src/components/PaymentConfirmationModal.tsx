import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  ChevronDown,
  ChevronUp,
  Mic,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Star,
} from "lucide-react"
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
  const [timeLeft, setTimeLeft] = useState(60)
  const [offerApplied, setOfferApplied] = useState(false)
  const [extraMinutes, setExtraMinutes] = useState(0)
  const [roastLevel, setRoastLevel] = useState(agent.roastLevel)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  const basePrice = parseFloat(agent.price.replace("$", ""))
  const extraMinutesPrice = extraMinutes * 0.49
  const roastLevelPrice = roastLevel === "MAX" ? 0.5 : 0
  const recordingPrice = 2.99

  const subtotal = basePrice + extraMinutesPrice + roastLevelPrice
  const discountedPrice = offerApplied ? subtotal * 0.7 : subtotal
  const totalPrice = includeRecording
    ? discountedPrice + recordingPrice
    : discountedPrice
  const savings = offerApplied ? subtotal - discountedPrice : 0

  useEffect(() => {
    if (timeLeft > 0 && offerApplied) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, offerApplied])

  return (
    <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
      <motion.div
        className="bg-black/60 border-2 border-[#ff3e3e]/30 rounded-lg p-4 
                           max-w-sm w-full shadow-lg shadow-[#ff3e3e]/20 max-h-[95vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-white font-digital mb-3 text-center">
          CUSTOMIZE YOUR ROAST
        </h2>

        {/* Base Package - reduced padding */}
        <div className="bg-black/40 rounded-lg p-3 border border-[#ff3e3e]/20 mb-3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-white font-digital text-lg">
                {agent.name}
              </div>
              <div className="text-gray-400 text-sm">
                Base Duration: {agent.duration}min
              </div>
            </div>
            <div className="text-[#ff3e3e] font-digital text-lg">
              ${basePrice.toFixed(2)}
            </div>
          </div>

          {/* Duration Boost */}
          <div className="mt-4 pt-4 border-t border-[#ff3e3e]/20">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-digital flex items-center gap-2">
                <Clock className="w-4 h-4" />
                EXTEND TIME
              </div>
              {extraMinutes > 0 && (
                <div className="text-[#00ff87] text-sm font-digital">
                  +${extraMinutesPrice.toFixed(2)}
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map(mins => (
                <button
                  key={mins}
                  onClick={() => setExtraMinutes(mins)}
                  className={`py-2 px-1 rounded font-digital text-sm
                           ${
                             extraMinutes === mins
                               ? "bg-[#00ff87] text-black"
                               : "bg-[#ff3e3e]/20 text-gray-300 hover:bg-[#ff3e3e]/30"
                           } transition-colors`}
                >
                  +{mins * 0.5}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Add-ons - reduced spacing */}
        <div className="space-y-2 mb-3">
          {/* Recording Option */}
          <div
            onClick={() => setIncludeRecording(!includeRecording)}
            className={`relative bg-gradient-to-r rounded-lg p-4 cursor-pointer
                     ${
                       includeRecording
                         ? "from-[#00ff87]/20 to-black/40 border-[#00ff87]"
                         : "from-[#ff3e3e]/10 to-black/40 border-[#ff3e3e]/30"
                     } 
                     border-2 hover:bg-[#ff3e3e]/20 transition-all`}
          >
            <div className="absolute -top-2 -right-2">
              <span
                className="bg-[#00ff87] text-black text-xs px-2 py-1 rounded-full font-digital
                           flex items-center gap-1"
              >
                <Star className="w-3 h-3" /> POPULAR
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic
                  className={`w-6 h-6 ${
                    includeRecording ? "text-[#00ff87]" : "text-gray-500"
                  }`}
                />
                <div>
                  <div className="text-white font-digital">HD RECORDING</div>
                  <div className="text-sm text-gray-400">
                    Save your epic roast forever
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#00ff87] font-digital">+$2.99</div>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center
                              ${
                                includeRecording
                                  ? "bg-[#00ff87] border-[#00ff87]"
                                  : "border-gray-500"
                              }`}
                >
                  {includeRecording && <Check className="w-4 h-4 text-black" />}
                </div>
              </div>
            </div>
          </div>

          {/* Roast Level */}
          <div className="bg-black/40 rounded-lg p-4 border border-[#ff3e3e]/20">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-digital flex items-center gap-2">
                <Flame className="w-4 h-4" />
                INTENSITY
              </div>
              {roastLevel === "MAX" && (
                <div className="text-[#ff3e3e] text-sm font-digital">
                  +$0.50
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["LOW", "MEDIUM", "MAX"].map(level => (
                <button
                  key={level}
                  onClick={() => setRoastLevel(level)}
                  className={`py-2 px-3 rounded font-digital text-sm relative
                           ${
                             roastLevel === level
                               ? "bg-[#ff3e3e] text-white"
                               : "bg-[#ff3e3e]/20 text-gray-300 hover:bg-[#ff3e3e]/30"
                           } transition-colors`}
                >
                  {level}
                  {level === "MAX" && (
                    <span
                      className="absolute -top-2 -right-2 text-xs bg-[#ff3e3e] 
                                   px-1 rounded-full animate-pulse"
                    >
                      🔥
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coupon Section - tighter spacing */}
        {!offerApplied && timeLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#ff3e3e]/5 border-2 border-dashed border-[#ff3e3e]/30 
                     rounded-lg p-3 mb-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 bg-black/30 rounded px-3 py-2">
                <div className="text-[#ff3e3e] font-digital text-sm">
                  SPECIAL30
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOfferApplied(true)}
                className="bg-[#ff3e3e] px-4 py-2 rounded font-digital text-sm
                         hover:bg-[#ff5555] transition-colors whitespace-nowrap"
              >
                APPLY NOW
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Collapsible Price Breakdown */}
        <div className="bg-black/40 rounded-lg border border-[#ff3e3e]/20 mb-3">
          <button
            onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            className="w-full p-3 flex justify-between items-center"
          >
            <span className="text-white font-digital">TOTAL</span>
            <div className="text-right flex items-center gap-2">
              {offerApplied && (
                <div className="text-gray-500 line-through text-sm">
                  ${subtotal.toFixed(2)}
                </div>
              )}
              <div className="text-xl text-[#ff3e3e] font-bold font-digital">
                ${totalPrice.toFixed(2)}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transform transition-transform
                           ${showPriceBreakdown ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {showPriceBreakdown && (
            <div className="px-3 pb-3 space-y-2 border-t border-[#ff3e3e]/20 pt-2">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white">${basePrice.toFixed(2)}</span>
                </div>
                {extraMinutesPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Extra Time</span>
                    <span className="text-[#00ff87]">
                      +${extraMinutesPrice.toFixed(2)}
                    </span>
                  </div>
                )}
                {roastLevel === "MAX" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">MAX Intensity</span>
                    <span className="text-[#ff3e3e]">+$0.50</span>
                  </div>
                )}
                {includeRecording && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">HD Recording</span>
                    <span className="text-[#00ff87]">+$2.99</span>
                  </div>
                )}
                {offerApplied && (
                  <div className="flex justify-between text-sm text-[#00ff87] font-bold">
                    <span>DISCOUNT (30% OFF)</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Timer - reduced padding */}
        {offerApplied && (
          <div className="relative overflow-hidden rounded-lg mb-3">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 60, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-[#00ff87] to-[#60efff]
                        opacity-20"
            />
            <div
              className="bg-black/40 border border-[#ff3e3e]/30 py-2 px-4
                          text-center relative z-10"
            >
              <div className="font-digital text-lg">
                OFFER EXPIRES IN{" "}
                <span className="text-[#00ff87] font-bold">
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
                  {timeLeft % 60}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onConfirm(includeRecording)}
          className="w-full py-2.5 px-4 rounded-lg font-bold
                   bg-[#ff3e3e] hover:bg-[#ff5555] text-white
                   transform transition-all duration-200 
                   border-b-4 border-[#cc0000]
                   hover:border-b-2 hover:translate-y-[2px]
                   font-digital tracking-wide
                   flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          DEPLOY NOW • ${totalPrice.toFixed(2)}
        </motion.button>

        <button
          onClick={onClose}
          className="w-full text-gray-400 hover:text-white 
                   transition-colors py-2 mt-1 font-digital text-sm"
        >
          BACK
        </button>
      </motion.div>
    </motion.div>
  )
}

export default PaymentConfirmationModal
