/**
 * Healix Route Definitions
 * Centralized mapping of all application URLs and canonical paths.
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:slug',
  PROFESSIONALS: '/professionals',
  PROFESSIONAL_DETAIL: '/professionals/:slug',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_DETAIL: '/portfolio/:slug',
  PLANS: '/plans',
  RESOURCES: '/resources',
  RESOURCE_DETAIL: '/resources/:slug',
  FAQ: '/faq',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',
  DESIGN_SYSTEM: '/design-system',

  // Pharmacy & Medicine Marketplace
  PHARMACY: '/pharmacy',
  PHARMACY_MEDICINES: '/pharmacy/medicines',
  PHARMACY_MEDICINES_LETTER: '/pharmacy/medicines/:letter',
  PHARMACY_CATEGORIES: '/pharmacy/categories',
  PHARMACY_CATEGORY: '/pharmacy/category/:category',
  PHARMACY_MEDICINE_DETAIL: '/pharmacy/medicine/:slug',
  PHARMACY_SEARCH: '/pharmacy/search',
  PHARMACY_CART: '/pharmacy/cart',
  PHARMACY_CHECKOUT: '/pharmacy/checkout',
  PHARMACY_ORDER_CONFIRMATION: '/pharmacy/order-confirmation',
  PHARMACY_PRESCRIPTION: '/pharmacy/prescription',
  PHARMACY_REQUEST: '/pharmacy/request-medicine',
  // Insights & Resources clean routes
  INSIGHTS: '/insights',
  INSIGHTS_DETAIL: '/insights/:slug',
  // Lab Tests & Health Blogs clean routes (legacy support)
  LAB_TESTS: '/lab-tests',
  LAB_TEST_DETAIL: '/lab-tests/:slug',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:slug',
};

export const NAV_LINKS = [
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Pharmacy', href: ROUTES.PHARMACY },
  { label: 'Services', href: ROUTES.SERVICES },
  { label: 'Insights', href: ROUTES.INSIGHTS },
  { label: 'Contact', href: ROUTES.CONTACT },
];

