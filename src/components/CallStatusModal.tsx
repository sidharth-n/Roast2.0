import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  CheckCircle,
  Target,
  Skull,
  Sparkles,
} from "lucide-react"
import CallSummary from "./CallSummary"

interface CallStatusModalProps {
  isVisible: boolean
  currentCallId: string | null
  onClose: () => void
}

const STATUS_MESSAGES = {
  queued: {
    title: "AGENT DEPLOYMENT",
    description: "Initializing roast protocols...",
    color: "text-yellow-500",
  },
  ringing: {
    title: "TARGET ACQUIRED",
    description: "Establishing neural connection...",
    color: "text-orange-500",
  },
  "in-progress": {
    title: "ROAST ENGAGED",
    description: "Executing savage protocol...",
    color: "text-green-500",
  },
  completed: {
    title: "MISSION ACCOMPLISHED",
    description: "Target successfully demolished!",
    color: "text-[#ff3e3e]",
  },
}

const CallStatusModal: React.FC<CallStatusModalProps> = ({
  isVisible,
  currentCallId,
  onClose,
}) => {
  const [callTime, setCallTime] = useState(0)
  const [callDetails, setCallDetails] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()
  const statusCheckRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!isVisible || !currentCallId) return

    const checkCallStatus = async () => {
      try {
        const response = await fetch(
          `https://roast-call-proxy.vercel.app/proxy/call?callId=${currentCallId}`
        )
        const data = await response.json()
        console.log("Recording URL:", data.recording_url) // Debug recording URL
        console.log("Call status data:", data) // Debug log

        if (!hasCompletedOnce) {
          setCallDetails(data)

          if (data.status === "completed") {
            setHasCompletedOnce(true)
            if (timerRef.current) clearInterval(timerRef.current)
            if (statusCheckRef.current) clearInterval(statusCheckRef.current)
          } else if (data.status === "in-progress" && !timerRef.current) {
            startTimer()
          }
        }
      } catch (error) {
        console.error("Error fetching call status:", error)
      }
    }

    const intervalId = setInterval(checkCallStatus, 1000)
    statusCheckRef.current = intervalId
    checkCallStatus() // Initial check

    return () => {
      clearInterval(intervalId)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isVisible, currentCallId, hasCompletedOnce])

  const startTimer = () => {
    if (timerRef.current) return
    setCallTime(0)
    timerRef.current = setInterval(() => {
      setCallTime(prev => prev + 1)
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusIcon = () => {
    switch (callDetails?.status) {
      case "queued":
        return (
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity },
            }}
          >
            <Target className="w-12 h-12 text-yellow-500" />
          </motion.div>
        )
      case "ringing":
        return (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            <PhoneIncoming className="w-12 h-12 text-orange-500" />
          </motion.div>
        )
      case "in-progress":
        return (
          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Skull className="w-12 h-12 text-green-500" />
          </motion.div>
        )
      case "completed":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: [1.5, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-12 h-12 text-[#ff3e3e]" />
          </motion.div>
        )
      default:
        return <Target className="w-12 h-12 text-gray-500" />
    }
  }

  const getStatusMessage = () => {
    return (
      STATUS_MESSAGES[callDetails?.status as keyof typeof STATUS_MESSAGES]
        ?.title || "CONNECTING..."
    )
  }

  const getStatusDescription = () => {
    return (
      STATUS_MESSAGES[callDetails?.status as keyof typeof STATUS_MESSAGES]
        ?.description || "Please wait..."
    )
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (statusCheckRef.current) clearInterval(statusCheckRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
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
                     max-w-md w-full p-6 relative shadow-lg shadow-[#ff3e3e]/20"
          >
            <div className="text-center mb-8">
              <div className="mb-6">
                <motion.div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-[#ff3e3e]/10 rounded-full animate-ping-slow"></div>
                  <div
                    className="relative z-10 w-full h-full rounded-full 
                                bg-black/50 border-2 border-[#ff3e3e]/30
                                flex items-center justify-center"
                  >
                    {getStatusIcon()}
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2 font-digital tracking-wide">
                  {getStatusMessage()}
                </h2>
                <p className="text-[#ff3e3e] text-sm tracking-wider font-digital">
                  {getStatusDescription()}
                </p>
              </div>

              {callDetails?.status === "in-progress" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl text-[#ff3e3e] font-digital mb-4"
                >
                  {formatTime(callTime)}
                </motion.div>
              )}

              {callDetails?.status === "completed" && (
                <CallSummary
                  callDetails={callDetails}
                  audioRef={audioRef}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              )}
            </div>

            {callDetails?.status === "completed" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#ff3e3e] to-[#ff5555] 
                         text-white py-4 px-6 rounded-lg text-lg font-bold
                         transform transition-all duration-200 
                         border-b-4 border-[#cc0000] shadow-lg
                         hover:shadow-[#ff3e3e]/50
                         font-digital tracking-wider"
              >
                START NEW MISSION
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CallStatusModal
