import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ title, content, onClose }) => {
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
      <div className="relative bg-[#0F1115] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-[scale-in_0.2s_ease-out]">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">{content}</p>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 bg-[#0F1115] rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-xl text-center transition-colors border border-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;