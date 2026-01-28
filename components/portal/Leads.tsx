
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Lead, ApiKey } from '../../types';
import { Users, Mail, MessageSquare, Clock, Filter, Bot, Globe } from 'lucide-react';

const Leads: React.FC = () => {
  const { profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sources, setSources] = useState<ApiKey[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.tenant_id) {
      fetchLeads();
      fetchSources();
      
      // Subscribe to realtime changes
      const channel = supabase
        .channel('public:leads')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads', filter: `tenant_id=eq.${profile.tenant_id}` }, (payload) => {
            setLeads(current => [payload.new as Lead, ...current]);
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [profile]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('leads')
      .select('*')
      .eq('tenant_id', profile!.tenant_id!)
      .order('created_at', { ascending: false });
    
    if (data) setLeads(data);
    setLoading(false);
  };

  const fetchSources = async () => {
    const { data } = await supabase
        .from('api_keys')
        .select('*')
        .eq('tenant_id', profile!.tenant_id!);
    if (data) setSources(data);
  };

  const filteredLeads = selectedSource === 'all' 
    ? leads 
    : leads.filter(l => l.source === selectedSource);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Incoming Leads</h1>
            <p className="text-slate-400">Real-time data captured from your connected websites and bots.</p>
        </div>
        <div className="flex items-center gap-3">
             {/* Source Filter */}
             <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <select 
                    className="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-8 text-sm text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                >
                    <option value="all">All Sources</option>
                    {sources.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                </select>
             </div>

            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 whitespace-nowrap">
                Total: <span className="font-bold text-white">{filteredLeads.length}</span>
            </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-surface border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No leads found</h3>
            <p className="text-slate-400 mb-6">
                {selectedSource === 'all' 
                    ? "Connect your website or bot to start driving traffic." 
                    : `No leads captured from "${selectedSource}" yet.`}
            </p>
        </div>
      ) : (
        <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-slate-400 text-sm border-b border-white/5">
                            <th className="p-4 font-medium">Customer</th>
                            <th className="p-4 font-medium">Source</th>
                            <th className="p-4 font-medium">Data Preview</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
                                            {lead.customer_name?.[0] || 'G'}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{lead.customer_name || 'Guest'}</p>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Mail size={10} />
                                                {lead.customer_email || 'No email'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-xs font-medium text-slate-300 border border-white/5">
                                        {/* Simple icon logic based on name or generic */}
                                        {lead.source.toLowerCase().includes('bot') ? <Bot size={12} /> : <Globe size={12} />}
                                        {lead.source}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-start gap-2 max-w-xs">
                                        <MessageSquare size={14} className="text-slate-500 mt-1 shrink-0" />
                                        <p className="text-sm text-slate-400 truncate">
                                            {JSON.stringify(lead.data)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize
                                        ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400'}
                                    `}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-slate-500 text-sm">
                                    <div className="flex items-center justify-end gap-1">
                                        <Clock size={12} />
                                        {new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </div>
                                    <div className="text-xs opacity-50">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
