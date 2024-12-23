import React, { useState } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, User, DollarSign, Volume2, VolumeX } from "lucide-react"

interface CallSummaryProps {
  callDetails: any
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const AudioPlayer = React.memo(
  ({
    callDetails,
    audioRef,
    isPlaying,
    setIsPlaying,
  }: {
    callDetails: any
    audioRef: React.RefObject<HTMLAudioElement>
    isPlaying: boolean
    setIsPlaying: (playing: boolean) => void
  }) => {
    const [error, setError] = useState<string | null>(null)

    const handlePlay = async () => {
      try {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
          } else {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true)
                  setError(null)
                })
                .catch(err => {
                  console.error("Playback error:", err)
                  setError("Failed to play recording")
                })
            }
          }
        }
      } catch (err) {
        console.error("Audio player error:", err)
        setError("Failed to play recording")
      }
    }

    if (!callDetails?.recording_url) return null

    return (
      <motion.div className="mt-6">
        <audio
          ref={audioRef}
          src={callDetails.recording_url}
          onEnded={() => setIsPlaying(false)}
          onError={() => setError("Failed to load recording")}
        />
        <button
          onClick={handlePlay}
          className="w-full bg-black/40 hover:bg-black/60 
                 flex items-center justify-center gap-3 p-4 rounded-lg
                 border border-[#ff3e3e]/20 transition-all duration-200"
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity }}
            >
              <VolumeX size={24} className="text-[#ff3e3e]" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity }}
            >
              <Volume2 size={24} className="text-[#ff3e3e]" />
            </motion.div>
          )}
          <span className="font-digital text-lg">
            {error || (isPlaying ? "STOP PLAYBACK" : "PLAY MISSION RECORDING")}
          </span>
        </button>
      </motion.div>
    )
  }
)

const CallSummary: React.FC<CallSummaryProps> = ({
  callDetails,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  if (!callDetails) return null

  const stats = [
    {
      label: "Mission Duration",
      value: `${callDetails.corrected_duration}s`,
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "Target Location",
      value: `${callDetails.variables?.city || "Unknown"}, ${
        callDetails.variables?.state || "Unknown"
      }`,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      label: "Target Response",
      value: callDetails.answered_by === "human" ? "HUMAN" : "VOICEMAIL",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Mission Cost",
      value: `$${Number(callDetails.price).toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5" />,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 p-4 rounded-lg border border-[#ff3e3e]/20"
          >
            <div className="flex items-center gap-2 mb-2 text-[#ff3e3e]">
              {stat.icon}
              <span className="text-xs">{stat.label}</span>
            </div>
            <p className="text-xl font-digital text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>
      <AudioPlayer
        callDetails={callDetails}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </motion.div>
  )
}

export default CallSummary
