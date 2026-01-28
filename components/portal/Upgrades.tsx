
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowUpCircle, CheckCircle2, Loader2 } from 'lucide-react';

const Upgrades: React.FC = () => {
  const { profile } = useAuth();
  const [type, setType] = useState('New Automation');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.tenant_id) return;
    
    setIsSubmitting(true);

    const { error } = await supabase.from('requests').insert([{
        tenant_id: profile.tenant_id,
        type,
        description,
        priority
    }]);

    setIsSubmitting(false);

    if (!error) {
        setSubmitted(true);
        setDescription('');
    } else {
        alert("Error: " + error.message);
    }
  };

  if (submitted) {
      return (
          <div className="max-w-xl mx-auto bg-surface border border-white/10 p-8 rounded-2xl text-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Request Received</h2>
              <p className="text-slate-400 mb-6">Our team will review your request and get back to you shortly via email.</p>
              <button onClick={() => setSubmitted(false)} className="text-primary hover:text-white underline">Submit another request</button>
          </div>
      );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Upgrades & Adjustments</h1>
        <p className="text-slate-400">Need to tweak your chatbot or add a new workflow? Let us know.</p>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Request Type</label>
                <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none [&>option]:bg-surface"
                >
                    <option>New Automation</option>
                    <option>Adjust Chatbot</option>
                    <option>Booking Logic Change</option>
                    <option>Reporting Feature</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                <div className="flex gap-4">
                    {['Low', 'Medium', 'Urgent'].map(p => (
                        <label key={p} className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="priority" 
                                checked={priority === p} 
                                onChange={() => setPriority(p)}
                                className="text-primary focus:ring-primary bg-white/10 border-white/20"
                            />
                            <span className="text-slate-300">{p}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none"
                    placeholder="Describe exactly what you need changed or added..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <ArrowUpCircle size={20} />}
                Submit Request
            </button>
        </form>
      </div>
    </div>
  );
};

export default Upgrades;
