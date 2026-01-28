
import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, LogIn, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Process', path: '/process' },
    { name: 'Results', path: '/results' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome ? 'bg-background/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
            <Cpu size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Chuna</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/10 mx-2" />

          {user ? (
            <Link 
              to="/portal" 
              className="px-5 py-2.5 text-sm font-semibold bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard size={16} />
              Portal
            </Link>
          ) : (
            <Link 
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogIn size={16} />
              Log In
            </Link>
          )}

          <Link 
            to="/book" 
            className="px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-white/10 p-6 lg:hidden flex flex-col gap-4 shadow-2xl h-screen bg-background">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-medium text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          
          {user ? (
            <Link 
               to="/portal"
               className="text-lg font-medium text-white flex items-center gap-2"
            >
               <LayoutDashboard size={20} /> Client Portal
            </Link>
          ) : (
            <Link 
               to="/login"
               className="text-lg font-medium text-slate-300 flex items-center gap-2"
            >
               <LogIn size={20} /> Log In
            </Link>
          )}

          <Link 
            to="/book"
            className="mt-2 w-full text-center px-5 py-3 font-semibold bg-primary text-white rounded-lg"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
