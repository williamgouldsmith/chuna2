
import React from 'react';
import { ShieldCheck, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          About <span className="text-primary">Chuna</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          We help service businesses escape the admin trap, automate their operations, and scale with confidence.
        </p>
      </div>

      {/* Mission & Values (Centered Layout) */}
      <div className="max-w-3xl mx-auto mb-24">
        
        {/* Mission Text */}
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed mb-6 text-lg">
              We believe that business owners should focus on their craft and their strategy, not on chasing phone calls or manually entering data.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              Our goal is to make enterprise-level AI automation accessible, practical, and highly effective for service-based businesses.
            </p>
         </div>

        {/* Core Values Cards */}
        <div className="space-y-6">
          <div className="flex gap-6 p-6 bg-surface border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Efficiency First</h3>
              <p className="text-slate-400 leading-relaxed">We despise inefficiency. Every workflow we build is designed to cut steps, reduce friction, and speed up results.</p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-surface border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Built for Results</h3>
              <p className="text-slate-400 leading-relaxed">We avoid "shiny object syndrome". If an AI tool doesn't directly contribute to saving time or making money, we don't use it.</p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-surface border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent shrink-0">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Human-Centric</h3>
              <p className="text-slate-400 leading-relaxed">Automation shouldn't feel robotic. We design systems that enhance the human experience for your clients, not replace it.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Story Section (Full Width) */}
      <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-6 text-slate-300 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-white mb-4">Why I Started Chuna</h2>
            <p>
              After qualifying as a Chartered Physiotherapist, Will quickly recognised a consistent issue across service-based industries, including healthcare, trades, and hospitality. Large amounts of time were being lost to administration, organisation, and manual processes, taking focus away from delivering high-quality services.
            </p>
            <p>
              Through building and running his own physiotherapy business, Will began exploring how AI and automation could improve efficiency, reduce workload, and streamline daily operations. What started as a way to optimise his own systems highlighted a much larger problem: many small businesses were operating with outdated processes that limited growth and increased pressure on owners.
            </p>
            <p>
              Chuna AI was created from real-world experience, not theory. Every solution is built around practical implementation, designed to remove unnecessary admin, improve workflows, and allow business owners to focus on what actually drives revenue and client satisfaction.
            </p>
            <p>
              In a market increasingly dominated by large corporations, Chuna AI exists to support and protect small businesses. The aim is simple: to give service-based businesses access to the same level of automation and efficiency as larger companies, helping them remain competitive, sustainable, and focused on what they do best.
            </p>
        </div>
      </div>
      
      {/* CTA at bottom */}
      <div className="text-center mt-16">
        <Link 
          to="/book" 
          className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg hover:shadow-xl"
        >
          Work With Us
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
