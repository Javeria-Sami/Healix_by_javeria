/**
 * Healix Centralized Navigation Schema
 * Data-driven navigation hierarchy for desktop mega-menus and mobile accordions.
 * Includes Pharmacy categories (Medications, Wellness & Beauty, Devices & Injectables)
 * and Lab Tests multi-column catalog.
 */

import { ROUTES } from '../constants/routes';

export const PHARMACY_NAV = {
  label: 'Pharmacy',
  href: ROUTES.PHARMACY,
  sections: [
    {
      id: 'medications',
      title: 'Medications',
      description: 'Prescription pharmaceuticals and therapeutic care treatments',
      categories: [
        { name: 'Bone And Joint Pain', slug: 'bone-and-joint-pain', href: '/pharmacy/category/bone-and-joint-pain' },
        { name: 'Cardiac Care', slug: 'cardiac-care', href: '/pharmacy/category/cardiac-care' },
        { name: 'Derma Care', slug: 'derma-care', href: '/pharmacy/category/derma-care' },
        { name: 'ENT Care', slug: 'ent-care', href: '/pharmacy/category/ent-care' },
        { name: 'Eye And Ear Care', slug: 'eye-and-ear-care', href: '/pharmacy/category/eye-and-ear-care' },
        { name: 'Genitals Care', slug: 'genitals-care', href: '/pharmacy/category/genitals-care' },
        { name: 'Kidney And Pancreatic Care', slug: 'kidney-and-pancreatic-care', href: '/pharmacy/category/kidney-and-pancreatic-care' },
        { name: 'Liver Care', slug: 'liver-care', href: '/pharmacy/category/liver-care' },
        { name: 'Lung Care', slug: 'lung-care', href: '/pharmacy/category/lung-care' },
        { name: 'Mental Health', slug: 'mental-health', href: '/pharmacy/category/mental-health' },
        { name: 'Other Conditions', slug: 'other-conditions', href: '/pharmacy/category/other-conditions' },
        { name: 'Stomach Health Care', slug: 'stomach-health-care', href: '/pharmacy/category/stomach-health-care' },
        { name: 'Urinary Care', slug: 'urinary-care', href: '/pharmacy/category/urinary-care' },
      ],
    },
    {
      id: 'wellness-beauty',
      title: 'Wellness And Beauty',
      description: 'Daily hygiene, dermatological care, and nutritional supplements',
      categories: [
        { name: 'Hair And Nails Care', slug: 'hair-and-nails-care', href: '/pharmacy/category/hair-and-nails-care' },
        { name: 'Oral Hygiene', slug: 'oral-hygiene', href: '/pharmacy/category/oral-hygiene' },
        { name: 'Skin Care', slug: 'skin-care', href: '/pharmacy/category/skin-care' },
        { name: 'Supplements', slug: 'supplements', href: '/pharmacy/category/supplements' },
        { name: 'Weight Management', slug: 'weight-management', href: '/pharmacy/category/weight-management' },
      ],
    },
    {
      id: 'devices-injectables',
      title: 'Devices And Injectables',
      description: 'Medical diagnostics, IV therapy, surgical supplies, and mobility aids',
      categories: [
        { name: 'Devices', slug: 'devices', href: '/pharmacy/category/devices' },
        { name: 'Drips', slug: 'drips', href: '/pharmacy/category/drips' },
        { name: 'Injectables', slug: 'injectables', href: '/pharmacy/category/injectables' },
        { name: 'Supportive Appliances', slug: 'supportive-appliances', href: '/pharmacy/category/supportive-appliances' },
        { name: 'Surgicals And Solutions', slug: 'surgicals-and-solutions', href: '/pharmacy/category/surgicals-and-solutions' },
      ],
    },
  ],
  viewAll: {
    label: 'View All Categories',
    href: ROUTES.PHARMACY_CATEGORIES,
  },
};

export const LAB_TESTS_NAV = {
  label: 'Lab Tests',
  href: '/lab-tests',
  columns: [
    {
      id: 'col-1',
      title: 'Routine & Blood Diagnostics',
      items: [
        { name: 'CBC Blood Test', slug: 'cbc-blood-test', href: '/lab-tests/cbc-blood-test' },
        { name: 'Blood Culture Test', slug: 'blood-culture-test', href: '/lab-tests/blood-culture-test' },
        { name: 'Blood Glucose Fasting Test', slug: 'blood-glucose-fasting-test', href: '/lab-tests/blood-glucose-fasting-test' },
        { name: 'LFT (Liver Function Test)', slug: 'lft-test', href: '/lab-tests/lft-test' },
        { name: 'Cholesterol Test', slug: 'cholesterol-test', href: '/lab-tests/cholesterol-test' },
        { name: 'Uric Acid (Serum) Test', slug: 'uric-acid-test', href: '/lab-tests/uric-acid-test' },
      ],
    },
    {
      id: 'col-2',
      title: 'Hormonal & Specialized Pathology',
      items: [
        { name: 'TSH (Thyroid Stimulating Hormone) Test', slug: 'tsh-test', href: '/lab-tests/tsh-test' },
        { name: '17-OH Progesterone Test', slug: '17-oh-progesterone-test', href: '/lab-tests/17-oh-progesterone-test' },
        { name: 'Testosterone Test', slug: 'testosterone-test', href: '/lab-tests/testosterone-test' },
        { name: 'Hepatitis-B Qualitative Test', slug: 'hepatitis-b-qualitative-test', href: '/lab-tests/hepatitis-b-qualitative-test' },
        { name: 'Biopsy', slug: 'biopsy-test', href: '/lab-tests/biopsy-test' },
        { name: 'ECG Test', slug: 'ecg-test', href: '/lab-tests/ecg-test' },
      ],
    },
    {
      id: 'col-3',
      title: 'Imaging & Clinical Microbiology',
      items: [
        { name: 'CT-Scan Test', slug: 'ct-scan-test', href: '/lab-tests/ct-scan-test' },
        { name: 'MRI Test', slug: 'mri-test', href: '/lab-tests/mri-test' },
        { name: 'Urine Complete Examination', slug: 'urine-complete-examination', href: '/lab-tests/urine-complete-examination' },
        { name: 'CT Angiography Neck And Brain', slug: 'ct-angiography-neck-and-brain', href: '/lab-tests/ct-angiography-neck-and-brain' },
        { name: 'COVID-19 PCR Test', slug: 'covid-19-pcr-test', href: '/lab-tests/covid-19-pcr-test' },
      ],
    },
  ],
  viewAll: {
    label: 'All Lab Tests',
    href: '/lab-tests',
  },
};

export const MAIN_NAV_ITEMS = [
  { id: 'pharmacy', label: 'Pharmacy', href: ROUTES.PHARMACY, type: 'dropdown', dropdownKey: 'pharmacy' },
  { id: 'lab-tests', label: 'Lab Tests', href: ROUTES.LAB_TESTS, type: 'dropdown', dropdownKey: 'lab-tests' },
  { id: 'blog', label: 'Health Blogs', href: ROUTES.BLOG, type: 'link' },
  { id: 'franchise', label: 'Pharmacy Franchise / Business', href: ROUTES.CONTACT, type: 'link' },
];
