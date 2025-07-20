'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PortalPage() {
  const router = useRouter();

  const handlePartnerLogin = () => {
    router.push('/auth/partner-login');
  };

  const handleAdminLogin = () => {
    router.push('/auth/admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/transport" title="Back to Transport">
                <motion.div
                  className="rounded-md border border-gray-200 bg-white p-3 shadow-sm transition-colors duration-200 hover:bg-red-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <ArrowRight className="h-5 w-5 rotate-180 text-gray-700 transition-colors duration-200 hover:text-red-600 sm:h-6 sm:w-6" />
                </motion.div>
              </Link>

              <div className="flex h-20 w-20 items-center justify-center">
                <img
                  src="/AT.png"
                  alt="Archana Transport Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-xl font-bold text-gray-800 sm:text-3xl">
                Archana Transport Portal
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-red-200 opacity-20" />
          <div className="absolute top-40 right-20 h-24 w-24 animate-pulse rounded-full bg-red-300 opacity-20 delay-1000" />
          <div className="absolute bottom-32 left-20 h-40 w-40 animate-pulse rounded-full bg-red-100 opacity-20 delay-2000" />
          <div className="absolute right-10 bottom-20 h-28 w-28 animate-pulse rounded-full bg-red-400 opacity-20 delay-500" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
                Welcome to
                <span className="block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Archana Transport Portal
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose your login type to access the transport management system
              </p>
            </motion.div>

            {/* Login Options */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
              {/* Partner Login */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={handlePartnerLogin}
              >
                <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl md:rounded-3xl md:shadow-2xl md:hover:shadow-3xl">
                  <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-4 text-white sm:p-6 md:p-8">
                    <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-white/10 sm:h-32 sm:w-32 sm:translate-x-16 sm:-translate-y-16 md:h-40 md:w-40 md:translate-x-20 md:-translate-y-20" />
                    <div className="relative z-10 text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20 sm:rounded-xl sm:mb-4 md:h-24 md:w-24">
                        <Users className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12" />
                      </div>
                      <h3 className="mb-1 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl">Partner Login</h3>
                      <p className="text-sm text-red-100 sm:text-base md:text-lg">
                        Access your transport dashboard
                      </p>
                    </div>
                  </div>
                  <div className="p-4 text-center sm:p-6 md:p-8">
                    <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">
                      Your complete transport data, ready to view and download in an easy-to-use dashboard.
                    </p>
                    <div className="inline-flex items-center justify-center space-x-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-red-700 hover:shadow-xl sm:space-x-3 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3 md:text-lg">
                      <span>Login as Partner</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Admin Login */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={handleAdminLogin}
              >
                <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl md:rounded-3xl md:shadow-2xl md:hover:shadow-3xl">
                  <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-4 text-white sm:p-6 md:p-8">
                    <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-white/10 sm:h-32 sm:w-32 sm:translate-x-16 sm:-translate-y-16 md:h-40 md:w-40 md:translate-x-20 md:-translate-y-20" />
                    <div className="relative z-10 text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20 sm:rounded-xl sm:mb-4 md:h-24 md:w-24">
                        <Shield className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12" />
                      </div>
                      <h3 className="mb-1 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl">Admin Login</h3>
                      <p className="text-sm text-slate-100 sm:text-base md:text-lg">
                        Manage system and users
                      </p>
                    </div>
                  </div>
                  <div className="p-4 text-center sm:p-6 md:p-8">
                    <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">
                      Access administrative controls, manage partners, and view system analytics
                    </p>
                    <div className="inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-slate-700 hover:shadow-xl sm:space-x-3 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3 md:text-lg">
                      <span>Login as Admin</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-500">
                &copy; 2025 Archana Transport. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
} 