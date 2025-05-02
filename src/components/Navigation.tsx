
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  path: string;
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Requirements', path: '/requirements' },
  { name: 'Rules', path: '/rules' },
  { name: 'Prizes', path: '/prizes' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 bg-waffle-300 rounded-lg waffle-grid"></div>
            <div className="absolute -top-1 -right-1">
              <div className="syrup-drop" style={{ '--delay': '0.2' } as React.CSSProperties}></div>
            </div>
          </div>
          <span className="font-bold text-2xl text-waffle-800 tracking-tight">Waffles</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <LinkItem key={index} to={item.path}>{item.name}</LinkItem>
          ))}
          <Button 
            as={Link}
            to="/get-started"
            className="waffle-button"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-waffle-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-sm shadow-lg md:hidden transition-all duration-300 ease-in-out",
          menuOpen ? "opacity-100 h-auto py-6" : "opacity-0 h-0 py-0 pointer-events-none"
        )}>
          <div className="container px-4 mx-auto flex flex-col gap-4">
            {navItems.map((item, index) => (
              <MobileLink key={index} to={item.path} onClick={() => setMenuOpen(false)}>
                {item.name}
              </MobileLink>
            ))}
            <Button 
              as={Link}
              to="/get-started"
              className="waffle-button w-full mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const LinkItem = ({ 
  children, 
  to,
}: { 
  children: React.ReactNode; 
  to: string;
}) => (
  <Link 
    to={to}
    className="waffle-link text-lg transition-colors text-waffle-800"
  >
    {children}
  </Link>
);

const MobileLink = ({ 
  children, 
  to,
  onClick
}: { 
  children: React.ReactNode; 
  to: string;
  onClick: () => void;
}) => (
  <Link 
    to={to}
    onClick={onClick}
    className="py-2 px-4 text-left text-lg font-medium text-waffle-800 hover:bg-waffle-50 rounded-lg transition-colors block"
  >
    {children}
  </Link>
);

export default Navigation;
