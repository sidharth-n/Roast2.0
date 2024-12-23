import React, { useState, useEffect, useRef } from "react"
import {
  Skull,
  ChevronRight,
  Star,
  Trophy,
  Users,
  ChevronLeft,
  ChevronDown,
} from "lucide-react"
import Footer from "./components/Footer"
import MusicPlayer from "./components/MusicPlayer"
import ConsentModal from "./components/ConsentModal"
import RoastForm from "./components/RoastForm"
import RoastNotification from "./components/RoastNotification"
import FAQ from "./components/FAQ"
import WarningSection from "./components/WarningSection"
import SampleSection from "./components/SampleSection"
import HeroAwards from "./components/HeroAwards"
import { BACKGROUND_IMAGES } from "./config/images"
import HowItWorks from "./components/HowItWorks"
import BackToTop from "./components/BackToTop"
import PricingModal from "./components/PricingModal"
import PaymentConfirmationModal from "./components/PaymentConfirmationModal"
import PaymentResultModal from "./components/PaymentResultModal"
import CallStatusModal from "./components/CallStatusModal"

import {
  INITIAL_ROAST_COUNT,
  NOTIFICATION_DURATION,
  NOTIFICATION_INTERVAL,
  AUDIO_URL,
} from "./config/constants"
import { getRandomName } from "./utils/names"
import { motion, AnimatePresence } from "framer-motion"

interface RoastFormData {
  yourName: string
  targetName: string
  targetJob: string
  funFacts: string
  phone: string
  countryCode: string
}

