import React from 'react';
import { formatRelativeTime } from '../utils/dateUtils';

interface ActivityCardProps {
  roaster: string;
  target: string;
  location: string;
  timestamp: Date;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  roaster,
  target,
  location,
  timestamp
}) => {
  return (
    <div className="bg-black/60 border border-[#4C1CA1] rounded-lg p-6 transform hover:scale-[1.02] 
                   transition-all duration-300 hover:border-[#FFD700] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4C1CA1]/10 to-transparent 
                    group-hover:from-[#4C1CA1]/20 transition-all duration-300"></div>
      <div className="relative z-10">
        <p className="text-lg">
          <span className="text-[#FFD700]">{roaster}</span> roasted{' '}
          <span className="text-[#FF0000]">{target}</span> in{' '}
          <span className="text-[#FFD700]">{location}</span>
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {formatRelativeTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;