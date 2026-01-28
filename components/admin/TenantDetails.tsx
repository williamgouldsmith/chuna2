
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, CheckCircle2, MessageSquare, ExternalLink, BrainCircuit, AlertTriangle, Lightbulb } from 'lucide-react';
import { OnboardingData, Feedback, Request } from '../../types';

const TenantDetails: React.FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [tenant, setTenant] = useState<any>(null);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tenantId) fetchDetails();
  }, [tenantId]);

  const fetchDetails = async () => {
    setLoading(true);
    // Fetch basic tenant info
    const { data: tData } = await supabase.from('tenants').select('*').eq('id', tenantId).single();
    if (tData) setTenant(tData);

    // Fetch onboarding
    const { data: oData } = await supabase.from('onboarding').select('*').eq('tenant_id', tenantId).single();
    if (oData) setOnboarding(oData);

    // Fetch feedback
    const { data: fData } = await supabase.from('feedback').select('*').eq('tenant_id', tenantId);
    if (fData) setFeedbacks(fData);

    // Fetch requests
    const { data: rData } = await supabase.from('requests').select('*').eq('tenant_id', tenantId);
    if (rData) setRequests(rData);

    setLoading(false);
  };

  const getWebsiteUrl = () => {
    if (!onboarding?.systems?.website) return null;
    let url = onboarding.systems.website;
    if (!url.startsWith('http')) url = 'https://' + url;
    return url;
  };

  const getAnalysis = () => {
    if (!onboarding) return null;
    const risks: string[] = [];
    const opportunities: string[] = [];
    
    // CRM Analysis
    if (!onboarding.systems.crm || onboarding.systems.crm.toLowerCase() === 'none' || onboarding.systems.crm === '') {
        risks.push("Missing central CRM. High risk of lead leakage.");
        opportunities.push("Deploy Pipeline Automation immediately.");
    }

    // Booking Analysis
    if (!onboarding.systems.booking || onboarding.systems.booking.toLowerCase() === 'none') {
        opportunities.push("Implement automated scheduler to reduce admin friction.");
    }

    // Goals Analysis
    if (onboarding.goals.toLowerCase().includes('call') || onboarding.goals.toLowerCase().includes('phone')) {
        opportunities.push("High candidate for AI Voice Receptionist.");
    }

    // Default if empty
    if (opportunities.length === 0) opportunities.push("System appears stable. Focus on optimization.");

    return { risks, opportunities };
  };

  const analysis = getAnalysis();
  const websiteUrl = getWebsiteUrl();

  if (loading) return <div className="p-8 text-center text-slate-500">Loading details...</div>;
  if (!tenant) return <div className="p-8 text-center text-red-500">Tenant not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">{tenant.name}</h1>
        <span className="text-sm text-slate-500">ID: {tenant.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-8">
            {/* Onboarding Info */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} /> Onboarding Data
                    </h2>
                    {websiteUrl && (
                        <a 
                            href={websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-accent transition-colors"
                        >
                            Visit Website <ExternalLink size={12} />
                        </a>
                    )}
                </div>

                <div className="bg-surface border border-white/10 rounded-2xl p-6">
                    {onboarding ? (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Contact Info</span>
                                <p className="text-white">{onboarding.contact_name}</p>
                                <p className="text-slate-400">{onboarding.phone}</p>
                                {onboarding.whatsapp && <p className="text-slate-400">WA: {onboarding.whatsapp}</p>}
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Goals</span>
                                <p className="text-slate-300 bg-white/5 p-3 rounded-lg text-sm">{onboarding.goals}</p>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Systems</span>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-white/5 p-2 rounded">CRM: {onboarding.systems.crm}</div>
                                    <div className="bg-white/5 p-2 rounded">Booking: {onboarding.systems.booking}</div>
                                    <div className="bg-white/5 p-2 rounded">Web: {onboarding.systems.website}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500 italic">Onboarding not started.</p>
                    )}
                </div>
            </div>

            {/* Automation Analysis */}
            {analysis && (
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                        <BrainCircuit className="text-purple-400" size={20} /> Automation Analysis
                    </h2>
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
                        
                        {analysis.risks.length > 0 && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                                    <AlertTriangle size={14} /> Potential Risks
                                </h4>
                                <ul className="space-y-1">
                                    {analysis.risks.map((risk, i) => (
                                        <li key={i} className="text-slate-300 text-sm list-disc list-inside">{risk}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
                                <Lightbulb size={14} /> Recommended Actions
                            </h4>
                            <ul className="space-y-1">
                                {analysis.opportunities.map((opp, i) => (
                                    <li key={i} className="text-slate-300 text-sm list-disc list-inside">{opp}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Right Column: Feedback & Requests */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-accent" size={20} /> Activity
            </h2>
            
            <div className="space-y-4">
                {/* Feature Requests */}
                <div className="bg-surface border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Upgrade Requests ({requests.length})</h3>
                    {requests.length === 0 ? <p className="text-slate-500 text-sm">No requests.</p> : (
                        <div className="space-y-3">
                            {requests.map(req => (
                                <div key={req.id} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-white text-sm">{req.type}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${req.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {req.priority}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm">{req.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Feedback */}
                <div className="bg-surface border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Feedback ({feedbacks.length})</h3>
                    {feedbacks.length === 0 ? <p className="text-slate-500 text-sm">No feedback.</p> : (
                        <div className="space-y-3">
                            {feedbacks.map(fb => (
                                <div key={fb.id} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <p className="text-slate-300 text-sm">"{fb.message}"</p>
                                    <p className="text-xs text-slate-500 mt-2">{new Date(fb.created_at).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TenantDetails;