function App() {
  const [roastCount, setRoastCount] = useState(1337)
  const [notification, setNotification] = useState<{
    roaster: string
    target: string
  } | null>(null)
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentFormData, setCurrentFormData] = useState<RoastFormData | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [showMusicModal, setShowMusicModal] = useState(true)
  const [isMusicEnabled, setIsMusicEnabled] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [showWelcomeText, setShowWelcomeText] = useState(false)
  const [isStatsPanelVisible, setIsStatsPanelVisible] = useState(true)
  const [shouldAutoHide, setShouldAutoHide] = useState(true)
  const notificationSound = useRef<HTMLAudioElement | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showPaymentResult, setShowPaymentResult] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const [showCallStatus, setShowCallStatus] = useState(false)
  const [currentCallId, setCurrentCallId] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowLoadingScreen(false)
            setShowWelcomeText(true)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const musicPreference = localStorage.getItem("musicPreference")
    if (musicPreference === "enabled") {
      setIsMusicEnabled(true)
      setShowMusicModal(false)
    } else if (musicPreference === "disabled") {
      setShowMusicModal(false)
    }
  }, [])

  const handleMusicChoice = (choice: boolean) => {
    setIsMusicEnabled(choice)
    setIsSoundEnabled(choice)
    localStorage.setItem("musicPreference", choice ? "enabled" : "disabled")
    setShowMusicModal(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification({
        roaster: getRandomName("roasters"),
        target: getRandomName("targets"),
      })

      setRoastCount(prev => prev + 1)

      if (notificationSound.current && isSoundEnabled) {
        notificationSound.current
          .play()
          .catch(err => console.log("Audio play failed:", err))
      }

      setTimeout(() => setNotification(null), NOTIFICATION_DURATION)
    }, NOTIFICATION_INTERVAL)

    return () => clearInterval(interval)
  }, [isSoundEnabled])

  useEffect(() => {
    if (shouldAutoHide) {
      const timer = setTimeout(() => {
        setIsStatsPanelVisible(false)
        setShouldAutoHide(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [shouldAutoHide])

  useEffect(() => {
    if (isStatsPanelVisible) {
      const timer = setTimeout(() => {
        setIsStatsPanelVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isStatsPanelVisible])

  const initiateRoastCall = async (formData: RoastFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch(
        "https://roast-call-proxy.vercel.app/proxy/call",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: `${formData.countryCode}${formData.phone}`,
            task: `You are calling ${formData.targetName}...`,
            model: "enhanced",
            language: "en",
            voice: "nat",
            max_duration: 1.5,
            first_sentence: `Hello, am I speaking with ${formData.targetName}?`,
            wait_for_greeting: false,
            record: true,
            answered_by_enabled: true,
            analysis_schema: {
              call_duration: "number",
              answered_by: "string",
              call_successful: "boolean",
              customer_response: "string",
            },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Failed to initiate call")
      }

      const result = await response.json()

      if (result.call_id) {
        setCurrentCallId(result.call_id)
        setShowCallStatus(true)
        setShowPaymentResult(false)
      }

      setRoastCount(prev => prev + 1)
      setNotification({
        roaster: formData.yourName,
        target: formData.targetName,
      })
    } catch (error) {
      console.error("Error initiating roast call:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Failed to initiate roast call. Please try again later."
      )
    } finally {
      setIsSubmitting(false)
      setIsConsentModalOpen(false)
      setCurrentFormData(null)
    }
  }

  const handleFormSubmit = (formData: RoastFormData) => {
    setCurrentFormData(formData)
    setIsConsentModalOpen(true)
  }

  const handleConsentConfirm = () => {
    setIsConsentModalOpen(false)
    setShowPricingModal(true)
  }

  const handleConsentClose = () => {
    if (!isSubmitting) {
      setIsConsentModalOpen(false)
      setCurrentFormData(null)
      setError(null)
    }
  }

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // New function to handle agent selection
  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    setShowPricingModal(false)
    setShowPaymentConfirmation(true)
  }

  // Step 4: Payment Confirmation -> Process Payment
  const handlePaymentConfirmation = (withRecording: boolean) => {
    setShowPaymentConfirmation(false)
    // For now, just simulate success
    setPaymentSuccess(true)
    setShowPaymentResult(true)
  }

  // Step 5: Payment Result -> Either initiate call or go back
  const handlePaymentResult = () => {
    if (paymentSuccess) {
      setShowPaymentResult(false)
      initiateRoastCall(currentFormData)
    } else {
      setShowPaymentResult(false)
    }
  }

  // After successful payment and call initiation
  const handleCallStart = (callId: string) => {
    setCurrentCallId(callId)
    setShowCallStatus(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative font-digital">
      <div className="bg-noise"></div>

      {/* Loading Screen */}
      {showLoadingScreen && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          animate={{ opacity: loadingProgress === 100 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[#ff3e3e] mb-8 text-center"
          >
            LOADING FRESH ROASTS
          </motion.div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ff3e3e]"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-4 text-gray-400">
            Preparing Agents... {loadingProgress}%
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section
        className="h-[95vh] relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BACKGROUND_IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-scanlines"></div>

        {/* Stats Panel Container */}
        <div className="absolute left-0 top-4 z-30">
          {/* Expand Button - Shows when panel is hidden */}
          {!isStatsPanelVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsStatsPanelVisible(true)}
              className="bg-black/80 p-2 rounded-r-lg border border-[#ff3e3e]/30
                       hover:bg-[#ff3e3e]/10 transition-colors"
            >
              <ChevronRight className="text-[#ff3e3e]" />
            </motion.button>
          )}

          {/* Stats Panel with slower animation */}
          {isStatsPanelVisible && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
              }}
              className="bg-black/80 p-4 rounded-r-lg border border-[#ff3e3e]/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <Skull className="text-[#ff3e3e]" />
                <span>Agent Status: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-[#ff3e3e]" />
                <span>Souls Roasted: {roastCount}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-[#ff3e3e]" />
                <span>Reputation: Legendary</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="text-center z-10 px-4 relative ">
          {/* Original Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* GTA-style container box */}
            <div
              className="inline-block bg-black/60 backdrop-blur-sm border-2 border-[#ff3e3e]/30 
                            p-4 rounded-lg shadow-2xl relative overflow-hidden
                            scale-90"
            >
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#ff3e3e]/0 via-[#ff3e3e]/10 to-[#ff3e3e]/0 
                              animate-shine"
              ></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ff3e3e]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ff3e3e]"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ff3e3e]"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ff3e3e]"></div>

              {/* Title */}
              <div
                className="text-[#ff3e3e] text-xl md:text-2xl mb-2 font-black tracking-[0.2em] 
                              uppercase pricedown-font text-shadow-red"
              >
                Souls Roasted
              </div>

              {/* Counter */}
              <motion.div
                key={roastCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-6xl font-bold text-white glitch-text shadow-glow 
                          relative font-digital tracking-wider"
              >
                {roastCount.toLocaleString()}
                <span className="absolute -inset-1 bg-[#ff3e3e]/20 blur-lg"></span>
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-7xl md:text-7xl lg:text-9xl title-font mt-8 mb-8 glitch-effect">
            ROAST YOUR
            <span className="block text-[#ff3e3e] relative">
              FRIEND
              <span className="absolute -inset-1 animate-pulse bg-[#ff3e3e]/20 blur-lg"></span>
            </span>
          </h1>

          {/* Original HeroAwards */}
          <HeroAwards />

          {/* Mission Start Button - New Addition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Pulsing background effect */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#ff3e3e] rounded-lg blur-xl"
            />

            <motion.button
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              onClick={() => {
                document
                  .getElementById("roast-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="relative group bg-[#ff3e3e] hover:bg-[#ff5555] 
                         text-white px-8 py-3
                         text-xl font-bold rounded-lg 
                         transform transition-all duration-200 
                         shadow-lg hover:shadow-red-600/50 
                         border-b-4 border-[#cc0000]
                         hover:border-b-2 hover:translate-y-[2px] pricedown-font"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine blur-lg"></span>
              {/* Subtle attention indicator */}
              START MISSION
            </motion.button>
          </motion.div>

          {/* Mission Stats - New Addition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <div className="bg-black/60 px-4 py-2 rounded-lg border border-[#ff3e3e]/30">
              <span className="text-[#ff3e3e]">Roast Level:</span> EXTREME
            </div>
            <div className="bg-black/60 px-4 py-2 rounded-lg border border-[#ff3e3e]/30">
              <span className="text-[#ff3e3e]">Reward:</span> SATISFACTION
            </div>
          </motion.div>
        </div>

        {notification && (
          <RoastNotification
            roaster={notification.roaster}
            target={notification.target}
          />
        )}

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0.5, y: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              exit={{ opacity: 0.8 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-11 text-center flex flex-col items-center"
            >
              <div className="text-[#ff3e3e] text-sm  text-center">
                See Past Missions
              </div>
              <ChevronDown className="w-6 h-6 text-[#ff3e3e]" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <SampleSection />

      {/* Roast Form Section */}
      <section
        id="roast-form"
        className="pt-12 pb-16 relative scroll-mt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${BACKGROUND_IMAGES.form})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* GTA-style Section Header */}

        <div className="max-w-3xl mx-auto px-4">
          <RoastForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-16 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${BACKGROUND_IMAGES.faq})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl title-font text-[#ff3e3e] mb-12 text-center">
            FAQ
          </h2>
          <FAQ />
        </div>
      </section>
      <WarningSection />
      <Footer />
      <MusicPlayer
        audioUrl={AUDIO_URL}
        autoPlay={isMusicEnabled}
        onSoundToggle={setIsSoundEnabled}
      />
      <BackToTop />

      <ConsentModal
        isOpen={isConsentModalOpen}
        onClose={handleConsentClose}
        onConfirm={handleConsentConfirm}
        isSubmitting={isSubmitting}
      />

      {/* Toast Notifications */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {showMusicModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-4 border border-[#ff3e3e]/20"
          >
            <h2 className="text-xl font-bold mb-4 text-center text-[#ff3e3e]">
              Enable background music?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleMusicChoice(true)}
                className="flex-1 bg-[#991b1b] hover:bg-[#ff5555] text-white px-6 py-3 
                         rounded-lg transform transition-all duration-200 
                         shadow-lg hover:shadow-red-600/50"
              >
                yes
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 
                         rounded-lg transform transition-all duration-200"
              >
                no
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <audio ref={notificationSound} src="/notification.mp3" />

      {/* Add to your global styles */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.15;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>

      <AnimatePresence>
        {showPricingModal && (
          <PricingModal
            onClose={() => setShowPricingModal(false)}
            onSelectPlan={handleAgentSelect}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaymentConfirmation && selectedAgent && (
          <PaymentConfirmationModal
            agent={selectedAgent}
            onClose={() => {
              setShowPaymentConfirmation(false)
              setShowPricingModal(true) // Go back to agent selection
            }}
            onConfirm={handlePaymentConfirmation}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaymentResult && (
          <PaymentResultModal
            success={paymentSuccess}
            onClose={handlePaymentResult}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCallStatus && currentCallId && (
          <CallStatusModal
            isVisible={showCallStatus}
            currentCallId={currentCallId}
            onClose={() => {
              setShowCallStatus(false)
              setCurrentCallId(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
