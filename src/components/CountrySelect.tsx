import React from "react"

interface Country {
  code: string
  name: string
  dialCode: string
}

const popularCountries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "MX", name: "Mexico", dialCode: "+52" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "KR", name: "South Korea", dialCode: "+82" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "QA", name: "Qatar", dialCode: "+974" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
  { code: "RU", name: "Russia", dialCode: "+7" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "EG", name: "Egypt", dialCode: "+20" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "MY", name: "Malaysia", dialCode: "+60" },
]

interface CountrySelectProps {
  value: string
  onChange: (dialCode: string) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-black/80 border border-[#4C1CA1] rounded-l-md px-3 py-2 text-white 
                focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
    >
      {popularCountries.map(country => (
        <option key={country.code} value={country.dialCode}>
          {country.code} {country.dialCode}
        </option>
      ))}
    </select>
  )
}

export default CountrySelect
