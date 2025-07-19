'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="mx-auto max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h2>

        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Our team has been notified and is
          working on a fix.
        </p>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try again</span>
          </button>

          <div className="text-sm text-gray-500">
            <p>Error ID: {error.digest}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
