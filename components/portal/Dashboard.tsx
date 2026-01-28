
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, CreditCard, MessageSquare, PenTool, ShieldAlert } from 'lucide-react';
import { isMockClient } from '../../lib/supabase';

const Dashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] || 'User';

  const handleMakeAdmin = () => {
    if (window.confirm("Are you sure? This will give you Master Admin access.")) {
        // @ts-ignore
        if (typeof window.makeMeAdmin === 'function') {
            // @ts-ignore
            const success = window.makeMeAdmin(user?.email);
            if (success) {
              // Give the DB a moment to save before reloading
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
        } else {
            alert("Developer mode function not found. Please refresh the page and try again.");
        }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {firstName}</h1>
        <p className="text-slate-400 mt-2">Here's what's happening with your automation.</p>
      </div>

      {isMockClient && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
                <h3 className="text-red-400 font-bold mb-1 flex items-center gap-2">
                    <ShieldAlert size={18} /> Developer Mode
                </h3>
                <p className="text-slate-400 text-sm">You are running on a mock database. Use this to test Admin features.</p>
            </div>
            <button 
                onClick={handleMakeAdmin}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20"
            >
                Make me Master Admin
            </button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">System Status</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Operational
            </span>
          </div>
          <div className="text-2xl font-bold text-white">Active</div>
        </div>

        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Leads Captured (30d)</h3>
            <Activity size={18} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-white flex items-end gap-2">
            0
            <span className="text-sm text-slate-500 font-medium mb-1 flex items-center">
               -
            </span>
          </div>
        </div>

        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Admin Hours Saved</h3>
            <Activity size={18} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-white">0 hrs</div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/portal/reports" className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Activity size={20} />
          </div>
          <div className="font-medium text-white">View Reports</div>
          <p className="text-xs text-slate-500 mt-1">Check performance</p>
        </Link>

        <Link to="/portal/billing" className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CreditCard size={20} />
          </div>
          <div className="font-medium text-white">Billing</div>
          <p className="text-xs text-slate-500 mt-1">Invoices & Plans</p>
        </Link>

        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare size={20} />
          </div>
          <div className="font-medium text-white">WhatsApp</div>
          <p className="text-xs text-slate-500 mt-1">Direct support</p>
        </a>

        <Link to="/portal/feedback" className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <PenTool size={20} />
          </div>
          <div className="font-medium text-white">Request Changes</div>
          <p className="text-xs text-slate-500 mt-1">System updates</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
