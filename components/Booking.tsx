import React from 'react';
import { CalendarCheck, ArrowRight } from 'lucide-react';

const Booking: React.FC = () => {
  return (
    <section id="booking" className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden bg-primary px-6 py-16 md:p-20 text-center">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-primary mb-8 shadow-xl rotate-3">
            <CalendarCheck size={32} />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Modernise Your Service Operations
          </h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Book a free 15-minute efficiency audit. We'll identify exactly where you can save time and improve your service delivery.
          </p>

          <a 
            href="https://meet.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Book a Google Meet
            <ArrowRight size={20} />
          </a>
          
          <p className="mt-6 text-sm text-blue-200 opacity-80">
            No pressure. No commitment. Just clear value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Booking;