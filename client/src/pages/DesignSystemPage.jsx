import React, { useState } from 'react';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  Button,
  Loader,
  Skeleton,
  Breadcrumb,
  EmptyState,
  Modal,
  Toast,
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/index.js';

import {
  ShieldCheck,
  HeartPulse,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  Loader2,
  Lock,
  Mail,
  User,
  Phone,
  Search,
  Bell,
  Compass,
} from 'lucide-react';
import { SEO } from '../components/common/SEO.jsx';

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('components');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [checkboxState, setCheckboxState] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Engineering Architecture', href: '/design-system' },
    { label: 'Core Component System' },
  ];

  return (
    <div className="py-12 md:py-16 bg-background">
      <SEO
        title="Design System & UI Primitives | Internal Engineering"
        description="Internal UI system and component showcase for Healix Healthcare."
        noIndex={true}
      />
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-10 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary-dark text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Internal Engineering Showcase — Phase 04</span>
          </div>
          <h1 className="font-h1 text-[#075C49]">
            Core Component System & <br />
            <span className="font-editorial italic font-normal text-primary">Reusable UI Primitives</span>
          </h1>
          <p className="font-body text-text-secondary">
            Interactive verification playground for all atomic and composable components, keyboard interactions, error states, and accessibility bindings.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 p-1.5 bg-surface-muted border border-border rounded-healix-md w-fit">
          {[
            { id: 'components', label: '1. Actions & Badges' },
            { id: 'cards', label: '2. Composable Cards' },
            { id: 'forms', label: '3. Form Primitives' },
            { id: 'disclosures', label: '4. Accordion & Modals' },
            { id: 'feedback', label: '5. Feedback & Loaders' },
            { id: 'tokens', label: '6. Design Tokens Reference' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-healix-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-soft-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ====================================================================
            TAB 1: ACTIONS & BADGES
           ==================================================================== */}
        {activeTab === 'components' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Buttons Showcase */}
            <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-6">
              <div>
                <h2 className="font-h3 text-[#075C49] mb-1">Button Component (All Variants & Sizes)</h2>
                <p className="font-small text-text-secondary">
                  Accessible action buttons supporting leading/trailing icons, link polymorphism, loading, and disabled states.
                </p>
              </div>

              {/* Variants */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold uppercase text-text-muted">Variants (Medium Size)</div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" iconTrailing={ArrowRight}>
                    Primary Action
                  </Button>
                  <Button variant="secondary">
                    Secondary Action
                  </Button>
                  <Button variant="outline">
                    Outline Action
                  </Button>
                  <Button variant="ghost">
                    Ghost Action
                  </Button>
                  <Button variant="destructive">
                    Destructive Action
                  </Button>
                  <Button variant="link">
                    Inline Link Button
                  </Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <div className="text-xs font-mono font-semibold uppercase text-text-muted">Sizes</div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" variant="primary">Small (sm)</Button>
                  <Button size="md" variant="primary">Medium (md)</Button>
                  <Button size="lg" variant="primary">Large (lg)</Button>
                </div>
              </div>

              {/* States */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <div className="text-xs font-mono font-semibold uppercase text-text-muted">States</div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" isDisabled>
                    Disabled Button
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading Button
                  </Button>
                  <Button variant="outline" iconLeading={Search}>
                    Leading Icon
                  </Button>
                  <Button variant="secondary" iconTrailing={Send}>
                    Trailing Icon
                  </Button>
                </div>
              </div>
            </div>

            {/* Badges Showcase */}
            <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-6">
              <div>
                <h2 className="font-h3 text-[#075C49] mb-1">Badge Component (Status & Category Variants)</h2>
                <p className="font-small text-text-secondary">
                  Accessible chips and metadata tags in pill and standard rounded forms.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary" icon={Sparkles}>Primary Featured</Badge>
                <Badge variant="secondary">Secondary Neutral</Badge>
                <Badge variant="success" icon={CheckCircle2}>Clinical Verified</Badge>
                <Badge variant="warning" icon={AlertTriangle}>Review Required</Badge>
                <Badge variant="error">Critical Alert</Badge>
                <Badge variant="info" icon={Info}>Information</Badge>
                <Badge variant="outline">Outline Tag</Badge>
                <Badge variant="primary" pill={false}>Square Radius (sm)</Badge>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: COMPOSABLE CARDS
           ==================================================================== */}
        {activeTab === 'cards' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-h3 text-[#075C49] mb-1">Composable Card Primitives</h2>
              <p className="font-small text-text-secondary">
                Cards built from <code>CardHeader</code>, <code>CardTitle</code>, <code>CardMedia</code>, <code>CardContent</code>, and <code>CardFooter</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Elevated Media Card */}
              <Card surface="elevated" isInteractive>
                <CardMedia
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
                  alt="Diagnostic laboratory testing"
                >
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">Specialized</Badge>
                  </div>
                </CardMedia>
                <CardHeader>
                  <CardTitle>Cardiovascular Diagnostics</CardTitle>
                  <CardDescription>Precision non-invasive cardiac biomarker evaluation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-secondary">
                    Card content area with continuous biomarker telemetry and physician oversight.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-text-muted">45-60 min session</span>
                  <Button variant="link" size="sm">Explore →</Button>
                </CardFooter>
              </Card>

              {/* Card 2: Secondary Linen Card */}
              <Card surface="secondary">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">Membership</Badge>
                  <CardTitle>Professional Care Plan</CardTitle>
                  <CardDescription>Comprehensive ongoing physician access.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-heading text-[#075C49] mb-2">$189<span className="text-xs font-normal text-text-muted">/month</span></div>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• Comprehensive metabolic profiling</li>
                    <li>• Priority physician consultations</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    Select Membership
                  </Button>
                </CardFooter>
              </Card>

              {/* Card 3: Base Card with Action */}
              <Card surface="base">
                <CardHeader>
                  <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-2">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <CardTitle>Preventative Longevity</CardTitle>
                  <CardDescription>Proactive medicine engineered for longevity.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Designed around early-detection protocols, cardiac calcium scoring, and individualized nutrition medicine.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: FORM PRIMITIVES
           ==================================================================== */}
        {activeTab === 'forms' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl bg-surface border border-border rounded-healix-xl p-8 space-y-6">
              <div>
                <h2 className="font-h3 text-[#075C49] mb-1">Accessible Form Controls</h2>
                <p className="font-small text-text-secondary">
                  Complete programmatic association of labels, helper texts, error states, and keyboard accessibility.
                </p>
              </div>

              {/* Input Default & Helper */}
              <Input
                label="Full Patient Name"
                required
                placeholder="e.g. Eleanor Vance"
                iconLeading={User}
                helperText="Please provide legal name for healthcare records identification."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              {/* Input with Error State */}
              <Input
                label="Patient Email Address"
                type="email"
                required
                defaultValue="invalid-email-format"
                iconLeading={Mail}
                errorMessage="Please enter a valid email address (e.g. name@domain.com)."
              />

              {/* Select */}
              <Select
                label="Clinical Consultation Area"
                required
                options={[
                  { value: 'preventative', label: 'Comprehensive Preventative Care' },
                  { value: 'cardiology', label: 'Cardiovascular Diagnostics' },
                  { value: 'metabolic', label: 'Metabolic & Longevity Medicine' },
                  { value: 'executive', label: 'Executive Health Assessment' },
                ]}
                helperText="Select the diagnostic specialty of primary interest."
              />

              {/* Textarea */}
              <Textarea
                label="Clinical Inquiries & Health Goals"
                rows={3}
                placeholder="Describe any specific symptoms, preventative goals, or physician referral details..."
                helperText="All communications are encrypted and kept strictly confidential under HIPAA."
              />

              {/* Checkbox */}
              <Checkbox
                label="I consent to secure digital healthcare communications"
                description="Allows Healix clinical concierge to transmit appointment summaries and follow-ups."
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
              />

              <div className="pt-4">
                <Button variant="primary" iconTrailing={Send}>
                  Submit Consultation Form
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: ACCORDION & MODALS
           ==================================================================== */}
        {activeTab === 'disclosures' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Modal Trigger Demonstration */}
            <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-4 max-w-2xl">
              <h2 className="font-h3 text-[#075C49]">Accessible Modal Dialog</h2>
              <p className="font-small text-text-secondary">
                Features backdrop blur, focus trapping, Escape key dismissal, and body scroll locking.
              </p>

              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                iconLeading={Lock}
              >
                Open Clinical Intake Modal
              </Button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Clinical Assessment Request"
                description="Confidential intake for Healix physician evaluations."
              >
                <div className="space-y-4 py-2">
                  <Input label="Your Preferred Name" placeholder="Dr. or Patient Name" />
                  <Input label="Phone Contact" placeholder="+1 (555) 000-0000" />
                  <div className="pt-4 flex items-center justify-end gap-3">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                      Confirm Request
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>

            {/* Accordion Component */}
            <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-6 max-w-3xl">
              <div>
                <h2 className="font-h3 text-[#075C49] mb-1">Accessible Accordion Primitive</h2>
                <p className="font-small text-text-secondary">
                  Uses semantic buttons, <code>aria-expanded</code>, <code>aria-controls</code>, and smooth height disclosure.
                </p>
              </div>

              <Accordion type="single" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What diagnostic biomarkers are evaluated during an intake?</AccordionTrigger>
                  <AccordionContent>
                    Our comprehensive panels analyze advanced lipid sub-fractions (ApoB, Lp(a)), glycemic variability, inflammatory markers (hs-CRP), vascular calcium metrics, and endocrine hormone balance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How are patient records and telehealth communications safeguarded?</AccordionTrigger>
                  <AccordionContent>
                    Healix utilizes end-to-end TLS 1.3 cryptographic encryption and HIPAA-compliant data isolation with strict multi-factor physician access controls.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: FEEDBACK, LOADERS & UTILITIES
           ==================================================================== */}
        {activeTab === 'feedback' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Toast Notifications */}
            <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-h3 text-[#075C49] mb-1">Toast Notifications</h2>
                  <p className="font-small text-text-secondary">
                    Polite ARIA notifications for user feedback and state confirmations.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  iconLeading={Bell}
                  onClick={() =>
                    setToastMessage({
                      type: 'success',
                      title: 'Appointment Confirmed',
                      message: 'Your preventative health consultation has been booked for Oct 24, 10:00 AM.',
                    })
                  }
                >
                  Trigger Sample Toast
                </Button>
              </div>

              {toastMessage && (
                <Toast
                  type={toastMessage.type}
                  title={toastMessage.title}
                  message={toastMessage.message}
                  onDismiss={() => setToastMessage(null)}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                <Toast type="success" title="Success" message="Clinical data saved securely." />
                <Toast type="warning" title="Warning" message="Consultation slots filling rapidly." />
                <Toast type="error" title="Error" message="Unable to reach diagnostic telemetry." />
                <Toast type="info" title="Info" message="Annual wellness report is now available." />
              </div>
            </div>

            {/* Breadcrumb & EmptyState & Loader */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-6">
                <h3 className="font-h4 text-[#075C49]">Breadcrumb & Loaders</h3>
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex items-center gap-8 pt-4 border-t border-border">
                  <Loader size="sm" label="Small loader" />
                  <Loader size="md" label="Medium loader" />
                  <Loader size="lg" label="Large loader" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-healix-xl p-8 space-y-4">
                <h3 className="font-h4 text-[#075C49]">Empty State Primitive</h3>
                <EmptyState
                  icon={Compass}
                  title="No Test Results Pending"
                  description="All scheduled diagnostic reviews for this calendar quarter are complete."
                  action={
                    <Button variant="outline" size="sm">
                      Schedule New Assessment
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 6: TOKENS REFERENCE
           ==================================================================== */}
        {activeTab === 'tokens' && (
          <div className="space-y-6 bg-surface border border-border rounded-healix-xl p-8">
            <h2 className="font-h3 text-[#075C49]">Core Component System API Summary</h2>
            <p className="font-body text-text-secondary">
              All components consume semantic CSS variables defined in <code>tokens.css</code> and are fully exportable from <code>client/src/components/index.js</code>.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
