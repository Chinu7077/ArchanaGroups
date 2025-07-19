import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-md p-8 text-center">
        <div className="mb-6 text-6xl font-bold text-gray-300">404</div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>

          <div className="flex justify-center space-x-4">
            <Link
              href="/transport"
              className="font-medium text-red-600 hover:text-red-700"
            >
              Transport Services
            </Link>
            <Link
              href="/biocycle"
              className="font-medium text-green-600 hover:text-green-700"
            >
              BioCycle Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
