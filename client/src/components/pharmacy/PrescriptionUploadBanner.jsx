import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function PrescriptionUploadBanner({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-teal-900 text-white p-6 sm:p-8 md:p-10 shadow-lg ${className}`}>
      {/* Decorative background ambient circles */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-teal-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Licensed Pharmacy Service
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Have a Doctor's Prescription?
          </h3>
          <p className="text-sm sm:text-base text-primary-100/90 leading-relaxed mb-4">
            Upload your prescription photo or PDF. Our certified clinical pharmacists will review your order, verify dosages, and arrange fast doorstep delivery.
          </p>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-primary-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HIPAA-Grade Non-Public Storage
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Pharmacist Verification
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Same-Day Dispatch
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to={ROUTES.PHARMACY_PRESCRIPTION}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-primary-950 font-semibold text-sm sm:text-base hover:bg-neutral-100 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Prescription
          </Link>
          <Link
            to={ROUTES.PHARMACY_MEDICINES}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
