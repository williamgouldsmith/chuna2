
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Invoice } from '../../types';
import { Download, ShieldCheck, ExternalLink, CreditCard, Loader2 } from 'lucide-react';

const Billing: React.FC = () => {
  const { profile } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (profile?.tenant_id) {
      fetchBilling();
    }
  }, [profile]);

  const fetchBilling = async () => {
    // Check if we are running in mock mode and seed invoices if empty
    // This is just a helper for the "experience", in real app Stripe webhooks populate this
    const { data } = await supabase
      .from('invoices')
      .select('*')
      .eq('tenant_id', profile!.tenant_id!)
      .order('created_at', { ascending: false });
    
    if (data && data.length > 0) {
        setInvoices(data as Invoice[]);
    } else {
        // Only for demo purposes: if no invoices, maybe show nothing or mock one in memory?
        // Let's just set empty array.
        setInvoices([]);
    }
    setIsLoading(false);
  };

  const handleManageSubscription = async () => {
    setIsRedirecting(true);
    setTimeout(() => {
        alert("In a production environment, this would redirect to the secure Stripe Customer Portal.");
        setIsRedirecting(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing History</h1>
        <p className="text-slate-400">Manage your payment methods and view past invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Payment Method */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <CreditCard size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Payment Method</h3>
            </div>
            
            <div className="mb-6">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-4">Card on file</p>
                <div className="flex items-center gap-3 mb-2 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow-sm">
                        <span className="text-blue-800 font-bold text-xs italic">VISA</span>
                    </div>
                    <div>
                        <p className="text-white font-mono text-sm">•••• 4242</p>
                        <p className="text-xs text-slate-500">Expires 12/26</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleManageSubscription}
                disabled={isRedirecting}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
            >
                {isRedirecting ? <Loader2 className="animate-spin" size={16} /> : <ExternalLink size={16} />}
                Update Payment Method
            </button>
            
            <p className="text-xs text-slate-500 mt-4 text-center">
                Securely processed by Stripe.
            </p>
          </div>
        </div>

        {/* Right Column: Invoice History */}
        <div className="lg:col-span-2">
            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Invoice History</h3>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Securely stored
                </span>
                </div>
                
                {isLoading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Loader2 className="animate-spin" />
                        <p>Loading history...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {invoices.length > 0 ? (
                            invoices.map((inv) => (
                                <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                            <Download size={18} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">£{Number(inv.amount).toFixed(2)}</p>
                                            <p className="text-sm text-slate-500">{inv.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-14 sm:pl-0">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 capitalize border border-green-500/20">
                                            {inv.status}
                                        </span>
                                        <button className="text-sm text-primary hover:text-white transition-colors font-medium">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                No invoices found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
