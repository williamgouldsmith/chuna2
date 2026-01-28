

import { User, OnboardingData, Invoice } from '../types';

// Mock Data Store
let currentUser: User | null = null;
const MOCK_INVOICES: Invoice[] = [];

export const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate login success
        currentUser = {
          id: 'user_1',
          email,
          name: 'Business Owner',
          onboardingComplete: false, // Default to false to show flow
          subscriptionStatus: 'active',
          planId: 'growth',
        };
        resolve(currentUser);
      }, 800);
    });
  },

  logout: async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        currentUser = null;
        resolve();
      }, 500);
    });
  },

  getCurrentUser: async () => {
    return currentUser;
  }
};

export const mockDb = {
  saveOnboarding: async (data: OnboardingData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentUser) {
          // currentUser.businessName = data.businessName; // Removed: businessName not in OnboardingData
          currentUser.onboardingComplete = true;
        }
        resolve();
      }, 1000);
    });
  },

  submitFeedback: async (text: string, rating: number) => {
    return new Promise((resolve) => setTimeout(resolve, 600));
  },

  submitUpgradeRequest: async (type: string, description: string) => {
    return new Promise((resolve) => setTimeout(resolve, 600));
  }
};

export const mockStripe = {
  getInvoices: async (): Promise<Invoice[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_INVOICES), 500));
  },
  
  createPortalSession: async (): Promise<string> => {
    // In a real app, this returns a URL to redirect to Stripe
    return new Promise((resolve) => setTimeout(() => resolve('https://billing.stripe.com/p/session/test'), 800));
  }
};