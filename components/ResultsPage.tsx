import React from 'react';
import { BarChart, TrendingUp, Clock, Users } from 'lucide-react';

const ResultsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-accent mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Case Studies In Progress
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Real Results <br />
          <span className="text-slate-500">Coming Soon</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We are currently compiling detailed performance reports from our partner businesses. We believe in showing data, not just claims.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="p-8 bg-surface border border-white/10 rounded-2xl">
          <Clock className="w-10 h-10 text-primary mb-4 mx-auto" />
          <h3 className="text-xl font-bold text-white mb-2">Efficiency</h3>
          <p className="text-slate-400">Measuring hours of admin time saved per week through automation.</p>
        </div>
        <div className="p-8 bg-surface border border-white/10 rounded-2xl">
          <TrendingUp className="w-10 h-10 text-accent mb-4 mx-auto" />
          <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
          <p className="text-slate-400">Tracking increases in lead capture and conversion rates.</p>
        </div>
        <div className="p-8 bg-surface border border-white/10 rounded-2xl">
          <Users className="w-10 h-10 text-primary mb-4 mx-auto" />
          <h3 className="text-xl font-bold text-white mb-2">Scalability</h3>
          <p className="text-slate-400">Demonstrating ability to handle volume without adding staff.</p>
        </div>
        <div className="p-8 bg-surface border border-white/10 rounded-2xl">
          <BarChart className="w-10 h-10 text-accent mb-4 mx-auto" />
          <h3 className="text-xl font-bold text-white mb-2">ROI</h3>
          <p className="text-slate-400">Calculating the direct revenue impact of recovered missed calls.</p>
        </div>
      </div>

      <div className="p-8 bg-white/5 border border-white/5 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">Want to be our next success story?</h3>
        <p className="text-slate-400 mb-6">Join the service businesses modernising their operations with TunerAI.</p>
        <a 
          href="#/book" 
          className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors"
        >
          Start Your Transformation
        </a>
      </div>
    </div>
  );
};

export default ResultsPage;