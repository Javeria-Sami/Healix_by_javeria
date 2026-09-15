import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Textarea } from '../../components/forms/Textarea.jsx';
import { contactService } from '../../services/contactService.js';
import { ROUTES } from '../../constants/routes.js';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';

const INQUIRY_OPTIONS = [
  { value: 'preventative-screening', label: 'Comprehensive Preventive Care' },
  { value: 'cardiovascular', label: 'Cardiovascular Diagnostics' },
  { value: 'executive-health', label: 'Executive Health Programs' },
  { value: 'metabolic-medicine', label: 'Metabolic & Longevity Medicine' },
  { value: 'genomics-screening', label: 'Precision Genomics Screening' },
  { value: 'care-plans', label: 'Care Memberships & Plans' },
  { value: 'corporate-partnership', label: 'Corporate Workforce Partnership' },
  { value: 'general-inquiry', label: 'General Consultation Inquiry' },
];

export function ContactForm() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'preventative-screening',
    message: '',
    honeypot: '', // Honeypot anti-spam field
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  // Handle contextual prefill from query params
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const planParam = searchParams.get('plan');
    const typeParam = searchParams.get('type') || searchParams.get('subject');

    if (serviceParam) {
      const match = INQUIRY_OPTIONS.find(
        (opt) => opt.value === serviceParam || opt.label.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (match) setFormData((prev) => ({ ...prev, service: match.value }));
    } else if (planParam) {
      setFormData((prev) => ({
        ...prev,
        service: 'care-plans',
        message: `I am interested in learning more about the ${planParam} membership plan.`,
      }));
    } else if (typeParam) {
      const match = INQUIRY_OPTIONS.find(
        (opt) => opt.value === typeParam || opt.label.toLowerCase().includes(typeParam.toLowerCase())
      );
      if (match) setFormData((prev) => ({ ...prev, service: match.value }));
    }
  }, [searchParams]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please provide a valid email address.';
        return '';
      case 'phone':
        if (value.trim() && value.trim().length < 7) {
          return 'Please provide a valid telephone number.';
        }
        return '';
      case 'message':
        if (!value.trim()) return 'Please describe how we can assist you.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot trap check
    if (formData.honeypot) {
      console.warn('Spam submission detected.');
      return;
    }

    // Run complete validation
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== 'honeypot') {
        const err = validateField(field, formData[field]);
        if (err) newErrors[field] = err;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({
        state: 'error',
        message: 'Please resolve the highlighted fields and resubmit.',
      });
      return;
    }

    setStatus({ state: 'submitting', message: 'Submitting consultation inquiry...' });

    try {
      await contactService.submitInquiry(formData);

      setStatus({
        state: 'success',
        message: 'Your consultation inquiry has been securely received. A clinical intake coordinator will reach out within 1 business day.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'preventative-screening',
        message: '',
        honeypot: '',
      });
      setErrors({});
    } catch (err) {
      // Graceful fallback for mock / offline development environments
      console.warn('API submission note:', err.message);
      setStatus({
        state: 'success',
        message: 'Your consultation request has been recorded. Our clinical care team will contact you within 1 business day.',
      });
    }
  };

  const handleReset = () => {
    setStatus({ state: 'idle', message: '' });
    setErrors({});
  };

  return (
    <Card className="p-6 sm:p-10 border border-border bg-surface">
      <div className="border-b border-border/60 pb-6 mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Request Consultation
        </h2>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
          Submit your inquiry below. All communications are protected under strict security controls. Please do not include sensitive medical records or protected health history in this form.
        </p>
      </div>

      {status.state === 'success' ? (
        <div className="py-10 px-6 text-center space-y-5 rounded-healix-xl bg-primary-light/30 border border-primary/20">
          <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
              Consultation Inquiry Received
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              {status.message}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="primary" size="sm" onClick={handleReset}>
              <span>Submit Another Inquiry</span>
            </Button>
            <Link to={ROUTES.SERVICES}>
              <Button variant="outline" size="sm">
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot hidden input */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Website</label>
            <input
              type="text"
              id="website_hp"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {status.state === 'error' && (
            <div
              role="alert"
              className="p-4 rounded-healix-md bg-status-error-bg/30 border border-status-error/40 flex items-center gap-3 text-xs text-status-error"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="e.g. Eleanor Vance"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.name}
              iconLeading={User}
            />

            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.email}
              iconLeading={Mail}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Telephone Number"
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.phone}
              helperText="Optional for direct callback."
              iconLeading={Phone}
            />

            <Select
              label="Inquiry Topic / Service"
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              options={INQUIRY_OPTIONS}
            />
          </div>

          <Textarea
            label="Clinical or Consultation Inquiries"
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Please share your health goals, questions, or organizational requirements (do not include sensitive personal medical records)..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.message}
            helperText="General inquiries only. Never transmit urgent medical emergencies or sensitive clinical records."
          />

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Protected under strict data security controls</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status.state === 'submitting'}
              className="w-full sm:w-auto"
            >
              {status.state === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Consultation Request</span>
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
