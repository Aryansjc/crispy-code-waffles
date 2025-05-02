
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="pt-20">
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-waffle-800">Gallery</h1>
              <div className="bg-white/80 backdrop-blur-sm border border-waffle-200 rounded-xl p-12 shadow-lg">
                <div className="waffle-grid w-24 h-24 mx-auto mb-8 animate-float"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-syrup-600 mb-4">Coming Soon!</h2>
                <p className="text-lg text-syrup-800 mb-6">
                  Our gallery of amazing web designs is currently being prepared. 
                  Check back soon to see inspiring submissions from talented creators!
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;
