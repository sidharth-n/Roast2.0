import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface PaymentResultModalProps {
  success: boolean
  onClose: () => void
  buttonText: string
}

const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  success,
  onClose,
  buttonText,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 
                flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1a1a1a] border-2 border-[#ff3e3e]/30 rounded-lg 
                 max-w-md w-full p-6 relative"
      >
        <div className="text-center mb-6">
          <div className="mb-4">
            {success ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {success ? "Payment Successful!" : "Payment Failed"}
          </h2>
          <p className="text-gray-400">
            {success
              ? "Your agent is ready to roast! Click below to start the call."
              : "Please try again or contact support."}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full bg-[#ff3e3e] hover:bg-[#ff5555] text-white 
                   py-3 px-6 rounded-lg text-lg font-bold
                   transform transition-all duration-200 
                   border-b-4 border-[#cc0000]
                   hover:border-b-2 hover:translate-y-[2px]
                   flex items-center justify-center gap-2"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default PaymentResultModal
