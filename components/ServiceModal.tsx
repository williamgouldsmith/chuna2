import React, { useEffect, useState } from 'react';
import { X, Sparkles, CheckCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { generateServiceExplanation } from '../services/geminiService';

interface ServiceModalProps {
  service: ServiceItem;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      setLoading(true);
      const generated = await generateServiceExplanation(service.title, service.details);
      if (mounted) {
        setContent(generated);
        setLoading(false);
      }
    };

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [service]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#0F1115] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden animate-[scale-in_0.2s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Sparkles size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">How it works</h3>
        </div>

        <h4 className="text-2xl font-bold text-white mb-2">{service.title}</h4>
        
        <div className="my-6 min-h-[100px]">
          {loading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
              <div className="h-4 bg-white/10 rounded w-4/6"></div>
              <span className="text-xs text-accent mt-2">AI is generating tailored use-case...</span>
            </div>
          ) : (
            <div className="prose prose-invert">
              <p className="text-slate-300 text-lg leading-relaxed">{content}</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
          <a 
            href="#booking" 
            onClick={onClose}
            className="flex-1 bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-center transition-colors"
          >
            Implement This
          </a>
          <button 
            onClick={onClose}
            className="flex-1 bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold py-3 px-4 rounded-xl text-center transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;