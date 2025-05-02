
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Prizes = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="pt-20">
        <section className="py-24 bg-waffle-50">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-waffle-800">Delicious Prizes</h1>
              <div className="bg-white/80 backdrop-blur-sm border border-waffle-200 rounded-xl p-12 shadow-lg">
                <div className="text-6xl mb-6">🧇</div>
                <h2 className="text-2xl md:text-3xl font-bold text-syrup-600 mb-4">Coming Soon!</h2>
                <p className="text-lg text-syrup-800 mb-6">
                  We're cooking up some delicious prizes for our winners.
                  Check back soon to discover what mouthwatering rewards await!
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

export default Prizes;
