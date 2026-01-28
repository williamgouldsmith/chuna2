import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="results" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16 md:flex md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Results</h2>
          <p className="text-slate-400 max-w-md">
            See the impact of automation on businesses just like yours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
            <div>
              <Quote className="text-primary/40 mb-6" size={32} />
              <p className="text-lg text-slate-200 mb-8 italic">"{t.quote}"</p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-white font-semibold">{t.author}</p>
                <p className="text-slate-500 text-sm">{t.role}</p>
              </div>
              <div className="text-right">
                <span className="block text-accent font-bold text-xl">{t.metric}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Impact</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;