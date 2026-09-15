/**
 * Healix Care Plans & Membership Tiers
 * Fully structured data model for Plans/Pricing Overview, Inclusions, and Comparison.
 * Development placeholders clearly tagged per Content Policy Rule 20, 49 & 59.
 */

export const PLANS = [
  {
    id: 'plan-essential',
    slug: 'essential-care',
    name: 'Essential Care',
    tier: 'Foundational Health',
    tagline: 'Annual diagnostic baselines and proactive health monitoring for health-conscious individuals.',
    description: 'Foundational preventative assessments, comprehensive annual blood panels, and quarterly physician guidance for individuals seeking proactive wellness peace of mind.',
    priceMonthly: '[CLIENT PRICE: $89]',
    priceAnnual: '[CLIENT PRICE: $890]',
    billingPeriod: 'per month, billed annually',
    targetAudience: 'Individuals seeking regular preventative checkups, annual blood diagnostics, and structured physician oversight.',
    isRecommended: false,
    ctaText: 'Choose Essential Care',
    features: [
      'Comprehensive Annual Health Assessment',
      'Full Metabolic & Lipid Blood Panel (60+ markers)',
      '1x Physician Consultation per Quarter',
      'Secure Digital Health Records Portal Access',
      'Clinical Email & Portal Messaging Support',
    ],
    inclusions: [
      {
        category: 'Diagnostic Screenings',
        items: ['Annual 60+ Biomarker Panel', 'Standard Resting 12-Lead ECG', 'Body Composition Baseline'],
      },
      {
        category: 'Physician Consultations',
        items: ['Annual 60-min Deep Dive Consultation', 'Quarterly 30-min Review Consultations'],
      },
      {
        category: 'Continuity & Support',
        items: ['Encrypted Portal Access', 'Biomarker Progress Trends', '48-hour Support Response'],
      },
    ],
    exclusions: [
      'Continuous Glucose Biosensor Monitoring (Available as Add-On)',
      'Same-Day Urgent Care Routing',
      'Specialist Genomics & Pharmacogenomics Sequencing',
    ],
    serviceSlugs: [
      'preventive-health-screenings',
      'nutritional-metabolic-medicine',
    ],
  },
  {
    id: 'plan-pro',
    slug: 'professional-health',
    name: 'Professional Health',
    tier: 'Comprehensive Longevity',
    tagline: 'Continuous biomarker surveillance, same-week specialist access, and custom metabolic roadmaps.',
    description: 'Advanced ongoing diagnostic tracking, high-sensitivity cardiovascular diagnostics, continuous glucose biosensors, and personalized longevity planning.',
    priceMonthly: '[CLIENT PRICE: $189]',
    priceAnnual: '[CLIENT PRICE: $1,890]',
    billingPeriod: 'per month, billed annually',
    targetAudience: 'Professionals, executives, and longevity enthusiasts seeking in-depth biomarker tracking and continuous physician stewardship.',
    isRecommended: true,
    ctaText: 'Choose Professional Care',
    features: [
      'Everything included in Essential Care',
      'High-Sensitivity Cardiovascular & Hormonal Panels',
      'Continuous Glucose Biosensor (CGM) Integration',
      'Priority Same-Week Specialist Appointments',
      'Dedicated Clinical Health Concierge',
      'Personalized Nutrition & Longevity Roadmap',
    ],
    inclusions: [
      {
        category: 'Diagnostic Screenings',
        items: ['Bi-Annual Advanced Biomarker Panels', 'Carotid & Vascular Compliance Assessment', '14-Day Continuous Glucose Monitor (CGM)'],
      },
      {
        category: 'Physician Consultations',
        items: ['Bi-Annual 60-min Specialist Consultations', 'Bi-Monthly Clinical Check-ins', 'Priority Scheduling Window'],
      },
      {
        category: 'Continuity & Support',
        items: ['Dedicated Health Concierge', 'Same-Week Telehealth Access', 'Direct Specialist Messaging Desk'],
      },
    ],
    exclusions: [
      'On-Site Corporate Team Health Pods',
      '24/7 After-Hours Dedicated Physician Telemetry',
    ],
    serviceSlugs: [
      'preventive-health-screenings',
      'digital-cardiology-suite',
      'nutritional-metabolic-medicine',
    ],
  },
  {
    id: 'plan-enterprise',
    slug: 'executive-enterprise',
    name: 'Executive & Enterprise',
    tier: 'Bespoke Corporate Care',
    tagline: 'Turnkey executive health audits and dedicated concierge care for leadership teams.',
    description: 'Customized full-spectrum health solutions, private executive suite diagnostics, 24/7 care coordination, and corporate group wellness agreements.',
    priceMonthly: '[CLIENT CUSTOM PRICING]',
    priceAnnual: '[CLIENT CUSTOM PRICING]',
    billingPeriod: 'custom enterprise agreement',
    targetAudience: 'Organizations, board members, and executive teams requiring private concierge medical stewardship and tailored employee health initiatives.',
    isRecommended: false,
    ctaText: 'Contact for Enterprise Plan',
    features: [
      'Custom Corporate Workforce & Executive Plans',
      'Single-Day Private Suite Comprehensive Health Audits',
      '24/7 Dedicated Concierge Care Coordination',
      'Neuro-Cognitive Resilience & Executive Health Dossiers',
      'HIPAA-Compliant Executive Health Analytics',
      'Direct Account Lead & Dedicated Care Coordinator',
    ],
    inclusions: [
      {
        category: 'Diagnostic Screenings',
        items: ['Full-Spectrum Executive Health Audits', 'Next-Gen Genomics & Pharmacogenomics Sequencing', 'Advanced Cardiac & Metabolic Imaging Tracks'],
      },
      {
        category: 'Physician Consultations',
        items: ['Multi-Specialist Team Consultations', 'Unlimited Virtual Consultations', 'On-Demand Executive Health Coordinator'],
      },
      {
        category: 'Continuity & Support',
        items: ['Private Suite Diagnostics', 'Corporate Consolidated Invoicing', '24/7 Priority Emergency Liaison'],
      },
    ],
    exclusions: [],
    serviceSlugs: [
      'executive-health-programs',
      'precision-genomics-screening',
      'digital-cardiology-suite',
      'preventive-health-screenings',
    ],
  },
];

