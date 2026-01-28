
import { ServiceItem, TestimonialItem, StepItem } from './types';

// System Constants
export const ADMIN_EMAIL = "wgouldie.business@gmail.com";
export const APP_NAME = "Chuna";

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '24/7 Client Reception',
    description: 'A missed call is a missed opportunity. Ensure every client is answered 24/7, with bookings handled instantly—never let a lead slip away.',
    iconName: 'Phone',
    details: 'A virtual reception system that handles inbound calls, answers service FAQs, and books appointments directly into your calendar 24/7.'
  },
  {
    id: '2',
    title: 'Smart Scheduling & Recovery',
    description: 'Eliminate no-shows with automated confirmations, reminders, and effortless rebooking workflows.',
    iconName: 'Calendar',
    details: 'Intelligent SMS and email workflows that confirm appointments, remind customers, and automatically recover cancelled slots to keep your schedule full.'
  },
  {
    id: '3',
    title: 'Pipeline Automation',
    description: 'Centralise your client data and automate follow-ups to turn more inquiries into booked jobs.',
    iconName: 'Database',
    details: 'Connects all your lead sources to a central dashboard, tags them instantly, and triggers immediate professional follow-up sequences.'
  },
  {
    id: '4',
    title: 'Conversion-Focused Websites',
    description: 'Modern, high-performance digital storefronts designed specifically to capture and convert service inquiries.',
    iconName: 'Globe',
    details: 'High-performance websites built with conversion funnels in mind, integrated directly with your booking systems.'
  }
];

export const STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Audit & Analysis',
    description: 'We analyse your current service workflow to identify bottlenecks, admin heavy tasks, and missed opportunities.'
  },
  {
    number: '02',
    title: 'Modernise Infrastructure',
    description: 'We implement custom tools and automations that fit seamlessly into your existing operations.'
  },
  {
    number: '03',
    title: 'Growth & Efficiency',
    description: 'Continuous monitoring and refinement of your systems to ensure maximum efficiency and client satisfaction.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: "We used to miss 30% of calls during lunch. Now Chuna handles everything.",
    author: "Sarah Jenkins",
    role: "Clinic Owner",
    metric: "40+ hours saved/mo"
  },
  {
    id: 't2',
    quote: "The no-show recovery workflow alone paid for the service in the first week.",
    author: "Mike Ross",
    role: "HVAC Director",
    metric: "25% revenue increase"
  },
  {
    id: 't3',
    quote: "Finally, a website that actually gets me leads instead of just sitting there.",
    author: "David Chen",
    role: "Legal Consultant",
    metric: "3x lead volume"
  }
];

export const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: `Last updated: ${new Date().toLocaleDateString()}

1. Introduction
Chuna ("we", "our", or "us") is committed to protecting your privacy. This policy details how we collect, use, and safeguard your personal data.

2. Data We Collect
We may collect Identity Data (names), Contact Data (email, phone), and Technical Data (IP addresses).

3. How We Use Your Data
To deliver AI automation services, manage our relationship, and improve our website.

4. Contact
For any privacy concerns, please contact us at hello@chuna.ai.`
  },
  cookies: {
    title: "Cookie Policy",
    content: `We use cookies to ensure the site functions correctly and to analyse traffic.`
  },
  terms: {
    title: "Terms & Conditions",
    content: `By engaging our services, you agree to these Terms. We provide AI automation solutions. You retain ownership of your customer data.`
  }
};
