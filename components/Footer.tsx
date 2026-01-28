import React from 'react';
import { Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'cookies' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                <Cpu size={18} />
              </div>
              <span className="text-xl font-bold text-white">Chuna</span>
            </Link>
            <p className="text-slate-400 mb-6">
              Helping service businesses reclaim their time and scale revenue through intelligent automation.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-white font-semibold mb-6">Solutions</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="/solutions" className="hover:text-primary transition-colors">All Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="/process" className="hover:text-primary transition-colors">Process</Link></li>
                <li><Link to="/results" className="hover:text-primary transition-colors">Results</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/book" className="hover:text-primary transition-colors">Book a Call</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Chuna. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-slate-400 text-left">Privacy Policy</button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-slate-400 text-left">Cookie Policy</button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-slate-400 text-left">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;