
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import BookCall from './components/BookCall';
import SolutionsPage from './components/SolutionsPage';
import ProcessPage from './components/ProcessPage';
import ResultsPage from './components/ResultsPage';
import AboutPage from './components/AboutPage';
import LegalModal from './components/LegalModal';
import { LEGAL_CONTENT } from './constants';

// Auth & Portal Imports
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import PortalLayout from './components/portal/PortalLayout';
import Dashboard from './components/portal/Dashboard';
import Reports from './components/portal/Reports';
import Billing from './components/portal/Billing';
import Feedback from './components/portal/Feedback';
import Upgrades from './components/portal/Upgrades';
import AdminDashboard from './components/admin/AdminDashboard';
import TenantDetails from './components/admin/TenantDetails';
import Connect from './components/portal/Connect';
import Leads from './components/portal/Leads';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Admin Guard
const RequireAdmin = ({ children }: { children?: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAdmin) return <div className="text-white text-center pt-20">Access Denied</div>;
  return <>{children}</>;
};

const Layout: React.FC = () => {
  const [legalType, setLegalType] = useState<'privacy' | 'cookies' | 'terms' | null>(null);
  const location = useLocation();

  // Hide header/footer on portal routes
  const isPortal = location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin');

  const handleOpenLegal = (type: 'privacy' | 'cookies' | 'terms') => {
    setLegalType(type);
  };

  const handleCloseLegal = () => {
    setLegalType(null);
  };

  return (
    <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden flex flex-col">
      <ScrollToTop />
      {!isPortal && <Header />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookCall />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<BookCall />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Portal Routes */}
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="connect" element={<Connect />} />
            <Route path="leads" element={<Leads />} />
            <Route path="reports" element={<Reports />} />
            <Route path="billing" element={<Billing />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="upgrades" element={<Upgrades />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <RequireAdmin>
               <PortalLayout />
            </RequireAdmin>
          }>
             <Route index element={<AdminDashboard />} />
             <Route path="tenants/:tenantId" element={<TenantDetails />} />
          </Route>

        </Routes>
      </main>

      {!isPortal && <Footer onOpenLegal={handleOpenLegal} />}

      {legalType && (
        <LegalModal 
          title={LEGAL_CONTENT[legalType].title}
          content={LEGAL_CONTENT[legalType].content}
          onClose={handleCloseLegal}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
