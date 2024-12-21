import React, { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface MusicPlayerProps {
  audioUrl: string
  autoPlay?: boolean
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl, autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle autoplay failure
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <audio ref={audioRef} src={audioUrl} loop />
      <button
        onClick={togglePlay}
        className="bg-[#ff3e3e] hover:bg-[#ff5555] w-12 h-12 rounded-full flex items-center justify-center
                 shadow-lg hover:shadow-red-600/50 transition-all duration-200"
      >
        {isPlaying ? (
          <Volume2 className="text-white" size={24} />
        ) : (
          <VolumeX className="text-white" size={24} />
        )}
      </button>
    </div>
  )
}

export default MusicPlayer
