import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { RootLayout } from '../layouts/RootLayout.jsx';
import { Loader } from '../components/common/Loader.jsx';

// Lazy-loaded route views for optimal bundle splitting
const HomePage = lazy(() => import('../pages/HomePage.jsx').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage.jsx').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('../pages/ServicesPage.jsx').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('../pages/ServiceDetailPage.jsx').then(m => ({ default: m.ServiceDetailPage })));
const ProfessionalsPage = lazy(() => import('../pages/ProfessionalsPage.jsx').then(m => ({ default: m.ProfessionalsPage })));
const ProfessionalDetailPage = lazy(() => import('../pages/ProfessionalDetailPage.jsx').then(m => ({ default: m.ProfessionalDetailPage })));
const PortfolioPage = lazy(() => import('../pages/PortfolioPage.jsx').then(m => ({ default: m.PortfolioPage })));
const PortfolioDetailPage = lazy(() => import('../pages/PortfolioDetailPage.jsx').then(m => ({ default: m.PortfolioDetailPage })));
const PlansPage = lazy(() => import('../pages/PlansPage.jsx').then(m => ({ default: m.PlansPage })));
const ResourcesPage = lazy(() => import('../pages/ResourcesPage.jsx').then(m => ({ default: m.ResourcesPage })));
const ResourceDetailPage = lazy(() => import('../pages/ResourceDetailPage.jsx').then(m => ({ default: m.ResourceDetailPage })));
const FaqPage = lazy(() => import('../pages/FaqPage.jsx').then(m => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('../pages/ContactPage.jsx').then(m => ({ default: m.ContactPage })));
const LegalPage = lazy(() => import('../pages/LegalPage.jsx').then(m => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx').then(m => ({ default: m.NotFoundPage })));
const DesignSystemPage = lazy(() => import('../pages/DesignSystemPage.jsx').then(m => ({ default: m.DesignSystemPage })));

// Pharmacy & Medicine Marketplace Views
const PharmacyPage = lazy(() => import('../pages/pharmacy/PharmacyPage.jsx'));
const MedicineDirectoryPage = lazy(() => import('../pages/pharmacy/MedicineDirectoryPage.jsx'));
const PharmacyCategoriesPage = lazy(() => import('../pages/pharmacy/PharmacyCategoriesPage.jsx'));
const CategoryDetailPage = lazy(() => import('../pages/pharmacy/CategoryDetailPage.jsx'));
const MedicineDetailPage = lazy(() => import('../pages/pharmacy/MedicineDetailPage.jsx'));
const PharmacySearchPage = lazy(() => import('../pages/pharmacy/PharmacySearchPage.jsx'));
const CartPage = lazy(() => import('../pages/pharmacy/CartPage.jsx'));
const CheckoutPage = lazy(() => import('../pages/pharmacy/CheckoutPage.jsx'));
const OrderConfirmationPage = lazy(() => import('../pages/pharmacy/OrderConfirmationPage.jsx'));
const PrescriptionUploadPage = lazy(() => import('../pages/pharmacy/PrescriptionUploadPage.jsx'));
const RequestMedicinePage = lazy(() => import('../pages/pharmacy/RequestMedicinePage.jsx'));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <Loader size="lg" label="Loading clinical experience..." fullHeight />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Core Pages */}
          <Route index element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          
          {/* Services & Lab Tests */}
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.SERVICE_DETAIL} element={<ServiceDetailPage />} />
          <Route path={ROUTES.LAB_TESTS} element={<ServicesPage />} />
          <Route path={ROUTES.LAB_TEST_DETAIL} element={<ServiceDetailPage />} />

          {/* Medical Team */}
          <Route path={ROUTES.PROFESSIONALS} element={<ProfessionalsPage />} />
          <Route path={ROUTES.PROFESSIONAL_DETAIL} element={<ProfessionalDetailPage />} />

          {/* Case Studies / Portfolio */}
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={ROUTES.PORTFOLIO_DETAIL} element={<PortfolioDetailPage />} />

          {/* Plans */}
          <Route path={ROUTES.PLANS} element={<PlansPage />} />

          {/* Insights, Resources & Health Articles */}
          <Route path={ROUTES.INSIGHTS} element={<ResourcesPage />} />
          <Route path={ROUTES.INSIGHTS_DETAIL} element={<ResourceDetailPage />} />
          <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />
          <Route path={ROUTES.RESOURCE_DETAIL} element={<ResourceDetailPage />} />
          <Route path={ROUTES.BLOG} element={<ResourcesPage />} />
          <Route path={ROUTES.BLOG_DETAIL} element={<ResourceDetailPage />} />

          {/* Pharmacy & Medicine Marketplace */}
          <Route path={ROUTES.PHARMACY} element={<PharmacyPage />} />
          <Route path={ROUTES.PHARMACY_MEDICINES} element={<MedicineDirectoryPage />} />
          <Route path={ROUTES.PHARMACY_MEDICINE_LETTER} element={<MedicineDirectoryPage />} />
          <Route path={ROUTES.PHARMACY_CATEGORIES} element={<PharmacyCategoriesPage />} />
          <Route path={ROUTES.PHARMACY_CATEGORY} element={<CategoryDetailPage />} />
          <Route path={ROUTES.PHARMACY_MEDICINE_DETAIL} element={<MedicineDetailPage />} />
          <Route path={ROUTES.PHARMACY_SEARCH} element={<PharmacySearchPage />} />
          <Route path={ROUTES.PHARMACY_CART} element={<CartPage />} />
          <Route path={ROUTES.PHARMACY_CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.PHARMACY_ORDER_CONFIRMATION} element={<OrderConfirmationPage />} />
          <Route path={ROUTES.PHARMACY_PRESCRIPTION} element={<PrescriptionUploadPage />} />
          <Route path={ROUTES.PHARMACY_REQUEST_MEDICINE} element={<RequestMedicinePage />} />

          {/* FAQ & Contact */}
          <Route path={ROUTES.FAQ} element={<FaqPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />

          {/* Legal & Compliance */}
          <Route path={ROUTES.PRIVACY} element={<LegalPage type="privacy" />} />
          <Route path={ROUTES.TERMS} element={<LegalPage type="terms" />} />
          <Route path={ROUTES.COOKIES} element={<LegalPage type="cookies" />} />

          {/* Internal Design System Showcase (Phase 03 Verification) */}
          <Route path={ROUTES.DESIGN_SYSTEM} element={<DesignSystemPage />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
