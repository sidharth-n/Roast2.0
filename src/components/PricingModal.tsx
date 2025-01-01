import React, { useState } from "react"
import { motion } from "framer-motion"
import { Play, Square, Star } from "lucide-react"

interface Agent {
  name: string
  codename: string
  pricePerCall: string | number
  icon: string
  voiceSample: string
  roastLevel: string
  description: string
  buttonText: string
  gender: "FEMALE"
  globalRank: string
  popular?: boolean
  attractiveness: string
  maxCallDuration: number
}

interface PricingModalProps {
  onClose: () => void
  onSelectPlan: (agent: Agent) => void
}

const PricingModal: React.FC<PricingModalProps> = ({
  onClose,
  onSelectPlan,
}) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const playVoiceSample = (agent: Agent) => {
    const audio = document.getElementById("voice-sample") as HTMLAudioElement
    const bgMusic = document.getElementById("bg-music") as HTMLAudioElement

    if (playingAudio === agent.codename) {
      // Stop sample playback
      audio.pause()
      audio.currentTime = 0
      setPlayingAudio(null)

      // Restore background music volume
      if (bgMusic) {
        bgMusic.volume = 1
      }
    } else {
      if (playingAudio) {
        audio.pause()
        audio.currentTime = 0
      }

      // Lower background music volume
      if (bgMusic) {
        bgMusic.volume = 0.2
      }

      // Play voice sample using agent's name
      const voiceFile = agent.name.toLowerCase().replace("agent ", "")
      audio.src = `/voices/${voiceFile}.mp3`
      audio
        .play()
        .then(() => {
          setPlayingAudio(agent.codename)
        })
        .catch(error => {
          console.error("Error playing audio:", error)
          setPlayingAudio(null)
          // Restore volume if play fails
          if (bgMusic) {
            bgMusic.volume = 1
          }
        })

      // Restore background music volume when sample ends
      audio.onended = () => {
        setPlayingAudio(null)
        if (bgMusic) {
          bgMusic.volume = 1
        }
      }
    }
  }

  const agents: Agent[] = [
    {
      name: "AGENT ROXY",
      codename: "ROOKIE",
      pricePerCall: "FREE",
      icon: "/images/agent-basic.png",
      voiceSample: "/voices/roxy.mp3",
      roastLevel: "Basic",
      description: "Perfect for first-time roasts",
      buttonText: "DEPLOY FREE",
      gender: "FEMALE",
      globalRank: "#102",
      attractiveness: "4/10",
      maxCallDuration: 60, // 1 minute
    },
    {
      name: "AGENT JADE",
      codename: "HITMAN",
      pricePerCall: 1,
      icon: "/images/agent-pro.png",
      voiceSample: "/voices/jade.mp3",
      roastLevel: "Spicy",
      description: "Professional roasting specialist",
      buttonText: "DEPLOY AGENT",
      gender: "FEMALE",
      globalRank: "#34",
      attractiveness: "6/10",
      maxCallDuration: 90, // 1.5 minutes
    },
    {
      name: "AGENT LUNA",
      codename: "ASSASSIN",
      pricePerCall: 1,
      icon: "/images/agent-elite.png",
      voiceSample: "/voices/luna.mp3",
      roastLevel: "Extra Hot",
      description: "Elite-tier destruction",
      buttonText: "DEPLOY AGENT",
      gender: "FEMALE",
      globalRank: "#6",
      popular: true,
      attractiveness: "8/10",
      maxCallDuration: 120, // 2 minutes
    },
    {
      name: "AGENT NOVA",
      codename: "TERMINATOR",
      pricePerCall: 1,
      icon: "/images/agent-legend.png",
      voiceSample: "/voices/nova.mp3",
      roastLevel: "Inferno",
      description: "Maximum carnage",
      buttonText: "DEPLOY AGENT",
      gender: "FEMALE",
      globalRank: "#1",
      attractiveness: "10/10",
      maxCallDuration: 150, // 2.5 minutes
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 py-6">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl title-font text-[#fffbfb] mb-2 text-center font-digital">
            SELECT YOUR AGENT
          </h2>
          <div className="w-24 h-1 bg-[#ff3e3e] mx-auto"></div>
        </div>

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
                       rounded-lg p-4 backdrop-blur-sm
                       ${agent.popular ? "shadow-lg shadow-[#ff3e3e]/30" : ""}`}
            >
              {agent.popular && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                  className="absolute -top-3 -right-3 bg-[#ff3e3e] text-white 
                         px-2 py-1 rounded-full text-sm font-digital"
                >
                  MOST DEPLOYED
                </motion.div>
              )}

              <div className="flex items-start gap-4 mb-3">
                <div className="relative">
                  <img
                    src={agent.icon}
                    alt={agent.name}
                    className="w-20 h-20 rounded border-2 border-[#ff3e3e]/30 object-cover"
                  />
                  <button
                    onClick={() => playVoiceSample(agent)}
                    className="absolute -bottom-1 -right-1 
                            bg-black/60 border border-[#ff3e3e]/80 rounded-full 
                            hover:bg-black/80 hover:border-[#ff3e3e] transition-all p-2"
                  >
                    {playingAudio === agent.codename ? (
                      <Square className="w-3 h-3 text-[#ff3e3e]" />
                    ) : (
                      <Play className="w-4 h-4 text-[#ff3e3e]" />
                    )}
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white font-digital">
                        {agent.name}
                      </h3>
                      <div className="text-2xl text-[#ff3e3e] font-bold mt-1">
                        {agent.pricePerCall === "FREE"
                          ? "FREE"
                          : `₹${agent.pricePerCall}/call`}
                      </div>
                      <div className="text-sm text-[#ff3e3e]/80 font-digital">
                        Max Duration: {agent.maxCallDuration / 60} min
                      </div>
                    </div>
                    <div className="text-[#00ff87] font-digital text-lg">
                      {agent.globalRank}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="bg-black/40 px-2 py-1 rounded border border-[#ff3e3e]/20">
                      <span className="text-gray-400">RATING:</span>{" "}
                      <span className="text-white font-digital">
                        {agent.attractiveness}
                      </span>
                    </div>
                    <div className="bg-black/40 px-2 py-1 rounded border border-[#ff3e3e]/20">
                      <span className="text-gray-400">LEVEL:</span>{" "}
                      <span className="text-white font-digital">
                        {agent.roastLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 px-3 py-2 rounded border border-[#ff3e3e]/20 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#ff3e3e]" />
                  <div className="text-[#00ff87] text-sm font-digital flex-1">
                    {agent.description}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => onSelectPlan(agent)}
                className={`w-full py-2 px-4 rounded font-bold
                        transform transition-all duration-200 
                        border-b-4 hover:border-b-2 hover:translate-y-[2px]
                        font-digital tracking-wide text-sm
                        ${
                          agent.popular
                            ? "bg-[#ff3a3a] hover:bg-[#ff5555] border-[#cc0000] text-white"
                            : "bg-[#ff3a3a] hover:bg-[#ff5555] border-[#cc0000] text-white"
                        }`}
              >
                {agent.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <audio id="voice-sample" className="hidden" />

        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-white/50 hover:text-white 
                   transition-colors text-2xl"
        >
          ✕
        </button>
      </div>
    </motion.div>
  )
}

export default PricingModal
