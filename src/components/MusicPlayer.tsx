import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { Volume2, VolumeX } from "lucide-react"

interface MusicPlayerProps {
  audioUrl: string
  autoPlay?: boolean
  onSoundToggle: (isEnabled: boolean) => void
}

export interface MusicPlayerHandle {
  setVolume: (volume: number) => void
}

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ audioUrl, autoPlay, onSoundToggle }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const setVolume = (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume
      }
    }

    useEffect(() => {
      if (autoPlay && audioRef.current) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
        setIsPlaying(true)
        onSoundToggle(true)
      }
    }, [autoPlay, onSoundToggle])

    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
          onSoundToggle(false)
        } else {
          audioRef.current.play()
          onSoundToggle(true)
        }
        setIsPlaying(!isPlaying)
      }
    }

    useImperativeHandle(ref, () => ({
      setVolume,
    }))

    return (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <audio id="bg-music" ref={audioRef} src={audioUrl} loop />
        <button
          onClick={togglePlay}
          className="bg-[#ff3e3e] hover:bg-[#ff5555] w-10 h-10 rounded-full 
                 flex items-center justify-center
                 shadow-lg hover:shadow-red-600/50 transition-all duration-200
                 border-2 border-[#ff3e3e]/30 hover:border-[#ff3e3e]"
        >
          {isPlaying ? (
            <Volume2 className="text-white" size={18} />
          ) : (
            <VolumeX className="text-white" size={18} />
          )}
        </button>
      </div>
    )
  }
)

MusicPlayer.displayName = "MusicPlayer"

export default MusicPlayer
