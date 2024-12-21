import React from 'react';
import { ShieldAlert } from 'lucide-react';

const WarningSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0a0a0a]/90">
      <div className="max-w-3xl mx-auto px-4">
        <div className="border-2 border-[#ff3e3e] rounded-lg p-8 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <ShieldAlert size={32} className="text-[#ff3e3e]" />
            <h2 className="text-3xl title-font text-[#f7d5d5]">KEEP IT FUN & SAFE</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="text-xl leading-relaxed">
              Remember: We're here for laughs, not tears. Keep it playful and clean.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No hate speech or discrimination</li>
              <li>No personal attacks or bullying</li>
              <li>No explicit or inappropriate content</li>
              <li>Always get consent before roasting</li>
              <li>Keep it fun and entertaining</li>
            </ul>
            <p className="text-lg italic">
              Violation of these guidelines will result in immediate account suspension.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarningSection;