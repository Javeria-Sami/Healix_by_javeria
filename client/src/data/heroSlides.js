import { ROUTES } from '../constants/routes.js';

export const HERO_SLIDES = [
  {
    id: 'reliable-medicines',
    eyebrow: 'EVERYDAY HEALTHCARE',
    headlinePrefix: 'Reliable Medicines',
    headlineAccent: 'for a Healthier You',
    description:
      'Get genuine medicines from trusted brands, delivered to your doorstep — because your health matters.',
    ctaLabel: 'Order Medicines Now',
    ctaUrl: ROUTES.PHARMACY,
    ctaVariant: 'primary',
    features: [
      { title: 'Genuine Products', subtitle: 'Trusted Sources', icon: 'shield' },
      { title: 'Convenient Delivery', subtitle: 'At Your Doorstep', icon: 'truck' },
      { title: 'Care for Every Family', subtitle: 'Health for All', icon: 'family' },
    ],
    floatingBadge: 'Better Health, Brighter Days ♡',
    imageUrl: '/images/hero_pharmacy.jpg',
    imageAlt: 'Happy customer receiving authentic Healix medicine delivery at home',
  },
  {
    id: 'certified-lab-tests',
    eyebrow: 'DIAGNOSTICS & PATHOLOGY',
    headlinePrefix: 'Certified Lab Tests',
    headlineAccent: 'at Your Doorstep',
    description:
      'Book certified blood profiles and health checkups with licensed phlebotomists visiting your home for seamless sampling.',
    ctaLabel: 'Book a Lab Test Now',
    ctaUrl: ROUTES.LAB_TESTS,
    ctaVariant: 'teal',
    features: [
      { title: 'Accredited Labs', subtitle: 'ISO & CAP Certified', icon: 'shield' },
      { title: 'Free Home Sampling', subtitle: 'Licensed Phlebotomist', icon: 'truck' },
      { title: 'Digital Lab Reports', subtitle: 'Within 12–24 Hours', icon: 'family' },
    ],
    floatingBadge: 'Accurate Diagnostics, Trusted Care ♡',
    imageUrl: '/images/hero_lab.jpg',
    imageAlt: 'Certified phlebotomist providing diagnostic home blood sampling',
  },
  {
    id: 'prescription-care',
    eyebrow: 'PRESCRIPTION FULFILLMENT',
    headlinePrefix: 'Doctor’s Prescription',
    headlineAccent: 'Handled With Care',
    description:
      'Upload your doctor’s slip in seconds. Our licensed clinical pharmacists verify all dosages, pack sealed stock, and coordinate delivery.',
    ctaLabel: 'Upload Prescription Now',
    ctaUrl: ROUTES.PHARMACY_PRESCRIPTION,
    ctaVariant: 'primary',
    features: [
      { title: 'Clinical Pharmacists', subtitle: '100% Rx Verified', icon: 'shield' },
      { title: 'Tamper-Proof Seal', subtitle: 'Original Packaging', icon: 'truck' },
      { title: 'Safe & Confidential', subtitle: 'HIPAA-Adherent Data', icon: 'family' },
    ],
    floatingBadge: 'Clinical Care, Every Step ♡',
    imageUrl: '/images/hero_prescription.jpg',
    imageAlt: 'Clinical pharmacist verifying doctor prescription for medicine order',
  },
];
