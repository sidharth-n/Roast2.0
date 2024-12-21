import React from 'react';
import { Users } from 'lucide-react';

interface Props {
  roastCount: number;
  activeUsers: number;
}

const StatsBar: React.FC<Props> = ({ roastCount, activeUsers }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-[#4C1CA1]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <span className="text-[#FFD700] font-bold">{roastCount}</span>
            <span className="text-gray-400 ml-2">Total Roasts</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#FFD700]" />
            <span className="text-[#FFD700] font-bold">{activeUsers}</span>
            <span className="text-gray-400">Online</span>
          </div>
        </div>
        <div className="text-[#FFD700]">
          ROAST YOUR FRIEND
        </div>
      </div>
    </div>
  );
};

export default StatsBar;