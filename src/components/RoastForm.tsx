import React, { useState } from "react"
import { checkForBannedWords } from "../utils/bannedWords"
import CountrySelect from "./CountrySelect"

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

const PLACEHOLDERS = {
  yourName: "Enter your name",
  targetName: "Enter target's name",
  targetJob: "e.g., Freelancer",
  funFacts: "e.g., Still uses Internet Explorer, Has a crush on Emma",
  phone: "Your number",
}

const RoastForm: React.FC<Props> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<RoastFormData>({
    yourName: "",
    targetName: "",
    targetJob: "",
    funFacts: "",
    phone: "",
    countryCode: "+1",
  })

  const [errors, setErrors] = useState<Partial<RoastFormData>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<RoastFormData> = {}

    // Check required fields
    Object.keys(formData).forEach(key => {
      if (!formData[key as keyof RoastFormData]) {
        newErrors[key as keyof RoastFormData] = "Required"
      }
    })

    // Check for banned words
    const bannedWordsError = checkForBannedWords(formData.funFacts)
    if (bannedWordsError) {
      newErrors.funFacts = bannedWordsError
      alert(bannedWordsError)
      return
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof RoastFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-[#4C1CA1] rounded-lg p-8 shadow-lg shadow-[#4C1CA1]/20">
      <h2 className="text-4xl text-[#FFD700] mb-8 text-center title-font">
        ROAST DETAILS
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#FFD700] mb-2">Your Name</label>
          <input
            type="text"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.yourName}
            className={`w-full bg-black/80 border ${
              errors.yourName ? "border-[#FF0000]" : "border-[#4C1CA1]"
            } 
                       rounded-md px-4 py-2 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] 
                       transition-colors`}
          />
          {errors.yourName && (
            <p className="text-[#FF0000] text-sm mt-1">{errors.yourName}</p>
          )}
        </div>

        <div>
          <label className="block text-[#FFD700] mb-2">Target's Name</label>
          <input
            type="text"
            name="targetName"
            value={formData.targetName}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.targetName}
            className={`w-full bg-black/80 border ${
              errors.targetName ? "border-[#FF0000]" : "border-[#4C1CA1]"
            } 
                       rounded-md px-4 py-2 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] 
                       transition-colors`}
          />
          {errors.targetName && (
            <p className="text-[#FF0000] text-sm mt-1">{errors.targetName}</p>
          )}
        </div>

        <div>
          <label className="block text-[#FFD700] mb-2">Target's Job</label>
          <input
            type="text"
            name="targetJob"
            value={formData.targetJob}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.targetJob}
            className={`w-full bg-black/80 border ${
              errors.targetJob ? "border-[#FF0000]" : "border-[#4C1CA1]"
            } 
                       rounded-md px-4 py-2 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] 
                       transition-colors`}
          />
          {errors.targetJob && (
            <p className="text-[#FF0000] text-sm mt-1">{errors.targetJob}</p>
          )}
        </div>

        <div>
          <label className="block text-[#FFD700] mb-2">
            Fun Facts About Target
          </label>
          <textarea
            name="funFacts"
            value={formData.funFacts}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.funFacts}
            rows={4}
            className={`w-full bg-black/80 border ${
              errors.funFacts ? "border-[#FF0000]" : "border-[#4C1CA1]"
            } 
                       rounded-md px-4 py-2 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] 
                       transition-colors`}
          />
          {errors.funFacts && (
            <p className="text-[#FF0000] text-sm mt-1">{errors.funFacts}</p>
          )}
        </div>

        <div>
          <label className="block text-[#FFD700] mb-2">
            Their Phone Number
          </label>
          <div className="flex">
            <CountrySelect
              value={formData.countryCode}
              onChange={code =>
                setFormData(prev => ({ ...prev, countryCode: code }))
              }
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={PLACEHOLDERS.phone}
              className={`flex-1 bg-black/80 border ${
                errors.phone ? "border-[#FF0000]" : "border-[#4C1CA1]"
              } 
                         rounded-r-md px-4 py-2 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] 
                         transition-colors`}
            />
          </div>
          {errors.phone && (
            <p className="text-[#FF0000] text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FF0000] hover:bg-[#FF2200] text-white py-3 rounded-md text-lg font-bold
                   transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-600/50
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "INITIATING ROAST..." : "ROAST NOW"}
        </button>
      </form>
    </div>
  )
}

export default RoastForm
