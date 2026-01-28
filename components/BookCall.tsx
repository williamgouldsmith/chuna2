import React from 'react';
import { CalendarCheck, ArrowRight, CheckCircle2, Clock, Video } from 'lucide-react';

const BookCall: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
      {/* Left Column: Context & Value */}
      <div className="flex-1 space-y-8 mt-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's optimise your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              service workflow
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Book a free 15-minute consultation. We'll analyse your current setup and identify immediate opportunities to save time and automate admin work.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">15-Minute Strategy Call</h3>
              <p className="text-slate-400">Quick, focused, and valuable. No fluff.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 bg-accent/20 rounded-lg text-accent">
              <Video size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Google Meet</h3>
              <p className="text-slate-400">Face-to-face discussion about your specific needs.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <h4 className="text-white font-semibold mb-4">What we'll cover:</h4>
          <ul className="space-y-3">
            {[
              'Current bottleneck analysis',
              'Missed call & lead recovery strategy',
              'Automation implementation roadmap',
              'ROI estimation'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column: Calendar Mock/Action */}
      <div className="flex-1 w-full bg-surface border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
        
        <div className="text-center space-y-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <CalendarCheck size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Select a Time</h2>
            <p className="text-slate-400">View available slots for your consultation</p>
          </div>

          {/* Simulated Calendar UI */}
          <div className="bg-background rounded-xl border border-white/10 p-4 max-w-sm mx-auto">
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-500 mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="font-medium">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: 31 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm
                    ${i === 14 ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30 cursor-pointer' : 
                      i > 14 && i < 20 ? 'text-slate-300 hover:bg-white/5 cursor-pointer' : 'text-slate-700 pointer-events-none'}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            <a 
              href="https://meet.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Open Calendar
            </a>
          </div>

          <p className="text-xs text-slate-500">
            By booking, you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCall;