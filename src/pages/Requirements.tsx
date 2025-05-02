
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RequirementsSection from '@/components/RequirementsSection';

const Requirements = () => {
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
        <RequirementsSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Requirements;
