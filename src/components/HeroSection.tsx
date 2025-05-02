
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-waffle-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-syrup-100 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      {/* Waffle background pattern */}
      <div className="absolute inset-0 bg-waffle-pattern opacity-10 -z-20"></div>
      
      {/* Hero content */}
      <div className="container px-4 mx-auto flex flex-col items-center text-center">
        {/* Animated waffle symbol */}
        <div className={cn(
          "relative mb-8 opacity-0 scale-90",
          loaded && "opacity-100 scale-100 transition-all duration-1000"
        )}>
          <div className="w-32 h-32 waffle-grid rounded-2xl animate-float"></div>
          
          {/* Syrup drips */}
          <SyrupDrop delay={0.1} left="15%" />
          <SyrupDrop delay={1.3} left="45%" />
          <SyrupDrop delay={0.7} left="75%" />
          
          {/* Butter pat */}
          <div className="absolute -top-4 right-2 w-10 h-5 rounded-lg bg-butter-200 border border-butter-300 animate-bounce-subtle"></div>
        </div>
        
        {/* Main heading */}
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-bold text-waffle-800 mb-4 opacity-0 translate-y-10",
          loaded && "opacity-100 translate-y-0 transition-all duration-700 delay-300"
        )}>
          <span className="text-syrup-600">Waffle</span> Web Challenge
        </h1>
        
        {/* Tagline */}
        <p className={cn(
          "text-xl md:text-2xl text-syrup-800 max-w-2xl mb-8 opacity-0",
          loaded && "opacity-100 transition-all duration-700 delay-500"
        )}>
          Showcase your web design skills and win delicious waffles! Create beautiful websites with HTML, CSS, and JavaScript.
        </p>
        
        {/* Call to action buttons */}
        <div className={cn(
          "flex flex-col md:flex-row gap-4 opacity-0 translate-y-10",
          loaded && "opacity-100 translate-y-0 transition-all duration-700 delay-700"
        )}>
          <Button 
            className="waffle-button text-lg px-8 py-6"
            onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the Challenge
          </Button>
          
          <Button 
            variant="outline"
            className="bg-white/80 border-waffle-300 text-waffle-800 hover:bg-waffle-50 text-lg px-8 py-6"
            onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

const SyrupDrop = ({ delay, left }: { delay: number; left: string }) => (
  <div 
    className="syrup-drop" 
    style={{ 
      '--delay': delay,
      left: left,
      top: '-5px'
    } as React.CSSProperties}
  ></div>
);

export default HeroSection;
