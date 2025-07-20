'use client';

import { motion } from 'framer-motion';
import { ArrowRight, LogOut, User, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui/button';

function PageSkeleton() {
  return (
    <div className="h-screen animate-pulse bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 h-32 w-32 rounded-2xl bg-gray-200"></div>
          <div className="mx-auto mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
          <div className="mx-auto h-4 w-1/2 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="h-96 rounded-3xl bg-gray-200"></div>
          <div className="h-96 rounded-3xl bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/trpc/auth.checkAuth');
        const data = await response.json();
        console.log('🔐 Session check result:', data);
        setSession(data.result?.data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Session check error:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleTransportNavigation = () => {
    router.push('/transport');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleBioCycleNavigation = () => {
    router.push('/biocycle');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLogout = async () => {
    try {
      console.log('🚪 Logging out...');
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log('✅ Logged out successfully');
        // Force page reload to clear any cached state
        window.location.reload();
      } else {
        console.error('❌ Logout failed');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  return (
    <>
      <Suspense fallback={<PageSkeleton />}>
        <div className="h-screen overflow-y-scroll">
          <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-blue-200 opacity-20" />
              <div className="absolute top-40 right-20 h-24 w-24 animate-pulse rounded-full bg-purple-200 opacity-20 delay-1000" />
              <div className="absolute bottom-32 left-20 h-40 w-40 animate-pulse rounded-full bg-green-200 opacity-20 delay-2000" />
              <div className="absolute right-10 bottom-20 h-28 w-28 animate-pulse rounded-full bg-red-200 opacity-20 delay-500" />
            </div>

            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 px-4 py-16"
            >
              {/* Session Status and Logout Button */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {!loading && (
                  <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 backdrop-blur-sm">
                    {session?.authenticated ? (
                      <>
                        {session.user?.role === 'admin' ? (
                          <Shield size={16} className="text-red-600" />
                        ) : (
                          <User size={16} className="text-blue-600" />
                        )}
                        <span className="text-sm font-medium">
                          {session.user?.role === 'admin' ? 'Admin' : 'Partner'}: {session.user?.username || session.user?.partnerId || session.user?.id}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-600">Not logged in</span>
                    )}
                  </div>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
              
              {/* Login Navigation */}
              {!loading && !session?.authenticated && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => router.push('/auth/partner-login')}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                    >
                      <User size={16} />
                      Partner Login
                    </Button>
                    <Button
                      onClick={() => router.push('/auth/admin-login')}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      <Shield size={16} />
                      Admin Login
                    </Button>
                  </div>
                </div>
              )}
              <div className="mx-auto max-w-5xl text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mx-auto flex h-[140px] w-[140px] items-center justify-center rounded-2xl bg-white/80 shadow-2xl backdrop-blur-sm sm:h-fit sm:w-fit sm:px-10 sm:py-8 md:px-16 md:py-12"
                >
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="mr-[-14px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-[52px] font-bold text-transparent sm:mr-[-24px] sm:text-6xl md:mr-[-36px] md:text-8xl lg:text-9xl"
                      initial={{ x: -80, opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.4,
                        type: 'spring',
                        stiffness: 120,
                        damping: 14,
                      }}
                    >
                      A
                    </motion.div>
                    <motion.div
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-[52px] font-bold text-transparent sm:text-6xl md:text-8xl lg:text-9xl"
                      initial={{ x: 80, opacity: 0, scale: 0.8, rotate: 5 }}
                      animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5,
                        type: 'spring',
                        stiffness: 120,
                        damping: 14,
                      }}
                    >
                      G
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-4 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
                />

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-6 mb-6 text-5xl font-bold text-gray-900 md:text-6xl"
                >
                  Welcome to
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Archana Groups of Companies
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mx-auto max-w-md text-center text-sm leading-relaxed text-gray-600 sm:max-w-2xl sm:text-base md:text-xl"
                >
                  Dispose or Recycle: Complete Waste Management for Industry,
                  Agriculture, and Biotech...
                </motion.p>
              </div>
            </motion.header>

            <section className="relative z-10 px-4 py-12">
              <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative cursor-pointer"
                  onClick={handleTransportNavigation}
                >
                  <div className="hover:shadow-3xl h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all">
                    <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-black p-8 text-white">
                      <div className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-white/10" />
                      <div className="relative z-10 text-center">
                        <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl bg-white/60 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                          <img
                            src="/AT.png"
                            alt="Archana Transport"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <h3 className="mb-2 text-3xl font-bold">
                          Archana Transport
                        </h3>
                        <p className="text-lg text-red-100">
                          Bulk Waste. Big Solutions..
                        </p>
                      </div>
                    </div>
                    <div className="p-8 text-center">
                      <p className="mb-6 text-sm text-gray-600 md:text-lg lg:text-xl">
                        Handling Fly Ash & Red Mud with
                        <br /> Industrial Precision.
                      </p>
                      <div className="inline-flex items-center justify-center space-x-3 rounded-2xl bg-red-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-red-700 hover:shadow-xl">
                        <span>Enter Portal</span>
                        <ArrowRight
                          size={20}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative cursor-pointer"
                  onClick={handleBioCycleNavigation}
                >
                  <div className="hover:shadow-3xl h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all">
                    <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-8 text-white">
                      <div className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-white/10" />
                      <div className="relative z-10 text-center">
                        <div className="mx-auto mb-4 flex h-32 w-48 items-center justify-center rounded-xl bg-white/60 shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                          <img
                            src="/ABC.png"
                            alt="Archana BioCycle"
                            className="h-24 w-40 object-contain"
                          />
                        </div>
                        <h3 className="mb-2 text-3xl font-bold">
                          Archana BioCycle
                        </h3>
                        <p className="text-lg text-green-100">
                          Clean Fuel. Green Future.
                        </p>
                      </div>
                    </div>
                    <div className="p-8 text-center">
                      <p className="mb-6 text-sm text-gray-600 md:text-lg lg:text-xl">
                        Giving waste a new purpose, shaping a greener tomorrow.
                      </p>
                      <div className="inline-flex items-center justify-center space-x-3 rounded-2xl bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:bg-green-700 hover:shadow-xl">
                        <span>Enter Portal</span>
                        <ArrowRight
                          size={20}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="bg-opacity-80 relative z-10 mt-20 bg-white px-4 py-12 backdrop-blur-sm"
            >
              <div className="mx-auto max-w-4xl text-center">
                <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
                  <p className="transition-colors duration-300 hover:text-black hover:text-green-400 hover:text-red-400">
                    &copy; 2025 Archana Groups. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"></div>
                      <span className="text-gray-500">
                        Transport Efficiency
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500"></div>
                      <span className="text-gray-500">
                        Clean BioFuel Solutions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 overflow-hidden">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-green-600/20 via-black/30 to-red-600/20 blur-xl"></div>
                  <div className="relative py-2 text-center">
                    <p className="text-xs font-medium text-black">
                      🚚 Sustainable Waste & BioFuel Solutions ♻️
                    </p>
                  </div>
                </div>
              </div>
            </motion.footer>
          </main>
        </div>
      </Suspense>
    </>
  );
}
