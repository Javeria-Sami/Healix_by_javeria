import '@testing-library/jest-dom';

// Polyfill window.scrollTo in jsdom environment for clean test output
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}
