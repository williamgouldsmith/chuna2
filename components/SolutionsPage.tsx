import React from 'react';
import { Phone, MessageSquare, Workflow, BarChart3, RotateCcw, Send, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    title: "AI Receptionists",
    description: "Your 24/7 front desk. Handles inbound calls, qualifies leads, and manages bookings without you lifting a finger.",
    icon: Phone,
    benefits: [
      "24/7 call answering & booking",
      "Natural, human-like voice",
      "Instant missed-call recovery"
    ],
    outcome: "Capture every lead, even when you're sleeping."
  },
  {
    title: "AI Chatbots",
    description: "Intelligent agents for your website and social channels that engage visitors instantly and capture details.",
    icon: MessageSquare,
    benefits: [
      "Instant responses across all channels",
      "Lead capture & qualification",
      "Automated FAQ handling"
    ],
    outcome: "Turn website traffic into qualified appointments."
  },
  {
    title: "Pipeline Automation",
    description: "End-to-end CRM automation that moves leads through your funnel and triggers timely follow-ups.",
    icon: Workflow,
    benefits: [
      "Automated lead tracking",
      "Smart follow-ups & reminders",
      "Seamless CRM integration"
    ],
    outcome: "Stop leads falling through the cracks."
  },
  {
    title: "Missed Client Recovery",
    description: "Automated workflows to immediately re-engage missed calls or unconverted inquiries.",
    icon: RotateCcw,
    benefits: [
      "Instant follow-up sequences",
      "Automated re-engagement",
      "Higher conversion rates"
    ],
    outcome: "Turn lost opportunities into revenue."
  },
  {
    title: "Data Analysis & Insights",
    description: "Deep visibility into your business performance with AI-driven reporting.",
    icon: BarChart3,
    benefits: [
      "Real-time performance tracking",
      "Lead & conversion analysis",
      "AI-driven growth opportunities"
    ],
    outcome: "Make decisions based on data, not guesswork."
  },
  {
    title: "Inbox Advertising",
    description: "High-conversion direct response campaigns delivered straight to customer inboxes.",
    icon: Send,
    benefits: [
      "AI-powered message personalisation",
      "Direct response campaigns",
      "Higher engagement than social ads"
    ],
    outcome: "Reach your customers where they pay attention."
  },
  {
    title: "Conversion-Focused Websites",
    description: "Modern, high-speed digital storefronts designed specifically to turn visitors into booked clients.",
    icon: Globe,
    benefits: [
      "Clean, fast & mobile-optimised",
      "Designed for lead generation",
      "Integrated with AI automations"
    ],
    outcome: "A website that actually drives growth."
  }
];

const SolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Intelligent solutions for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            modern businesses
          </span>
        </h1>
        <p className="text-xl text-slate-400">
          We replace manual admin work with smart, automated systems that run 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
              <div 
                className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-primary group-hover:text-white transition-colors animate-subtle-bounce"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Icon size={24} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 mb-6 flex-grow">{item.description}</p>
              
              <div className="space-y-3 mb-8">
                {item.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 mt-auto">
                <p className="text-white font-medium text-sm mb-4">
                  <span className="text-accent">Outcome:</span> {item.outcome}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <Link 
          to="/book"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-primary/25"
        >
          See What We Can Automate
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default SolutionsPage;