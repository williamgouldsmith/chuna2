
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, BarChart2, CreditCard, MessageSquare, ArrowUpCircle, Menu, X, LogOut, Cpu, ShieldAlert, Link as LinkIcon, Users } from 'lucide-react';

const PortalLayout: React.FC = () => {
  const { user, profile, isLoading, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Define Navigation
  let navItems = [
    { name: 'Dashboard', path: '/portal', icon: LayoutDashboard },
    { name: 'Connect Site', path: '/portal/connect', icon: LinkIcon },
    { name: 'Leads', path: '/portal/leads', icon: Users },
    { name: 'Reports', path: '/portal/reports', icon: BarChart2 },
    { name: 'Billing', path: '/portal/billing', icon: CreditCard },
    { name: 'Feedback', path: '/portal/feedback', icon: MessageSquare },
    { name: 'Upgrades', path: '/portal/upgrades', icon: ArrowUpCircle },
  ];

  if (isAdmin) {
    navItems = [
       { name: 'Master Admin', path: '/admin', icon: ShieldAlert },
       { name: 'My Dashboard', path: '/portal', icon: LayoutDashboard },
    ];
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/portal" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                <Cpu size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Chuna <span className="text-slate-500 font-normal">Portal</span></span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right hidden xl:block">
                <p className="text-sm text-white font-medium">{profile?.full_name || user.email}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{isAdmin ? 'Master Admin' : 'Client'}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
                <LogOut size={18} /> Log Out
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-300 hover:text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden">
            <div className="flex flex-col gap-2">
                <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-white font-bold text-lg">{profile?.full_name}</p>
                    <p className="text-slate-500 text-sm">{user.email}</p>
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 p-4 rounded-xl text-lg font-medium transition-all ${
                                isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-white/5 text-slate-300'
                            }`}
                        >
                            <Icon size={20} />
                            {item.name}
                        </Link>
                    );
                })}
                <button onClick={handleLogout} className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5 text-red-400 text-lg font-medium mt-4">
                    <LogOut size={20} /> Log Out
                </button>
            </div>
        </div>
      )}

      <main className="flex-1 pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto animate-[fadeIn_0.3s_ease-out]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
