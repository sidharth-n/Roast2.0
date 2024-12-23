import React from "react"
import { motion } from "framer-motion"
import {
  Timer,
  MapPin,
  Skull,
  Volume2,
  VolumeX,
  Sparkles,
  Target,
} from "lucide-react"

interface CallSummaryProps {
  callDetails: any
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const CallSummary: React.FC<CallSummaryProps> = ({
  callDetails,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  if (!callDetails) return null

  const stats = [
    {
      label: "Duration",
      value: `${callDetails.corrected_duration}s`,
      icon: <Timer className="w-4 h-4" />,
      color: "text-green-500",
    },
    {
      label: "Location",
      value: `${callDetails.variables?.city || "Unknown"}`,
      icon: <Target className="w-4 h-4" />,
      color: "text-yellow-500",
    },
    {
      label: "Terminated By",
      value: callDetails.call_ended_by === "ASSISTANT" ? "AGENT" : "TARGET",
      icon: <Skull className="w-4 h-4" />,
      color: "text-[#ff3e3e]",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {/* Mission Complete Banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-[#ff3e3e]/20 to-transparent
                 border border-[#ff3e3e]/30 rounded-lg p-2 mb-4"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ff3e3e]" />
          <span className="text-sm font-digital text-[#ff3e3e]">
            MISSION COMPLETE
          </span>
          <Sparkles className="w-4 h-4 text-[#ff3e3e]" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 p-3 rounded-lg border border-[#ff3e3e]/20"
          >
            <div
              className={`flex items-center justify-center gap-1 mb-1 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <p className="text-lg font-digital text-white text-center">
              {stat.value}
            </p>
            <p className="text-[10px] text-gray-500 text-center mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Audio Player */}
      {callDetails.recording_url && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <audio
            ref={audioRef}
            src={callDetails.recording_url}
            onEnded={() => setIsPlaying(false)}
          />
          <button
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause()
                } else {
                  audioRef.current.play()
                }
                setIsPlaying(!isPlaying)
              }
            }}
            className="w-full bg-black/40 hover:bg-black/60 
                     flex items-center justify-center gap-2 p-3 rounded-lg
                     border border-[#ff3e3e]/20 transition-all duration-200"
          >
            <motion.div
              animate={
                isPlaying
                  ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                  : { opacity: [0.7, 1, 0.7] }
              }
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {isPlaying ? (
                <VolumeX size={18} className="text-[#ff3e3e]" />
              ) : (
                <Volume2 size={18} className="text-[#ff3e3e]" />
              )}
            </motion.div>
            <span className="text-sm font-digital">
              {isPlaying ? "STOP RECORDING" : "PLAY RECORDING"}
            </span>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CallSummary
