import React from 'react';

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

const popularCountries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  // Add more countries as needed
];

interface CountrySelectProps {
  value: string;
  onChange: (dialCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-black/80 border border-[#4C1CA1] rounded-l-md px-3 py-2 text-white 
                focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
    >
      {popularCountries.map((country) => (
        <option key={country.code} value={country.dialCode}>
          {country.code} {country.dialCode}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;