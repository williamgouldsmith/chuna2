
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, ArrowUp } from 'lucide-react';

const Reports: React.FC = () => {
  const { profile } = useAuth();
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    if (profile?.tenant_id) {
        // Simple count of leads
        const fetchStats = async () => {
            const { count } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true })
                .eq('tenant_id', profile.tenant_id!);
            
            if (count !== null) setLeadCount(count);
        };
        fetchStats();
    }
  }, [profile]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Performance Reports</h1>
          <p className="text-slate-400">Real-time data on your automated systems.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            <button className="px-4 py-1.5 rounded-md bg-primary text-white text-sm font-medium shadow">Monthly</button>
            <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white text-sm font-medium transition-colors">Annual</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leads Chart */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <BarChart size={18} className="text-primary" />
                Leads Generated
            </h3>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
                {leadCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                       No data available yet
                    </div>
                )}
                
                {/* Visual Placeholder for chart bars if no sophisticated charting lib is used */}
                {[0, 0, 0, 0, 0, 0, 0, 0].map((h, i) => (
                    <div key={i} className="w-full bg-white/5 rounded-t-lg transition-all relative group" style={{ height: leadCount > 0 && i === 7 ? '40%' : '4px' }}>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium uppercase">
                <span>Wk 1</span>
                <span>Wk 4</span>
                <span>Current</span>
            </div>
        </div>

        {/* Conversion Stats */}
        <div className="space-y-6">
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
                <h3 className="text-slate-400 font-medium text-sm mb-4">Total Leads All-Time</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">{leadCount}</span>
                    <span className="text-green-400 text-sm font-bold flex items-center mb-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                         <ArrowUp size={12} className="mr-1" /> Active
                    </span>
                </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-6">
                <h3 className="text-slate-400 font-medium text-sm mb-4">Missed Calls Recovered</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">0</span>
                    <span className="text-slate-500 text-sm font-bold flex items-center mb-1 px-2 py-0.5 rounded-full">
                         -
                    </span>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                    Call tracking data integration coming soon.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
