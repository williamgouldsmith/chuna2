
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Phone' | 'Calendar' | 'Database' | 'Globe';
  details: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  metric: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

// --- Portal & Multi-Tenant Types ---

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  tenant_id: string | null;
  role: 'client' | 'admin';
  onboarding_complete: boolean;
  created_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  created_at: string;
}

export interface OnboardingData {
  id?: string;
  tenant_id?: string;
  contact_name: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  goals: string;
  metrics: string[];
  systems: {
    crm: string;
    booking: string;
    website: string;
  };
  completed?: boolean;
}

export interface Feedback {
  id: string;
  tenant_id: string;
  message: string;
  rating: number; 
  created_at: string;
}

export interface Request {
  id: string;
  tenant_id: string;
  type: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

export interface ApiKey {
  id: string;
  tenant_id: string;
  key_value: string;
  name: string;
  type?: 'website' | 'bot' | 'webhook';
  created_at: string;
}

export interface Lead {
  id: string;
  tenant_id: string;
  source: string;
  customer_name: string;
  customer_email: string;
  status: 'new' | 'contacted' | 'converted';
  data: any;
  created_at: string;
}

export interface Invoice {
  id: string;
  tenant_id: string;
  date: string;
  amount: number;
  status: 'paid' | 'open' | 'void';
  pdf_url?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  businessName?: string;
  onboardingComplete?: boolean;
  subscriptionStatus?: string;
  planId?: string;
}
