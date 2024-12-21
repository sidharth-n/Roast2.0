import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "IS THIS SAFE AND LEGAL?",
    answer: "Yes! Our roasts are meant to be fun and playful. We have strict guidelines against harmful content and moderate all submissions. All calls comply with telecom regulations."
  },
  {
    question: "WHAT'S NOT ALLOWED?",
    answer: "Hate speech, discrimination, harassment, explicit content, threats, or any form of harmful behavior. We maintain a zero-tolerance policy for inappropriate content."
  },
  {
    question: "HOW LONG ARE THE CALLS?",
    answer: "Each roast call lasts exactly 2 minutes. Make sure your friend is ready to pick up the call so you don't waste your credits!"
  },
  {
    question: "CAN I GET A REFUND?",
    answer: "All roast credits are non-refundable. Please ensure you understand our guidelines and have your friend's consent before making a call."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-[#ff3e3e] rounded-lg overflow-hidden hover:border-[#ff5555] transition-colors"
        >
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-black/60 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-xl font-semibold text-white">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-[#ff3e3e]" />
            ) : (
              <ChevronDown className="text-[#ff3e3e]" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="px-6 py-4 bg-black/40">
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;