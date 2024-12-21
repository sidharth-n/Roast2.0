import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

const awards = [
  {
    icon: Trophy,
    text: "#1 Fun AI App of 2024"
  },
  {
    icon: Star,
    text: "Most Creative Roasts"
  },
  {
    icon: Award,
    text: "Unlimited Laughs"
  }
];

const HeroAwards: React.FC = () => {
  const [currentAward, setCurrentAward] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAward((prev) => (prev + 1) % awards.length);
    }, 2000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        @keyframes glitch {
          0% {
            text-shadow: 1px 1px 0 #ff0000,  0 #00ff00;
            transform: translate(0, 0);
          }
          100% {
            text-shadow: 1px 1px 0 #ff0000,  0 #00ff00;
            transform: translate(0, 0);
          }
        }

        .glitch {
          animation: glitch 2.5s infinite alternate;
        }

        .hero-awards-container {
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .award-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          letter-spacing:0.05rem;
          font-family: 'Pricedow', cursive;
          color: #FFD700;
          height: 3rem;
          transition: opacity 1s ease-in-out;
        }

        .award-item.active {
          opacity: 1;
        }

        .award-item.inactive {
          opacity: 0;
        }

        @media (min-width: 768px) {
          .award-item {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="hero-awards-container">
        {awards.map((award, index) => {
          const Icon = award.icon;
          const isActive = currentAward === index;

          return (
            <div
              key={index}
              className={`award-item ${isActive ? 'active glitch' : 'inactive'}`}
            >
              <Icon className="w-6 h-6" />
              <span>{award.text}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroAwards;
