
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RulesSection from '@/components/RulesSection';

const Rules = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="pt-20">
        <RulesSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Rules;
