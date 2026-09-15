/**
 * Healix API Client
 * Centralized fetch client with base URL handling, timeout, error normalization, and response parsing.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const DEFAULT_TIMEOUT_MS = 10000;

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Execute HTTP fetch request with timeout and error handling
 */
export async function request(endpoint, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, headers = {}, ...customConfig } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    signal: controller.signal,
    ...customConfig,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const response = await fetch(url, config);
    clearTimeout(timer);

    let responseData = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = (responseData && responseData.message) || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, responseData);
    }

    return responseData;
  } catch (error) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please check your network connection.', 408);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'An unexpected network error occurred.', 500);
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};
