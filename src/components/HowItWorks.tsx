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
      className="bg-black/90 border-2 border-[#ff3e3e]/30 rounded-lg p-6 
                max-w-md w-full max-h-[70vh] flex flex-col
                shadow-lg shadow-[#ff3e3e]/20"
    >
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl text-white tracking-wide pricedown-font">
          How It Works
        </h2>
        <div className="w-16 h-1 bg-[#ff3e3e] mx-auto"></div>
      </div>

      <div className="space-y-6 text-gray-300 overflow-y-auto flex-1 pr-2">
        <div>
          <h3 className="text-white font-bold font-digital tracking-wider mb-2">
            AI-POWERED ROASTING AGENT
          </h3>
          <p className="text-gray-400">
            Our AI agent calls your friends and roasts them based on the details
            you provide.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-[#ff3e3e] font-digital tracking-wider">
            MISSION STEPS
          </h3>
          <ol className="list-decimal list-inside space-y-2 ml-2 text-gray-400">
            <li>Enter your name</li>
            <li>Enter target's name</li>
            <li>Provide their job</li>
            <li>Add fun facts about them</li>
            <li>Enter their phone number</li>
            <li>Click "ROAST NOW" and confirm</li>
          </ol>
        </div>

        <div className="bg-[#ff3e3e]/10 border border-[#ff3e3e]/20 p-4 rounded-lg">
          <h3 className="text-[#ff3e3e] font-digital tracking-wider mb-2">
            MISSION BRIEFING
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
            <li>Avoid explicit/harmful content</li>
            <li>Calls come from US numbers</li>
            <li>Credits are non-refundable</li>
            <li>Target must answer for successful roast</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500">
          By using this service, you accept responsibility for the content as
          per our terms and privacy policy.
        </div>
      </div>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#ff3e3e] hover:bg-[#ff5555] text-white py-3 
                 rounded-lg text-lg font-bold mt-6
                 transform transition-all duration-200 
                 border-b-4 border-[#cc0000]
                 hover:border-b-2 hover:translate-y-[2px]
                 font-digital tracking-wide"
      >
        CLOSE BRIEFING
      </motion.button>
    </motion.div>
  </motion.div>
)

export default HowItWorks
