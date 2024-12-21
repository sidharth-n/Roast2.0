import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 border-t border-[#ff3e3e]/20 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#ff3e3e] text-xl mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:support@roastfriend.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail size={16} />
                support@roastfriend.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone size={16} />
                +1 (234) 567-890
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-[#ff3e3e] text-xl mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/guidelines" className="text-gray-400 hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#ff3e3e] text-xl mb-4">About</h3>
            <p className="text-gray-400">
              RoastFriend is a fun platform for friendly roasts. Remember to keep it playful 
              and respect our community guidelines.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#ff3e3e]/20 text-center text-gray-500">
          © {new Date().getFullYear()} RoastFriend. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;