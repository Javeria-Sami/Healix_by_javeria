import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import {
  ShieldCheck,
  Truck,
  Users,
  Home as HomeIcon,
  Clock,
  Pill,
  FlaskConical,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export const HERO_SLIDES = [
  {
    id: 'pharmacy',
    eyebrow: 'PHARMACY',
    eyebrowColor: 'text-[#0D7657]',
    titleMain: 'Reliable Medicines',
    titleAccent: 'for a Healthier You',
    accentColor: 'text-[#075B43]',
    description:
      'Get genuine medicines from trusted brands, delivered to your doorstep — because your health matters.',
    ctaText: 'Order Medicines Now',
    ctaLink: ROUTES.PHARMACY,
    subjectImage: '/images/hero_subject_1.png',
    subjectAlt: 'Happy customer receiving genuine Healix medicine delivery with sealed medications',
    bgGradient: 'from-[#F7FBF8] via-[#F1F8F4] to-[#EAF5EF]',
    archColors: ['bg-[#E2F3EB]/55', 'bg-[#D3ECE0]/65', 'bg-[#C2E6D5]/75'],
    features: [
      {
        icon: ShieldCheck,
        title: 'Genuine Products',
        subtitle: 'Trusted Sources',
      },
      {
        icon: Truck,
        title: 'Convenient Delivery',
        subtitle: 'At Your Doorstep',
      },
      {
        icon: Users,
        title: 'Care for Every Family',
        subtitle: 'Health for All',
      },
    ],
  },
  {
    id: 'lab-tests',
    eyebrow: 'LAB TESTS',
    eyebrowColor: 'text-[#0D7657]',
    titleMain: 'Accurate Lab Tests',
    titleAccent: 'for a Healthier Tomorrow',
    accentColor: 'text-[#075B43]',
    description:
      'Book lab tests from trusted labs with home sampling or visit a nearby collection center — fast, easy and reliable.',
    ctaText: 'Book a Lab Test Now',
    ctaLink: ROUTES.LAB_TESTS,
    subjectImage: '/images/hero_subject_2.png',
    subjectAlt: 'Certified phlebotomist and clinical laboratory diagnostic testing with certified labs',
    bgGradient: 'from-[#FCFBF7] via-[#F7FBF8] to-[#F1F8F4]',
    archColors: ['bg-[#E2F3EB]/55', 'bg-[#D3ECE0]/65', 'bg-[#C2E6D5]/75'],
    features: [
      {
        icon: HomeIcon,
        title: 'Home Sampling',
        subtitle: 'Hassle-Free',
      },
      {
        icon: ShieldCheck,
        title: 'Trusted Labs',
        subtitle: 'Quality You Can Count On',
      },
      {
        icon: Clock,
        title: 'Quick & Convenient',
        subtitle: 'Results at Your Fingertips',
      },
    ],
  },
  {
    id: 'health-partner',
    eyebrow: 'YOUR HEALTH PARTNER',
    eyebrowColor: 'text-[#0D7657]',
    titleMain: 'Healthcare,',
    titleAccent: 'Made Simpler',
    accentColor: 'text-[#075B43]',
    description:
      'Find medicines, book lab tests, and manage everyday healthcare needs — all in one place.',
    ctaText: 'Explore Healix',
    ctaLink: ROUTES.PHARMACY,
    subjectImage: '/images/hero_subject_3.png',
    subjectAlt: 'Smiling clinical physician and healthcare partner ready to provide dedicated family care',
    bgGradient: 'from-[#FCFBF7] via-[#F7FBF8] to-[#EEF7F3]',
    archColors: ['bg-[#E5EFE4]/55', 'bg-[#D6EBE0]/65', 'bg-[#C5E5D5]/75'],
    features: [
      {
        icon: Pill,
        title: 'Wide Range',
        subtitle: 'Genuine Medicines',
      },
      {
        icon: FlaskConical,
        title: 'Trusted Labs',
        subtitle: 'Accurate Results',
      },
      {
        icon: Heart,
        title: 'Better Care',
        subtitle: 'For You & Your Family',
      },
    ],
  },
];

export function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay management
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    if (prefersReducedMotion || isHovered || isFocused) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(timer);
  }, [isHovered, isFocused, nextSlide]);

  return (
    <section
      aria-label="Healix Healthcare Hero & Promotions"
      className="relative pt-3 pb-6 sm:pt-5 sm:pb-10 lg:pt-6 lg:pb-12 bg-white"
    >
      <Container>
        {/* ============================================================
            BUILT FROM SCRATCH HERO CAROUSEL CONTAINER
            ============================================================ */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured Healthcare Promotions"
          className={clsx(
            'relative rounded-2xl sm:rounded-[36px] overflow-hidden border border-emerald-100/90 shadow-soft-sm transition-all duration-500 min-h-[440px] sm:min-h-[480px] lg:min-h-[490px] flex flex-col justify-between select-none bg-gradient-to-r',
            currentSlide.bgGradient
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {/* Layered Decorative Concentric Arches in Code */}
          <div
            className={clsx(
              'absolute -right-20 top-1/2 -translate-y-1/2 w-[540px] sm:w-[620px] h-[540px] sm:h-[620px] rounded-full pointer-events-none transition-colors duration-700',
              currentSlide.archColors[0]
            )}
            aria-hidden="true"
          />
          <div
            className={clsx(
              'absolute -right-8 top-1/2 -translate-y-1/2 w-[420px] sm:w-[480px] h-[420px] sm:h-[480px] rounded-full pointer-events-none transition-colors duration-700',
              currentSlide.archColors[1]
            )}
            aria-hidden="true"
          />
          <div
            className={clsx(
              'absolute right-6 top-1/2 -translate-y-1/2 w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] rounded-full pointer-events-none transition-colors duration-700',
              currentSlide.archColors[2]
            )}
            aria-hidden="true"
          />

          {/* PREVIOUS SLIDE BUTTON (<) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous promotional slide"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-[#075B43] shadow-soft-md hover:shadow-soft-lg border border-healix-border/90 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group/btn"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover/btn:-translate-x-0.5" />
          </button>

          {/* NEXT SLIDE BUTTON (>) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next promotional slide"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-[#075B43] shadow-soft-md hover:shadow-soft-lg border border-healix-border/90 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group/btn"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover/btn:translate-x-0.5" />
          </button>

          {/* MAIN SLIDE CONTENT AREA (LEFT TYPOGRAPHY & RIGHT SUBJECT) */}
          <div className="p-6 sm:p-10 lg:p-12 px-7 sm:px-14 lg:px-16 flex-1 flex items-center z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
              
              {/* LEFT COLUMN: Eyebrow, Heading H1, Copy, 3 Micro-Features, CTA */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                
                {/* Eyebrow */}
                <div>
                  <span className={clsx('text-xs sm:text-sm font-bold tracking-[0.25em] uppercase', currentSlide.eyebrowColor)}>
                    {currentSlide.eyebrow}
                  </span>
                </div>

                {/* Main Headline (Single Semantic H1 on Homepage) */}
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold text-[#075B43] leading-[1.12] tracking-tight">
                  {currentSlide.titleMain} <br />
                  <span className={clsx('font-serif italic font-normal', currentSlide.accentColor)}>
                    {currentSlide.titleAccent}
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg">
                  {currentSlide.description}
                </p>

                {/* 3 Value Micro-Features Row */}
                <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 pt-1">
                  {currentSlide.features.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div key={item.title} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F1F8F4] text-[#075B43] flex items-center justify-center flex-shrink-0 shadow-2xs border border-healix-border/60">
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </div>
                        <div className="leading-tight text-left">
                          <span className="block text-xs sm:text-sm font-bold text-[#075B43]">
                            {item.title}
                          </span>
                          <span className="block text-[11px] sm:text-xs text-neutral-500">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    to={currentSlide.ctaLink}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#075B43] hover:bg-[#064C38] text-white text-sm sm:text-base font-bold shadow-soft-sm hover:shadow-soft-md transition-all active:scale-[0.99] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Subject Visual Seamlessly Integrated into Hero Background */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-lg flex justify-center lg:justify-end items-center pointer-events-none">
                  {/* Subject Character Photography with Directional Masking & Blend */}
                  <div className="relative w-full flex justify-center lg:justify-end items-center [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-composite:destination-in]">
                    <img
                      src={currentSlide.subjectImage}
                      alt={currentSlide.subjectAlt}
                      className="w-full h-auto max-h-[320px] sm:max-h-[400px] lg:max-h-[440px] object-contain object-right-bottom transition-all duration-700"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CENTERED BOTTOM INDICATOR DOTS (● ● ●) */}
          <div
            className="pb-4 pt-1 z-20 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Promotional Slide Navigation"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${idx + 1}: ${slide.eyebrow}`}
                  onClick={() => goToSlide(idx)}
                  className={clsx(
                    'transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer',
                    isActive
                      ? 'w-6 h-2 bg-[#075B43]'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  )}
                />
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
