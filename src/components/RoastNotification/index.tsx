import React from 'react';
import { Skull } from 'lucide-react';
import './styles.css';

interface Props {
  roaster: string;
  target: string;
}

const RoastNotification: React.FC<Props> = ({ roaster, target }) => {
  return (
    <div className="roast-notification">
      <div className="flex items-center gap-2">
        <Skull className="text-[#ff3e3e] w-4 h-4" />
        <p className="text-sm">
          <span className="text-[#ff3e3e] font-bold">{roaster}</span> just roasted{' '}
          <span className="text-white font-bold">{target}</span>
        </p>
        <Skull className="text-[#ff3e3e] w-4 h-4" />
      </div>
    </div>
  );
};

export default RoastNotification;