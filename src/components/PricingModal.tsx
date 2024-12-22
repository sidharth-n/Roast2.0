import React, { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Flame, Play, Square, Mic } from "lucide-react"

interface Agent {
  name: string
  codename: string
  price: string
  duration: string
  roastLevel: string
  icon: string
  voiceSample: string
  description: string
  buttonText: string
  recording: boolean
  popular?: boolean
}

interface PricingModalProps {
  onClose: () => void
  onSelectPlan: (agent: Agent) => void
}

const PricingModal = ({ onClose, onSelectPlan }: PricingModalProps) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const agents = [
    {
      name: "AGENT DEMO",
      codename: "ROOKIE",
      price: "FREE",
      duration: "30s",
      icon: "images/agent-basic.png",
      voiceSample: "/audio/basic-agent.mp3",
      roastLevel: "Basic",
      description: "Perfect for test missions",
      buttonText: "TEST DEMO",
      color: "gray",
      recording: false,
    },
    {
      name: "AGENT SMITH",
      codename: "HITMAN",
      price: "$0.99",
      duration: "1.5m",
      icon: "/images/agent-pro.png",
      voiceSample: "/audio/pro-agent.mp3",
      roastLevel: "Spicy",
      description: "Professional roasting specialist",
      buttonText: "DEPLOY AGENT",
      color: "blue",
      recording: true,
    },
    {
      name: "AGENT ELI",
      codename: "ASSASSIN",
      price: "$2.99",
      duration: "3m",
      icon: "/images/agent-elite.png",
      voiceSample: "/audio/elite-agent.mp3",
      roastLevel: "Extra Hot",
      description: "Elite-tier destruction",
      buttonText: "ACTIVATE",
      color: "purple",
      recording: true,
      popular: true,
    },
    {
      name: "AGENT 007",
      codename: "TERMINATOR",
      price: "$4.99",
      duration: "5m",
      icon: "/images/agent-legend.png",
      voiceSample: "/audio/legendary-agent.mp3",
      roastLevel: "Inferno",
      description: "Maximum carnage",
      buttonText: "UNLEASH",
      color: "red",
      recording: true,
    },
  ]

  // ... playVoiceSample function remains same ...

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h2
            className="text-4xl title-font text-[#fffbfb] mb-4 text-center"
            style={{ zIndex: 100 }}
          >
            AGENTS LIST
          </h2>
          <p className="text-[#ff3e3e] text-lg tracking-[0.2em] uppercase font-digital">
            Choose Your Agent
          </p>
          <div className="w-24 h-1 bg-[#ff3e3e] mx-auto mt-2"></div>
        </div>

        {/* Agents */}
        <div className="max-w-md mx-auto space-y-4">
          {agents.map(agent => (
            <motion.div
              key={agent.name}
              whileTap={{ scale: 0.98 }}
              className={`relative bg-black/60 border-2 
                         ${
                           agent.popular
                             ? "border-[#ff3e3e]"
                             : "border-[#ff3e3e]/30"
                         } 
                         rounded-lg p-4
                         ${
                           agent.popular ? "shadow-lg shadow-[#ff3e3e]/30" : ""
                         }`}
            >
              {/* Agent Header with Voice Button */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={agent.icon}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full border-2 border-[#ff3e3e]/30"
                  />
                  <button
                    onClick={() => playVoiceSample(agent.voiceSample)}
                    className="absolute -bottom-1 -right-1 p-1.5 
                              bg-[#ff3e3e] rounded-full 
                              hover:bg-[#ff5555] transition-colors"
                  >
                    {playingAudio === agent.voiceSample ? (
                      <Square className="w-3 h-3 text-white" />
                    ) : (
                      <Play className="w-3 h-3 text-white" />
                    )}
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-digital">
                    {agent.name}
                  </h3>
                  <div className="text-2xl text-[#ff3e3e] font-bold mt-1">
                    {agent.price}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mt-4 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="w-4 h-4 text-[#ff3e3e] mr-2" />
                  Max Call Duration: {agent.duration}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Flame className="w-4 h-4 text-[#ff3e3e] mr-2" />
                  Roast Level: {agent.roastLevel}
                </div>
                <div className="flex items-center text-sm">
                  <Mic
                    className={`w-4 h-4 mr-2 ${
                      agent.recording ? "text-[#ff3e3e]" : "text-gray-600"
                    }`}
                  />
                  <span
                    className={
                      agent.recording ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    {agent.recording
                      ? "Call Recording Available"
                      : "No Call Recording"}
                  </span>
                </div>
              </div>

              {/* Action Button - Updated styling */}
              <motion.button
                onClick={() => onSelectPlan(agent)}
                className={`w-full py-2 px-4 rounded font-bold
                          transform transition-all duration-200 
                          border-b-4 hover:border-b-2 hover:translate-y-[2px]
                          font-digital tracking-wide text-sm
                          ${
                            agent.popular
                              ? "bg-[#ff3e3e] hover:bg-[#ff5555] border-[#cc0000] text-white"
                              : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                          }`}
              >
                {agent.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Audio Element */}
        <audio id="voice-sample" className="hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-white/50 hover:text-white 
                   transition-colors"
        >
          ✕
        </button>

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 mt-6 px-4">
          Prices in USD. Free trial limited to self-calls only. Each agent has
          their unique roasting style and voice.
        </div>
      </div>
    </motion.div>
  )
}

export default PricingModal
