import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Healix Uncaught UI Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full bg-surface border border-border rounded-healix-lg p-8 shadow-soft-md text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-status-error flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
            <p className="text-text-secondary text-sm mb-6">
              We encountered an unexpected presentation error. Our technical monitoring team has been notified.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-healix-md bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-soft-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <RefreshCw className="w-4 h-4" />
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
