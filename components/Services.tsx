
import React from 'react';
import { SERVICES } from '../constants';
import { ServiceItem } from '../types';
import { Phone, Calendar, Database, Globe, Sparkles } from 'lucide-react';

interface ServicesProps {
  onServiceClick: (service: ServiceItem) => void;
}

const iconMap = {
  Phone,
  Calendar,
  Database,
  Globe,
};

const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Solutions</h2>
        <p className="text-slate-400 max-w-xl text-lg">
          We implement modern infrastructure to streamline your operations and enhance the client experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.iconName];
          return (
            <div 
              key={service.id}
              onClick={() => onServiceClick(service)}
              className="group relative p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-accent mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 animate-subtle-bounce"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <button 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors"
                >
                  <Sparkles size={16} className="text-accent group-hover:text-white transition-colors" />
                  See Business Impact
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
