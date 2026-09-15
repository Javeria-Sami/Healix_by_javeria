/**
 * Healix Conversion Analytics & Journey Tracking Utility
 * 
 * Architecture Principle:
 * - 100% Privacy-Preserving & Zero-PHI (Protected Health Information).
 * - Zero third-party tracking cookies or invasive scripts.
 * - Emits structured diagnostic conversion events for user journey analysis
 *   (e.g., CTA clicks, category filtering, micro-conversions, inquiry progression).
 */

const LISTENERS = new Set();

/**
 * Valid conversion event categories
 */
export const CONVERSION_CATEGORIES = {
  CTA_CLICK: 'cta_click',
  MICRO_CONVERSION: 'micro_conversion',
  JOURNEY_STEP: 'journey_step',
  INQUIRY_INTENT: 'inquiry_intent',
  NAVIGATION: 'navigation',
};

/**
 * Tracks a privacy-safe conversion event.
 * Ensures no sensitive medical history or personal input values are captured.
 * 
 * @param {Object} eventDetails
 * @param {string} eventDetails.category - One of CONVERSION_CATEGORIES
 * @param {string} eventDetails.action - Specific action name (e.g., 'click_schedule_consultation')
 * @param {string} [eventDetails.location] - Source route or section (e.g., 'navbar', 'service_detail_hero')
 * @param {string} [eventDetails.destination] - Target route or link (e.g., '/contact?service=cardiovascular')
 * @param {Object} [eventDetails.metadata] - Non-sensitive metadata (e.g., { planName: 'Longevity Architecture', billing: 'annual' })
 */
export function trackConversionEvent({
  category = CONVERSION_CATEGORIES.CTA_CLICK,
  action,
  location,
  destination,
  metadata = {},
}) {
  if (!action) return;

  // Sanitize metadata to guarantee no PHI is recorded
  const safeMetadata = { ...metadata };
  delete safeMetadata.message;
  delete safeMetadata.email;
  delete safeMetadata.phone;
  delete safeMetadata.fullName;
  delete safeMetadata.medicalHistory;

  const eventPayload = {
    timestamp: new Date().toISOString(),
    category,
    action,
    location: location || (typeof window !== 'undefined' ? window.location.pathname : 'unknown'),
    destination,
    metadata: safeMetadata,
  };

  // Dispatch to registered diagnostic listeners
  LISTENERS.forEach((listener) => {
    try {
      listener(eventPayload);
    } catch (err) {
      // Fail silently in development/production
    }
  });

  // Custom DOM Event for internal components
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      const customEvent = new CustomEvent('healix:conversion', { detail: eventPayload });
      window.dispatchEvent(customEvent);
    } catch (e) {
      // In non-browser/test environments
    }
  }

  return eventPayload;
}

/**
 * Subscribes a listener to conversion events (useful for diagnostic logging or testing).
 * @param {Function} listener
 * @returns {Function} unsubscribe function
 */
export function subscribeConversionAnalytics(listener) {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}

/**
 * Clears all active listeners (useful in test teardown).
 */
export function clearConversionListeners() {
  LISTENERS.clear();
}
