
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { PenTool, Send, Loader2 } from 'lucide-react';

const Feedback: React.FC = () => {
  const { profile } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.tenant_id) return;

    setIsSubmitting(true);
    
    const { error } = await supabase.from('feedback').insert([{
        tenant_id: profile.tenant_id,
        message: feedback,
        rating: 5 // Default good rating, can add UI for stars if needed
    }]);

    setIsSubmitting(false);

    if (!error) {
        setSubmitted(true);
        setFeedback('');
    } else {
        alert("Failed to submit: " + error.message);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
            <Send size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Request Sent!</h2>
        <p className="text-slate-400 mb-8">We've received your request for changes. Our team will review it and get back to you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="text-primary hover:text-white transition-colors underline">
            Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Feature Requests & Changes</h1>
        <p className="text-slate-400">Suggest a feature or request a change to your system.</p>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description of change or feature</label>
                <textarea
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none placeholder:text-slate-600"
                    placeholder="Describe the feature you'd like to add or the change you need..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <PenTool size={18} />}
                Submit Request
            </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