export const COMPARISON_FEATURES = [
  {
    category: 'Diagnostic & Biomarker Screenings',
    items: [
      { name: 'Comprehensive Annual Biomarker Panel (60+ markers)', essential: 'Annual (1x)', pro: 'Bi-Annual (2x)', enterprise: 'Quarterly (4x)' },
      { name: 'Cardiovascular 12-Lead ECG & Hemodynamic Baseline', essential: true, pro: true, enterprise: true },
      { name: 'Advanced Hormonal & Micronutrient Panel', essential: false, pro: true, enterprise: true },
      { name: 'Continuous Glucose Monitor (CGM) Integration', essential: 'Optional Add-on', pro: 'Included (14-Day)', enterprise: 'Included (Continuous)' },
      { name: 'Clinical Genomics & Pharmacogenomics Sequencing', essential: false, pro: 'Optional Add-on', enterprise: true },
    ],
  },
  {
    category: 'Physician Care & Consultations',
    items: [
      { name: 'Physician Consultation Frequency', essential: 'Quarterly', pro: 'Bi-Monthly', enterprise: 'On-Demand / Unlimited' },
      { name: 'Dedicated Multi-Specialist Case Reviews', essential: false, pro: true, enterprise: true },
      { name: 'Same-Week Priority Scheduling', essential: false, pro: true, enterprise: true },
      { name: 'Private Executive Clinical Suite Access', essential: false, pro: false, enterprise: true },
    ],
  },
  {
    category: 'Digital Platform & Concierge Support',
    items: [
      { name: 'Secure HIPAA-Encrypted Health Portal', essential: true, pro: true, enterprise: true },
      { name: 'Biomarker Trend & Longitudinal Analytics', essential: true, pro: true, enterprise: true },
      { name: 'Dedicated Care Concierge Coordinator', essential: false, pro: true, enterprise: true },
      { name: '24/7 Emergency Physician Liaison', essential: false, false: false, enterprise: true },
    ],
  },
];

export const PLANS_FAQS = [
  {
    id: 'faq-plan-1',
    question: 'Are Healix care memberships covered by commercial health insurance or HSA/FSA accounts?',
    answer: 'While membership fees are generally billed directly to ensure unhurried physician access, many diagnostic tests and consultations can be reimbursed through Health Savings Accounts (HSA) or Flexible Spending Accounts (FSA). We provide comprehensive itemized superbills upon request.',
  },
  {
    id: 'faq-plan-2',
    question: 'Can I switch or upgrade my plan during the membership period?',
    answer: 'Yes. You can upgrade from Essential Care to Professional Health at any time with prorated billing. Your dedicated clinical advisor will assist in transitioning your diagnostic schedule seamlessly.',
  },
  {
    id: 'faq-plan-3',
    question: 'What is the cancellation policy for annual memberships?',
    answer: 'Annual memberships come with a 30-day satisfaction window. If you decide Healix is not the right fit for your healthcare needs, you may cancel within 30 days and receive a prorated refund minus any clinical tests already completed.',
  },
  {
    id: 'faq-plan-4',
    question: 'How do corporate agreements work for executive teams?',
    answer: 'Our Executive & Enterprise tier provides customized corporate agreements with centralized billing, private diagnostic suites, and tailored executive health itineraries. Speak with our corporate liaison team to request a proposal.',
  },
];
