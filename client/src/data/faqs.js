/**
 * Healix Healthcare Frequently Asked Questions Data
 * Structured data model for FAQ Center and Homepage Quick FAQ.
 * Factual and evidence-guided per Content Policy.
 */

export const FAQ_CATEGORIES = [
  'All Questions',
  'General & Model',
  'Services & Diagnostics',
  'Care Plans & Billing',
  'Physicians & Appointments',
  'Privacy & Security',
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How does Healix differ from traditional primary care clinics?',
    answer: 'Healix emphasizes proactive, predictive, and personalized care. Instead of waiting for symptoms to appear, our physician-led diagnostic assessments identify sub-clinical risk factors early, combining advanced biomarker profiling with continuous lifestyle and clinical guidance.',
    category: 'General & Model',
    tags: ['Proactive Care', 'Preventative Medicine', 'Clinical Model'],
    isPriority: true,
    relatedLink: {
      text: 'Explore Our Approach',
      url: '/about',
    },
  },
  {
    id: 'faq-2',
    question: 'Are Healix diagnostic assessments covered by health insurance?',
    answer: 'Depending on your specific carrier and plan, certain standard laboratory tests and physician consultations may be eligible for insurance reimbursement or HSA/FSA allocation. We provide itemized superbills for patient-submitted claims.',
    category: 'Care Plans & Billing',
    tags: ['Insurance', 'HSA', 'FSA', 'Billing', 'Superbills'],
    isPriority: true,
    relatedLink: {
      text: 'View Membership Plans',
      url: '/plans',
    },
  },
  {
    id: 'faq-3',
    question: 'How quickly can I schedule an initial evaluation?',
    answer: 'New patient intake assessments can typically be scheduled within 3 to 5 business days. For urgent executive evaluations or corporate screenings, expedited arrangements are available through our concierge care team.',
    category: 'Physicians & Appointments',
    tags: ['Scheduling', 'Appointments', 'Concierge', 'Executive'],
    isPriority: true,
    relatedLink: {
      text: 'Request Consultation',
      url: '/contact',
    },
  },
  {
    id: 'faq-4',
    question: 'Can I maintain my existing primary care physician while using Healix?',
    answer: 'Yes, absolutely. Healix works collaboratively alongside your existing medical team. We provide secure, comprehensive clinical summary reports that can be directly shared with your primary care provider or specialist.',
    category: 'General & Model',
    tags: ['Primary Care', 'Care Coordination', 'Medical Records'],
    isPriority: true,
    relatedLink: {
      text: 'Meet Our Medical Team',
      url: '/professionals',
    },
  },
  {
    id: 'faq-5',
    question: 'How is patient medical privacy and health data protected?',
    answer: 'Healix adheres to strict HIPAA compliance protocols. All health records, laboratory results, and communications are safeguarded with end-to-end encryption and enterprise-grade access controls.',
    category: 'Privacy & Security',
    tags: ['HIPAA', 'Privacy', 'Security', 'Encryption', 'Data'],
    isPriority: true,
    relatedLink: {
      text: 'Review Privacy Policy',
      url: '/privacy',
    },
  },
  {
    id: 'faq-6',
    question: 'What is included in the Comprehensive Preventative Health Screening?',
    answer: 'Our baseline screening includes a 100+ biomarker blood evaluation (advanced lipids, metabolic hormones, inflammation, micronutrients), resting 12-lead ECG, body composition analytics, and a 60-minute physician consultation.',
    category: 'Services & Diagnostics',
    tags: ['Screening', 'Biomarkers', 'Diagnostics', 'Cardiology', 'ECG'],
    isPriority: false,
    relatedLink: {
      text: 'Preventive Health Screenings',
      url: '/services/preventive-health-screenings',
    },
  },
  {
    id: 'faq-7',
    question: 'How do continuous biosensors and remote telemetry work with Healix?',
    answer: 'For enrolled members, we deploy medical-grade continuous glucose monitors (CGMs) and cardiovascular patches that stream physiological data to secure physician review portals for personalized lifestyle calibration.',
    category: 'Services & Diagnostics',
    tags: ['Biosensors', 'CGM', 'Telemetry', 'Digital Health'],
    isPriority: false,
    relatedLink: {
      text: 'Nutritional & Metabolic Medicine',
      url: '/services/nutritional-metabolic-medicine',
    },
  },
  {
    id: 'faq-8',
    question: 'What is the cancellation or plan change policy for memberships?',
    answer: 'Care plans operate on monthly or annual billing cycles. Members can adjust or cancel their membership tier with 30 days written notice before their next renewal date, with no long-term lock-in penalties.',
    category: 'Care Plans & Billing',
    tags: ['Cancellation', 'Plans', 'Billing', 'Refunds'],
    isPriority: false,
    relatedLink: {
      text: 'Compare Plan Tiers',
      url: '/plans',
    },
  },
  {
    id: 'faq-9',
    question: 'Are genetic testing and pharmacogenomics included in standard evaluations?',
    answer: 'Targeted clinical genomics and pharmacogenomic drug-compatibility panels are standard in the Longevity Architecture plan and available as specialized add-on diagnostic modules across all other tiers.',
    category: 'Services & Diagnostics',
    tags: ['Genomics', 'DNA', 'Pharmacogenomics', 'Precision Medicine'],
    isPriority: false,
    relatedLink: {
      text: 'Precision Genomics Screening',
      url: '/services/precision-genomics-screening',
    },
  },
  {
    id: 'faq-10',
    question: 'Who are the physicians providing clinical reviews at Healix?',
    answer: 'All Healix consultations are led by board-certified physicians specializing in preventative cardiology, metabolic endocrinology, integrative medicine, and molecular genomics.',
    category: 'Physicians & Appointments',
    tags: ['Physicians', 'Doctors', 'Credentials', 'Medical Directors'],
    isPriority: false,
    relatedLink: {
      text: 'View Physician Credentials',
      url: '/professionals',
    },
  },
];
