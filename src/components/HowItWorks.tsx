import { motion } from "framer-motion"

interface HowItWorksProps {
  onClose: () => void
}

const HowItWorks = ({ onClose }: HowItWorksProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-black/90 border border-[#4C1CA1] rounded-lg p-6 max-w-md w-full max-h-[70vh] flex flex-col"
    >
      <h2 className="text-2xl text-[#FFD700] mb-4 font-bold">
        How Does It Work?
      </h2>

      <div className="space-y-4 text-gray-300 overflow-y-auto flex-1 pr-2">
        <p className="text-white font-semibold">AI-Powered Roasting Agent</p>
        <p>
          Our AI agent calls your friends and roasts them based on the details
          you provide.
        </p>

        <div className="space-y-2">
          <p className="text-[#FFD700] font-semibold">Step-by-Step Guide:</p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Enter your name</li>
            <li>Enter target's name</li>
            <li>Provide their job</li>
            <li>Add fun facts about them</li>
            <li>Enter their phone number</li>
            <li>Click "ROAST NOW" and confirm</li>
          </ol>
        </div>

        <div className="space-y-2">
          <p className="text-[#FFD700] font-semibold">Pricing:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Roast Call: $1 per call</li>
            <li>Call Recording: $2.99 (optional)</li>
          </ul>
        </div>

        <div className="bg-[#4C1CA1]/20 p-3 rounded-lg mt-4">
          <p className="text-sm">
            <span className="text-[#FFD700] font-semibold">
              Important Notes:
            </span>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Avoid explicit/harmful content</li>
              <li>Calls come from US numbers</li>
              <li>Credits are non-refundable</li>
              <li>Target must answer for successful roast</li>
            </ul>
          </p>
        </div>

        <div className="text-xs text-gray-400 mt-4">
          By using this service, you accept responsibility for the content as
          per our terms and privacy policy.
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-[#4C1CA1] hover:bg-[#5D2CB2] text-white py-3 rounded-md mt-6
                 transform hover:scale-105 transition-all duration-200"
      >
        I Understand
      </button>
    </motion.div>
  </motion.div>
)

export default HowItWorks
