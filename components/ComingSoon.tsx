import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden pt-24">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 animate-bounce">
        <Construction className="text-accent w-12 h-12" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h1>
      
      <p className="text-xl text-slate-400 mb-8 max-w-md">
        We're currently building this page to serve you better. Check back soon for updates.
      </p>

      <Link 
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;