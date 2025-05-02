
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-waffle-800 text-white pt-16 pb-8">
      <div className="container px-4 mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Logo and info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-waffle-300 rounded-lg waffle-grid"></div>
              </div>
              <span className="font-bold text-2xl tracking-tight">Waffles 🧇</span>
            </div>
            <p className="text-waffle-100">
              The Waffle Web Challenge is a fun competition for web developers to showcase their 
              HTML, CSS, and JavaScript skills while competing for delicious waffle prizes.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#requirements" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('requirements')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Requirements
                </a>
              </li>
              <li>
                <a 
                  href="#rules" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Rules
                </a>
              </li>
              <li>
                <a 
                  href="#prizes" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Prizes
                </a>
              </li>
              <li>
                <a 
                  href="#get-started" 
                  className="text-waffle-100 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-waffle-700 pt-8 text-center">
          <p className="text-waffle-300 text-sm">
            &copy; {currentYear} Waffle Web Challenge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
