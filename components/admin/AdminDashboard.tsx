
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Search, ChevronRight, Activity, Database } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: tData } = await supabase.from('tenants').select('*').order('created_at', { ascending: false });
    const { data: pData } = await supabase.from('profiles').select('*');
    if (tData) setTenants(tData);
    if (pData) setProfiles(pData);
    setLoading(false);
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Master Admin</h1>
        <p className="text-slate-400">Overview of all client businesses.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Total Clients</h3>
            <Briefcase size={18} className="text-primary" />
          </div>
          <div className="text-3xl font-bold text-white">{tenants.length}</div>
        </div>
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Total Users</h3>
            <Users size={18} className="text-accent" />
          </div>
          <div className="text-3xl font-bold text-white">{profiles.length}</div>
        </div>
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">System Health</h3>
            <Activity size={18} className="text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">Operational</div>
        </div>
      </div>

      {/* Tenant List */}
      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-white">Client Businesses</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search clients..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-white text-sm focus:border-primary focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading data...</div>
          ) : filteredTenants.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No clients found.</div>
          ) : (
            filteredTenants.map(tenant => {
              const users = profiles.filter(p => p.tenant_id === tenant.id);
              const owner = users[0]; // Simple assumption

              return (
                <Link to={`/admin/tenants/${tenant.id}`} key={tenant.id} className="block hover:bg-white/5 transition-colors">
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{tenant.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                         <span>{users.length} User{users.length !== 1 && 's'}</span>
                         <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                         <span>Created {new Date(tenant.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${owner?.onboarding_complete ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                          {owner?.onboarding_complete ? "Active" : "Onboarding"}
                      </span>
                      <ChevronRight className="text-slate-600" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
