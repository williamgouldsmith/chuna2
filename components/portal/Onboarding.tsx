
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ChevronRight, Loader2 } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tenantName, setTenantName] = useState('');
  
  const [formData, setFormData] = useState({
    contactName: '',
    phone: '',
    whatsapp: '',
    website: '',
    goals: '',
    metrics: [] as string[],
    systems: {
      crm: '',
      booking: '',
      website: '',
    }
  });

  // Pre-fill
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        contactName: profile.full_name || '',
      }));
      if (profile.tenant_id) {
        supabase.from('tenants').select('name').eq('id', profile.tenant_id).single()
          .then(({ data }) => { if (data) setTenantName(data.name); });
      }
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!profile?.tenant_id) {
      alert("System Error: No Tenant ID found for your user. Please contact support.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert Onboarding Data
      const { error: obError } = await supabase.from('onboarding').insert([{
        tenant_id: profile.tenant_id,
        contact_name: formData.contactName,
        phone: formData.phone,
        goals: formData.goals,
        metrics: formData.metrics,
        systems: formData.systems
      }]);

      if (obError) throw obError;

      // 2. Mark profile complete
      const { error: profError } = await supabase.from('profiles')
        .update({ onboarding_complete: true })
        .eq('id', user.id);

      if (profError) throw profError;

      await refreshProfile();
      navigate('/portal');
    } catch (err: any) {
      console.error(err);
      alert("Failed to save: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMetric = (metric: string) => {
    setFormData(prev => {
      const exists = prev.metrics.includes(metric);
      return {
        ...prev,
        metrics: exists 
          ? prev.metrics.filter(m => m !== metric)
          : [...prev.metrics, metric]
      };
    });
  };

  return (
    <div className="min-h-screen pt-20 px-6 bg-background flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-2 rounded-full bg-surface border border-white/5 overflow-hidden">
              <div className={`h-full bg-primary transition-all duration-500 ${s <= step ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        <div className="bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {step === 1 && `Welcome, ${tenantName || 'Partner'}`}
              {step === 2 && "What are your goals?"}
              {step === 3 && "Your Tech Stack"}
            </h1>
            <p className="text-slate-400">Step {step} of 3</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
                    <p className="text-blue-200 text-sm">We need a few details to configure your automation dashboard.</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Primary Contact Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                    value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">WhatsApp (Optional)</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                      value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Primary goals for automation?</label>
                  <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                    placeholder="e.g. Save admin time, stop missing calls..."
                    value={formData.goals} onChange={e => setFormData({...formData, goals: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-3">Metrics to improve</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Leads Generated', 'Bookings', 'Missed Calls', 'Admin Time Saved', 'Conversion Rate', 'Revenue'].map(m => (
                      <label key={m} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.metrics.includes(m) ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                        <input type="checkbox" className="hidden" checked={formData.metrics.includes(m)} onChange={() => toggleMetric(m)} />
                        <span className="text-sm font-medium">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">CRM System</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                    placeholder="e.g. HubSpot, Salesforce, None"
                    value={formData.systems.crm} onChange={e => setFormData({...formData, systems: { ...formData.systems, crm: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Booking System</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                    placeholder="e.g. Calendly, Acuity"
                    value={formData.systems.booking} onChange={e => setFormData({...formData, systems: { ...formData.systems, booking: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Website Platform</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none" 
                    placeholder="e.g. WordPress, Wix"
                    value={formData.systems.website} onChange={e => setFormData({...formData, systems: { ...formData.systems, website: e.target.value}})} />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-white/10 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 text-slate-400 hover:text-white transition-colors">
                  Back
                </button>
              ) : <div />}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (
                  <>
                    {step === 3 ? "Complete Setup" : "Next Step"}
                    {step < 3 && <ChevronRight size={18} />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
