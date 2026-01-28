
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ApiKey } from '../../types';
import { Link2, Copy, Check, Terminal, Globe, Plus, Bot, Webhook, X, Info } from 'lucide-react';

const Connect: React.FC = () => {
  const { profile } = useAuth();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'website' | 'bot' | 'webhook'>('website');

  useEffect(() => {
    if (profile?.tenant_id) {
      fetchKeys();
    }
  }, [profile]);

  const fetchKeys = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('tenant_id', profile!.tenant_id!)
      .order('created_at', { ascending: false });
    
    if (data) setKeys(data);
    setLoading(false);
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.tenant_id || !newKeyName) return;

    // Generate a random key
    const randomKey = 'chuna_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const { error } = await supabase
      .from('api_keys')
      .insert([{ 
          tenant_id: profile.tenant_id, 
          name: newKeyName, 
          key_value: randomKey,
          type: newKeyType
      }]);

    if (error) alert(error.message);
    else {
        setIsModalOpen(false);
        setNewKeyName('');
        fetchKeys();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Test Ingestion Function (Simulates external site)
  const simulateExternalLead = async (apiKey: string, sourceName: string) => {
    const email = prompt(`Simulate Lead for ${sourceName}\nEnter Customer Email:`);
    if (!email) return;

    const { error } = await supabase.from('leads').insert([{
        tenant_id: profile!.tenant_id,
        source: sourceName, // This ensures it tracks back to the specific bot/site
        customer_name: 'Test Visitor',
        customer_email: email,
        data: { message: 'Hello from connected source!', browser: 'Chrome', simulated: true }
    }]);

    if (error) alert("Ingestion failed: " + error.message);
    else alert(`Success! Data sent to 'Leads' tab from ${sourceName}.`);
  };

  const getIconForType = (type?: string) => {
      switch(type) {
          case 'bot': return <Bot size={18} className="text-accent" />;
          case 'webhook': return <Webhook size={18} className="text-purple-400" />;
          default: return <Globe size={18} className="text-primary" />;
      }
  };

  const getTypeLabel = (type?: string) => {
      switch(type) {
          case 'bot': return 'Automation Bot';
          case 'webhook': return 'Webhook Source';
          default: return 'Website Widget';
      }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Integrations & Sources</h1>
        <p className="text-slate-400">Add custom websites, automation bots, and webhooks to feed data into your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Key Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Link2 className="text-primary" size={20} /> Connected Sources
              </h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
              >
                <Plus size={16} /> Add Source
              </button>
            </div>

            {loading ? (
              <div className="text-slate-500 text-center py-8">Loading sources...</div>
            ) : keys.length === 0 ? (
              <div className="text-slate-500 text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No websites or bots connected yet.</p>
                <button onClick={() => setIsModalOpen(true)} className="text-primary text-sm font-semibold mt-2 hover:underline">
                    Add your first source
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {keys.map((key) => (
                  <div key={key.id} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-black/40 rounded-lg">
                             {getIconForType(key.type)}
                        </div>
                        <div>
                            <span className="font-bold text-white block">{key.name}</span>
                            <span className="text-xs text-slate-500">{getTypeLabel(key.type)} • Added {new Date(key.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button 
                            onClick={() => simulateExternalLead(key.key_value, key.name)}
                            className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-slate-300 transition-colors"
                        >
                            Test Data Flow
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {/* API Key Display */}
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">API Key</p>
                            <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
                                <code className="text-xs text-accent font-mono flex-1 truncate">{key.key_value}</code>
                                <button 
                                    onClick={() => copyToClipboard(key.key_value, key.id)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                    title="Copy API Key"
                                >
                                    {copiedId === key.id ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Webhook URL Display (Mock) */}
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Webhook Endpoint</p>
                            <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
                                <code className="text-xs text-slate-400 font-mono flex-1 truncate">
                                    https://api.chuna.ai/v1/hooks/{profile?.tenant_id?.substring(0,8)}/{key.id.substring(0,8)}
                                </code>
                                <button 
                                    onClick={() => copyToClipboard(`https://api.chuna.ai/v1/hooks/${profile?.tenant_id}/${key.id}`, key.id + 'hook')}
                                    className="text-slate-400 hover:text-white transition-colors"
                                    title="Copy Webhook URL"
                                >
                                    {copiedId === key.id + 'hook' ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-accent" /> Integration Guide
            </h3>
            
            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Globe size={14} /> For Websites
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">
                        Embed the JS widget in your <code>&lt;head&gt;</code> tag.
                    </p>
                    <div className="bg-black/50 border border-white/5 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-[10px] text-slate-300 font-mono whitespace-pre-wrap">
{`<script 
 src="https://cdn.chuna.ai/widget.js" 
 data-key="YOUR_API_KEY"
 async
></script>`}
                        </pre>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Bot size={14} /> For Custom Bots
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">
                        Send JSON payloads to the Webhook Endpoint.
                    </p>
                    <div className="bg-black/50 border border-white/5 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-[10px] text-slate-300 font-mono whitespace-pre-wrap">
{`POST /v1/hooks/...
{
  "customer_email": "...",
  "message": "..."
}`}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3">
                <Info className="text-blue-400 shrink-0" size={16} />
                <p className="text-xs text-blue-200">
                    All data sent via these keys will appear instantly in your <span className="font-bold">Leads</span> dashboard.
                </p>
            </div>
          </div>
        </div>

      </div>

      {/* Create Source Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="relative bg-surface border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-[scale-in_0.2s_ease-out]">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-white mb-1">Add New Source</h2>
                <p className="text-sm text-slate-400 mb-6">Create credentials for a new integration.</p>

                <form onSubmit={handleCreateKey}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Source Name</label>
                        <input 
                            type="text" 
                            required
                            placeholder="e.g. Marketing Site, Support Bot"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setNewKeyType('website')}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${newKeyType === 'website' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                            >
                                <Globe size={20} />
                                <span className="text-xs font-medium">Website</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setNewKeyType('bot')}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${newKeyType === 'bot' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                            >
                                <Bot size={20} />
                                <span className="text-xs font-medium">Bot</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setNewKeyType('webhook')}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${newKeyType === 'webhook' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                            >
                                <Webhook size={20} />
                                <span className="text-xs font-medium">Webhook</span>
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        Generate API Key
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
