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
            <div className="grid gap-8 md:grid-cols-2">
              {/* Partner Login */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={handlePartnerLogin}
              >
                <div className="h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all hover:shadow-3xl">
                  <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-8 text-white">
                    <div className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-white/10" />
                    <div className="relative z-10 text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl bg-white/20 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                        <Users className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="mb-2 text-3xl font-bold">Partner Login</h3>
                      <p className="text-lg text-red-100">
                        Access your transport dashboard
                      </p>
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="mb-6 text-gray-600">
                      Your complete transport data, ready to view and download in an easy-to-use dashboard.
                    </p>
                    <div className="inline-flex items-center justify-center space-x-3 rounded-2xl bg-red-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-red-700 hover:shadow-xl">
                      <span>Login as Partner</span>
                      <ArrowRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1"
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
                <div className="h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all hover:shadow-3xl">
                  <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-8 text-white">
                    <div className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-white/10" />
                    <div className="relative z-10 text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl bg-white/20 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                        <Shield className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="mb-2 text-3xl font-bold">Admin Login</h3>
                      <p className="text-lg text-slate-100">
                        Manage system and users
                      </p>
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="mb-6 text-gray-600">
                      Access administrative controls, manage partners, and view system analytics
                    </p>
                    <div className="inline-flex items-center justify-center space-x-3 rounded-2xl bg-slate-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-slate-700 hover:shadow-xl">
                      <span>Login as Admin</span>
                      <ArrowRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1"
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