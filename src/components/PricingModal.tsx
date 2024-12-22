import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Square, Star } from "lucide-react"

interface Agent {
  name: string
  codename: string
  pricePerMinute: number
  icon: string
  voiceSample: string
  roastLevel: string
  description: string
  buttonText: string
  gender: "MALE" | "FEMALE"
  globalRank: string
  popular?: boolean
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

  // Initialize roast counts with Eli (ASSASSIN) having highest
  const [roastCounts, setRoastCounts] = useState({
    ROOKIE: 1247,
    HITMAN: 14582,
    ASSASSIN: 32671, // Eli starts with highest
    TERMINATOR: 28914,
  })

  // Simulate live roast count updates with Eli increasing faster
  useEffect(() => {
    const interval = setInterval(() => {
      setRoastCounts(prev => ({
        ...prev,
        ROOKIE: prev.ROOKIE + Math.floor(Math.random() * 2),
        HITMAN: prev.HITMAN + Math.floor(Math.random() * 4),
        ASSASSIN: prev.ASSASSIN + Math.floor(Math.random() * 8), // Fastest increase
        TERMINATOR: prev.TERMINATOR + Math.floor(Math.random() * 5),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const playVoiceSample = (sampleUrl: string) => {
    const audio = document.getElementById("voice-sample") as HTMLAudioElement

    if (playingAudio === sampleUrl) {
      audio.pause()
      audio.currentTime = 0
      setPlayingAudio(null)
    } else {
      if (playingAudio) {
        audio.pause()
        audio.currentTime = 0
      }

      audio.src = sampleUrl
      audio
        .play()
        .then(() => {
          setPlayingAudio(sampleUrl)
        })
        .catch(error => {
          console.error("Error playing audio:", error)
          setPlayingAudio(null)
        })

      audio.onended = () => {
        setPlayingAudio(null)
      }
    }
  }

  const agents: Agent[] = [
    {
      name: "AGENT NEWBIE",
      codename: "ROOKIE",
      pricePerMinute: 0.49,
      icon: "/images/agent-basic.png",
      voiceSample: "/audio/basic-agent.mp3",
      roastLevel: "Basic",
      description: "Perfect for first-time roasts",
      buttonText: "DEPLOY AGENT",
      gender: "MALE",
      globalRank: "#102",
    },
    {
      name: "AGENT SMITH",
      codename: "HITMAN",
      pricePerMinute: 0.99,
      icon: "/images/agent-pro.png",
      voiceSample: "/audio/pro-agent.mp3",
      roastLevel: "Spicy",
      description: "Professional roasting specialist",
      buttonText: "DEPLOY AGENT",
      gender: "MALE",
      globalRank: "#34",
    },
    {
      name: "AGENT ELI",
      codename: "ASSASSIN",
      pricePerMinute: 1.99,
      icon: "/images/agent-elite.png",
      voiceSample: "/audio/elite-agent.mp3",
      roastLevel: "Extra Hot",
      description: "Elite-tier destruction",
      buttonText: "DEPLOY AGENT",
      gender: "FEMALE",
      globalRank: "#6",
      popular: true,
    },
    {
      name: "AGENT 007",
      codename: "TERMINATOR",
      pricePerMinute: 2.99,
      icon: "/images/agent-legend.png",
      voiceSample: "/audio/legendary-agent.mp3",
      roastLevel: "Inferno",
      description: "Maximum carnage",
      buttonText: "DEPLOY AGENT",
      gender: "FEMALE",
      globalRank: "#1",
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
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white font-digital">
                        {agent.name}
                      </h3>
                      <div className="text-2xl text-[#ff3e3e] font-bold mt-1">
                        ${agent.pricePerMinute.toFixed(2)}/min
                      </div>
                    </div>
                    <div className="text-[#00ff87] font-digital text-lg">
                      {agent.globalRank}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="bg-black/40 px-2 py-1 rounded border border-[#ff3e3e]/20">
                      <span className="text-gray-400">GENDER:</span>{" "}
                      <span className="text-white font-digital">
                        {agent.gender}
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
                    {roastCounts[
                      agent.codename as keyof typeof roastCounts
                    ].toLocaleString()}{" "}
                    Roasts Delivered
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
                            ? "bg-[#ff3e3e] hover:bg-[#ff5555] border-[#cc0000] text-white"
                            : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                        }`}
              >
                DEPLOY AGENT
              </motion.button>
            </motion.div>
          ))}
        </div>

        <audio id="voice-sample" className="hidden" />

        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-white/50 hover:text-white 
                   transition-colors"
        >
          ✕
        </button>

        <div className="text-center text-xs text-gray-500 mt-6 px-4">
          Prices shown per minute. Configure duration and intensity in next
          step.
        </div>
      </div>
    </motion.div>
  )
}

export default PricingModal
