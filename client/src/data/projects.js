/**
 * Healix Healthcare Case Studies & Portfolio Data
 * Fully structured data model for Portfolio Overview and Dynamic Case Study Details.
 * Development placeholders clearly tagged per Content Policy Rule 49 & 59.
 */

export const PROJECT_CATEGORIES = [
  'All Projects',
  'Corporate Healthcare',
  'Clinical Innovation',
  'Preventative Diagnostics',
  'Longevity Medicine',
];

export const PROJECTS = [
  {
    id: 'proj-1',
    slug: 'rapid-cardiac-risk-screening-initiative',
    title: 'Enterprise Preventative Cardiac Health Initiative',
    category: 'Corporate Healthcare',
    clientType: 'Technology Enterprise (1,200+ Personnel)',
    year: '2024–2025',
    isFeatured: true,
    tagline: 'Proactive on-site cardiology screenings and rapid physician triage for corporate workforce resilience.',
    summary: 'A proactive corporate wellness overhaul delivering measurable risk reduction across 1,200+ employees through structured preventative screenings, resting ECGs, and digital cardiology dashboards.',
    challenge: '[CLIENT CASE STUDY CHALLENGE] A high-intensity technology workforce experienced rising rates of unaddressed hypertension, irregular sleep rhythms, and undiagnosed cardiovascular risk markers, with standard annual health reviews failing to capture early asymptomatic events.',
    approach: 'Healix deployed on-site diagnostic pods equipped with high-resolution 12-lead resting ECGs, arterial stiffness testing, and rapid biomarker collection. Results were synthesized by board-certified cardiologists with same-week virtual follow-ups.',
    solution: '[CLIENT CASE STUDY SOLUTION] Integrated biometric screening pods paired with continuous digital rhythm patches for elevated-risk cohorts, supported by direct physician consultations and actionable lifestyle mitigation roadmaps.',
    outcomes: [
      '[CLIENT METRIC] 94% voluntary workforce participation across 30 days',
      '[CLIENT METRIC] 38 critical asymptomatic cardiovascular risk profiles intercepted early',
      '[CLIENT METRIC] 82% of identified participants maintained lifestyle adherence at 6-month checkup',
      '[CLIENT METRIC] Measurable reduction in health insurance claim escalations',
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    ],
    tags: ['Cardiology', 'Corporate Health', 'Preventative Diagnostics', 'Workforce Wellness'],
    serviceSlugs: [
      'digital-cardiology-suite',
      'preventive-health-screenings',
      'executive-health-programs',
    ],
    relatedProjectIds: ['proj-2', 'proj-3', 'proj-4'],
  },
  {
    id: 'proj-2',
    slug: 'metabolic-longevity-clinic-modernization',
    title: 'Precision Metabolic Diagnostic Suite Deployment',
    category: 'Clinical Innovation',
    clientType: 'Regional Specialty Medical Group',
    year: '2024',
    isFeatured: false,
    tagline: 'Modernizing legacy clinical workflows with point-of-care metabolic testing and continuous glucose telemetry.',
    summary: 'Modernizing regional clinic workflows with high-precision metabolic biomarker tracking, 14-day continuous glucose monitoring integration, and frictionless digital patient communication.',
    challenge: '[CLIENT CASE STUDY CHALLENGE] Legacy diagnostic workflows delayed metabolic biomarker evaluations by up to 14 days, leading to patient drop-off and delayed lifestyle intervention planning for pre-diabetic cohorts.',
    approach: 'Transitioned the clinic to point-of-care rapid testing combined with 14-day continuous glucose sensors and direct physician review dashboards, condensing multi-week evaluations into same-day clinical visits.',
    solution: '[CLIENT CASE STUDY SOLUTION] Deployed rapid point-of-care metabolic testing, continuous biosensor integrations, and connected patient health portals for real-time nutritional and metabolic guidance.',
    outcomes: [
      '[CLIENT METRIC] Diagnostic turnaround reduced from 14 days to same-day delivery',
      '[CLIENT METRIC] 88% patient lifestyle protocol adherence score across 12 months',
      '[CLIENT METRIC] 3.4x increase in patient engagement via secure digital health portals',
      '[CLIENT METRIC] Enhanced clinical satisfaction across interdisciplinary medical staff',
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80',
    ],
    tags: ['Metabolic Care', 'Clinical Workflow', 'Patient Portal', 'Biosensors'],
    serviceSlugs: [
      'nutritional-metabolic-medicine',
      'preventive-health-screenings',
    ],
    relatedProjectIds: ['proj-1', 'proj-3', 'proj-4'],
  },
  {
    id: 'proj-3',
    slug: 'executive-longevity-health-consortium',
    title: 'Executive Longevity & Resilience Program',
    category: 'Longevity Medicine',
    clientType: 'Financial Services Leadership Group',
    year: '2025',
    isFeatured: false,
    tagline: 'Comprehensive single-day executive medical evaluations combining neuro-stress and cardiovascular analytics.',
    summary: 'A private suite diagnostic program designed for 150 senior financial executives, integrating resting cardiorespiratory analytics, neuro-stress profiling, and bespoke longevity action plans.',
    challenge: '[CLIENT CASE STUDY CHALLENGE] Managing partners and senior executives faced severe cognitive fatigue, frequent international travel burnout, and fragmented medical care spread across multiple independent specialists.',
    approach: 'Consolidated complex multi-specialist evaluations into a streamlined, half-day private suite experience covering full-panel blood biomarkers, autonomic testing, and personalized physician roadmaps.',
    solution: '[CLIENT CASE STUDY SOLUTION] Established a dedicated executive health suite offering multi-specialist consultations, sleep architecture analysis, and direct clinical concierge stewardship.',
    outcomes: [
      '[CLIENT METRIC] 100% executive participant completion with zero workflow disruption',
      '[CLIENT METRIC] 42% improvement in reported sleep quality and daytime energy levels',
      '[CLIENT METRIC] 96% participant satisfaction with personalized longevity roadmaps',
    ],
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80',
    ],
    tags: ['Executive Health', 'Longevity Medicine', 'Cognitive Resilience', 'Concierge Care'],
    serviceSlugs: [
      'executive-health-programs',
      'preventive-health-screenings',
      'digital-cardiology-suite',
    ],
    relatedProjectIds: ['proj-1', 'proj-2', 'proj-4'],
  },
  {
    id: 'proj-4',
    slug: 'hereditary-genomics-screening-deployment',
    title: 'Preventative Clinical Genomics Integration',
    category: 'Preventative Diagnostics',
    clientType: 'Integrative Wellness Center',
    year: '2025',
    isFeatured: false,
    tagline: 'Integrating next-generation clinical sequencing and pharmacogenomics into primary care pathways.',
    summary: 'Equipping an outpatient wellness network with certified genetic counseling and clinical pharmacogenomics modeling to enhance medication safety and proactive disease surveillance.',
    challenge: '[CLIENT CASE STUDY CHALLENGE] Primary care clinicians lacked streamlined pathways to interpret complex hereditary DNA sequencing or identify patient-specific adverse drug interaction risks.',
    approach: 'Provided an end-to-end molecular testing pipeline with certified genetic counselor support, clear variant curation, and a physician reference guide for safer medication prescribing.',
    solution: '[CLIENT CASE STUDY SOLUTION] Seamless integration of clinical-grade hereditary risk panels, pharmacogenomics profiling, and encrypted patient genetic dossiers into routine clinical care.',
    outcomes: [
      '[CLIENT METRIC] Over 500 patient genetic dossiers securely processed and curated',
      '[CLIENT METRIC] 76 adverse drug interaction risks proactively identified and prevented',
      '[CLIENT METRIC] 100% physician reported confidence in clinical genetics interpretation',
    ],
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    ],
    tags: ['Genomics', 'Pharmacogenomics', 'Precision Medicine', 'Preventative Care'],
    serviceSlugs: [
      'precision-genomics-screening',
      'preventive-health-screenings',
    ],
    relatedProjectIds: ['proj-1', 'proj-2', 'proj-3'],
  },
];
