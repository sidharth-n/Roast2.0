import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Timer,
  Skull,
  Share2,
  Copy,
  PlayCircle,
  PauseCircle,
  Loader,
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
  const [recordingAvailable, setRecordingAvailable] = useState(false)
  const [isCheckingRecording, setIsCheckingRecording] = useState(true)

  // Check for recording availability
  useEffect(() => {
    const checkRecording = async () => {
      if (!callDetails.recording_url) {
        const checkInterval = setInterval(async () => {
          try {
            const response = await fetch(
              `https://roast-call-proxy.vercel.app/proxy/call?callId=${callDetails.call_id}`
            )
            const data = await response.json()
            console.log("Checking recording URL:", data.recording_url)
            if (data.recording_url) {
              setRecordingAvailable(true)
              setIsCheckingRecording(false)
              clearInterval(checkInterval)
            }
          } catch (error) {
            console.error("Error checking recording:", error)
          }
        }, 2000) // Check every 2 seconds

        // Clear interval after 30 seconds
        setTimeout(() => {
          clearInterval(checkInterval)
          setIsCheckingRecording(false)
        }, 30000)

        return () => clearInterval(checkInterval)
      } else {
        setRecordingAvailable(true)
        setIsCheckingRecording(false)
      }
    }

    checkRecording()
  }, [callDetails])

  const shareRoast = () => {
    const shareText = `🔥 Check out this hilarious roast call! Listen here: ${callDetails.recording_url}\n\nMake your own roast calls at roastyourfriend.com 😈`

    if (navigator.share) {
      // Mobile sharing
      navigator
        .share({
          text: shareText,
          url: "https://roastyourfriend.com",
        })
        .catch(console.error)
    } else {
      // Copy to clipboard for desktop
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert("Share text copied to clipboard!"))
        .catch(console.error)
    }
  }

  const stats = [
    {
      label: "Duration",
      value: `${callDetails.corrected_duration}s`,
      icon: <Timer className="w-4 h-4" />,
      color: "text-green-500",
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
          <span className="text-sm font-digital text-[#ff3e3e]">
            MISSION SUMMARY
          </span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
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
              <p className="text-[10px] text-gray-500 text-center mt-1">
                {stat.label}
              </p>
              {stat.icon}
            </div>
            <p className="text-lg font-digital text-white text-center">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Audio Player and Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 space-y-2"
      >
        {isCheckingRecording ? (
          <div className="flex items-center justify-center gap-2 text-[#ff3e3e] py-3">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm font-digital">
              RETRIEVING ROAST AUDIO...
            </span>
          </div>
        ) : recordingAvailable ? (
          <>
            <audio
              ref={audioRef}
              src={callDetails.recording_url}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                className="flex-1 bg-black/40 hover:bg-black/60 
                         flex items-center justify-center gap-2 p-3 rounded-lg
                         border border-[#ff3e3e]/20"
              >
                {isPlaying ? (
                  <PauseCircle className="w-5 h-5 text-[#ff3e3e]" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-[#ff3e3e]" />
                )}
                <span className="text-sm font-digital">
                  {isPlaying ? "PAUSE" : "PLAY ROAST"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareRoast}
                className="flex-1 bg-black/40 hover:bg-black/60 
                         flex items-center justify-center gap-2 p-3 rounded-lg
                         border border-[#ff3e3e]/20"
              >
                {navigator.share ? (
                  <Share2 className="w-5 h-5 text-[#ff3e3e]" />
                ) : (
                  <Copy className="w-5 h-5 text-[#ff3e3e]" />
                )}
                <span className="text-sm font-digital">
                  {navigator.share ? "SHARE" : "COPY LINK"}
                </span>
              </motion.button>
            </div>
          </>
        ) : (
          <div className="text-center text-[#ff3e3e] text-sm font-digital py-3">
            ROAST AUDIO UNAVAILABLE
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CallSummary
