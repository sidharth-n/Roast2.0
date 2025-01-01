import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { checkForBannedWords } from "../utils/bannedWords"
import CountrySelect from "./CountrySelect"
import HowItWorks from "./HowItWorks"

interface RoastFormData {
  yourName: string
  targetName: string
  targetJob: string
  funFacts: string
  phone: string
  countryCode: string
}

interface Props {
  onSubmit: (data: RoastFormData) => void
  isSubmitting?: boolean
}

const RoastForm: React.FC<Props> = ({ onSubmit, isSubmitting = false }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [invalidField, setInvalidField] = useState(false)
  const [formData, setFormData] = useState<RoastFormData>({
    yourName: "",
    targetName: "",
    targetJob: "",
    funFacts: "",
    phone: "",
    countryCode: "+91",
  })

  const steps = [
    {
      title: "Your Name",
      subtitle: "Let us know who you are",
      field: "yourName",
      placeholder: "Enter your name",
    },
    {
      title: "Target Name",
      subtitle: "Who do you want to roast?",
      field: "targetName",
      placeholder: "Enter their name",
    },
    {
      title: "Target's Job",
      subtitle: "What do they do?",
      field: "targetJob",
      placeholder: "Enter their job/profession",
    },
    {
      title: "Fun Facts",
      subtitle: "Share something embarrassing about them",
      field: "funFacts",
      placeholder:
        "Enter some embarrassing facts about them (this will be used in the roast)",
      isTextArea: true,
    },
    {
      title: "Phone Number",
      subtitle: "Where should we call?",
      field: "phone",
      placeholder: "Enter their phone number",
      isPhone: true,
    },
  ]

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleNext = () => {
    const currentField = steps[currentStep].field
    const currentValue = formData[currentField as keyof RoastFormData]

    if (!currentValue || currentValue.trim() === "") {
      setInvalidField(true)
      return
    }

    setInvalidField(false)
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const bannedWordsError = checkForBannedWords(formData.funFacts)
      if (bannedWordsError) {
        alert(bannedWordsError)
        return
      }
      onSubmit(formData)
    }
  }

  const getInputClassName = (isError: boolean) => `
    w-full bg-black/60 border-2 
    ${isError ? "border-red-500 animate-shake" : "border-[#ff3e3e]/30"} 
    rounded-lg px-4 py-3 
    text-white placeholder-gray-500 
    focus:border-[#ff3e3e] 
    transition-all duration-200
    ${isError ? "shadow-[0_0_10px_rgba(239,68,68,0.5)]" : ""}
  `

  useEffect(() => {
    const handleResize = () => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        window.scrollTo({
          top: window.scrollY,
          behavior: "smooth",
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleInputBlur = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("roast-form")?.offsetTop || window.scrollY,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <div className="space-y-4 pb-12">
      {/* Step Title with GTA style */}
      <h2
        className="text-4xl title-font text-[#fffbfb] mb-12 text-center"
        style={{ zIndex: 100 }}
      >
        MISSION CONTROL
      </h2>
      <div className="text-center mb-8">
        <p className="text-[#ff3e3e] text-lg tracking-[0.2em] uppercase font-digital">
          Launch Your Roast
        </p>
        <div className="w-16 h-1 bg-[#ff3e3e] mx-auto"></div>
      </div>

      <div
        className="bg-black/80 backdrop-blur-sm border-2 border-[#ff3e3e]/30 rounded-lg p-8 
                    shadow-lg shadow-[#ff3e3e]/20 max-w-2xl mx-auto relative"
      >
        {/* Back Icon with glow effect */}
        {currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="absolute left-4 top-4 text-[#ff3e3e] hover:text-[#ff5555] 
                      transition-colors p-2 rounded-full 
                      hover:bg-white/5 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,62,62,0.5)]" />
          </motion.button>
        )}

        {/* Progress Bar with glow effect */}
        <div className="flex justify-between mb-8 px-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-full mx-1 rounded transition-all duration-300
                ${
                  index <= currentStep
                    ? "bg-[#ff3e3e] shadow-[0_0_10px_rgba(255,62,62,0.3)]"
                    : "bg-gray-600"
                }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step Content Title */}
            <div className="text-center mb-8">
              <h3 className="text-3xl text-white font-bold mb-2 font-digital">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-400 font-digital">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Input Fields - Same as before but with animation */}
            <div className="relative">
              {steps[currentStep].isPhone ? (
                <div className="flex gap-2">
                  <CountrySelect
                    value={formData.countryCode}
                    onChange={code => {
                      setFormData(prev => ({ ...prev, countryCode: code }))
                      setInvalidField(false)
                    }}
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }))
                      setInvalidField(false)
                    }}
                    onBlur={handleInputBlur}
                    placeholder={steps[currentStep].placeholder}
                    className={getInputClassName(invalidField)}
                  />
                </div>
              ) : steps[currentStep].isTextArea ? (
                <textarea
                  value={
                    formData[steps[currentStep].field as keyof RoastFormData]
                  }
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      [steps[currentStep].field]: e.target.value,
                    }))
                    setInvalidField(false)
                  }}
                  onBlur={handleInputBlur}
                  rows={4}
                  placeholder={steps[currentStep].placeholder}
                  className={getInputClassName(invalidField)}
                />
              ) : (
                <input
                  type="text"
                  value={
                    formData[steps[currentStep].field as keyof RoastFormData]
                  }
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      [steps[currentStep].field]: e.target.value,
                    }))
                    setInvalidField(false)
                  }}
                  onBlur={handleInputBlur}
                  placeholder={steps[currentStep].placeholder}
                  className={getInputClassName(invalidField)}
                />
              )}
            </div>

            {/* Content wrapper with padding for How It Works button */}
            <div className="pb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full bg-[#ff3e3e] hover:bg-[#ff5555] text-white py-3 px-6 
                         rounded-lg text-lg font-bold mt-8
                         transform transition-all duration-200 
                         border-b-4 border-[#cc0000]
                         hover:border-b-2 hover:translate-y-[2px]
                         flex items-center justify-center gap-2
                         relative group"
              >
                {/* Button glow effect */}
                <span
                  className="absolute inset-0 bg-[#ff3e3e] rounded-lg blur-lg opacity-50 
                               group-hover:opacity-75 transition-opacity"
                ></span>
                <span className="relative">
                  {currentStep === steps.length - 1 ? (
                    isSubmitting ? (
                      "Processing..."
                    ) : (
                      "Roast Now"
                    )
                  ) : (
                    <>
                      Next <ChevronRight className="w-5 h-5 inline-block" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* How It Works Button - Fixed positioning */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setShowHowItWorks(true)}
            className="px-3 py-1.5 
                      text-[#ff3e3e] hover:text-white
                      transition-all duration-200 text-sm font-medium
                      rounded-md hover:bg-[#ff3e3e]/20
                      border border-[#ff3e3e]/30 hover:border-[#ff3e3e]
                      whitespace-nowrap"
          >
            How does it work?
          </button>
        </div>
      </div>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHowItWorks && (
          <HowItWorks onClose={() => setShowHowItWorks(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// Add these animations to your global styles
const globalStyles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
`

export default RoastForm
