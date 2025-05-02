
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GetStartedSection from '@/components/GetStartedSection';

const GetStarted = () => {
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
        <GetStartedSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GetStarted;
