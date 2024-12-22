import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface PaymentResultProps {
  success: boolean
  onClose: () => void
}

const PaymentResultModal = ({ success, onClose }: PaymentResultProps) => {
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
                  max-w-md w-full text-center"
      >
        {success ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2 font-digital">
              PAYMENT SUCCESSFUL
            </h2>
            <p className="text-gray-300 mb-6">
              Your agent is ready for deployment. Initiating roast sequence...
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-[#ff3e3e] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2 font-digital">
              PAYMENT FAILED
            </h2>
            <p className="text-gray-300 mb-6">
              Mission aborted. Please try again or select a different agent.
            </p>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className={`px-6 py-3 rounded-lg font-bold font-digital
                    transform transition-all duration-200 
                    border-b-4 hover:border-b-2 hover:translate-y-[2px]
                    ${
                      success
                        ? "bg-green-600 hover:bg-green-500 border-green-800"
                        : "bg-[#ff3e3e] hover:bg-[#ff5555] border-[#cc0000]"
                    }
                    text-white`}
        >
          {success ? "CONTINUE" : "TRY AGAIN"}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default PaymentResultModal
