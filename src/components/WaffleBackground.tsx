
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaffleBackgroundProps {
  className?: string;
}

const WaffleBackground: React.FC<WaffleBackgroundProps> = ({ className }) => {
  const [waffles, setWaffles] = useState<{id: number; x: number; y: number; size: number; delay: number; duration: number}[]>([]);
  
  useEffect(() => {
    // Create random waffle elements
    const createWaffles = () => {
      const newWaffles = [];
      const count = Math.floor(window.innerWidth / 200); // Adjust density based on screen width
      
      for (let i = 0; i < count; i++) {
        newWaffles.push({
          id: i,
          x: Math.random() * 100, // Random x position (0-100%)
          y: Math.random() * 100, // Random y position (0-100%)
          size: 20 + Math.random() * 30, // Random size (20-50px)
          delay: Math.random() * 5, // Random animation delay (0-5s)
          duration: 15 + Math.random() * 20 // Random animation duration (15-35s)
        });
      }
      
      setWaffles(newWaffles);
    };
    
    createWaffles();
    
    // Recreate waffles on window resize
    window.addEventListener('resize', createWaffles);
    return () => window.removeEventListener('resize', createWaffles);
  }, []);

  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-[-1]", className)}>
      {waffles.map((waffle) => (
        <div
          key={waffle.id}
          className="absolute waffle-grid opacity-10"
          style={{
            left: `${waffle.x}%`,
            top: `${waffle.y}%`,
            width: `${waffle.size}px`,
            height: `${waffle.size}px`,
            animation: `float ${waffle.duration}s ease-in-out infinite`,
            animationDelay: `${waffle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default WaffleBackground;
