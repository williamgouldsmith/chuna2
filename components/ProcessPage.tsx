import React from 'react';
import { Video, Search, Map, Hammer, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Google Meet Discovery Call",
    description: "We start by understanding your business, your goals, and the specific bottlenecks holding you back. No hard selling, just a conversation about what you need.",
    icon: Video
  },
  {
    number: "02",
    title: "Audit & Analysis",
    description: "We review your current workflows, lead handling, and systems to identify inefficiencies. We look for where time is being wasted and where leads are being lost.",
    icon: Search
  },
  {
    number: "03",
    title: "Strategy & Planning",
    description: "We design a custom automation roadmap tailored to your specific needs. We outline exactly what we'll build and the results you can expect.",
    icon: Map
  },
  {
    number: "04",
    title: "Build & Integration",
    description: "We build, configure, and implement your AI tools. We ensure everything integrates seamlessly with your existing software stack.",
    icon: Hammer
  },
  {
    number: "05",
    title: "Optimisation & Growth",
    description: "Once live, we monitor performance, refine the systems based on real data, and help you scale your results over time.",
    icon: TrendingUp
  }
];

const ProcessPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          How we transform <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            your business
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          A simple, transparent 5-step process to take you from manual overload to automated efficiency.
        </p>
      </div>

      <div className="relative space-y-8 md:space-y-12">
        {/* Connector Line */}
        <div className="hidden md:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative flex flex-col md:flex-row gap-8 md:items-start group">
              {/* Number/Icon Bubble */}
              <div className="shrink-0 flex items-center justify-center w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-surface border border-white/10 shadow-xl z-10 group-hover:border-primary/50 transition-colors">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500 mb-1">STEP</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{step.number}</div>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-grow bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-accent w-6 h-6" />
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start Step 1?</h2>
          <p className="text-blue-100 mb-8 text-lg">Book your discovery call today and let's see if we're a good fit.</p>
          <Link 
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl"
          >
            Book Discovery Call
            <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProcessPage;