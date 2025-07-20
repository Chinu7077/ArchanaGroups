'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function TransportNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector('nav');

    if (element && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }

    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left - Logo and Home */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <Link href="/" title="Home">
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
                <Home className="h-5 w-5 text-gray-700 transition-colors duration-200 hover:text-red-600 sm:h-6 sm:w-6" />
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
              Archana Transport
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden items-center space-x-6 lg:flex"
          >
            <Link
              href="/portal"
              className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              <LogIn className="h-4 w-4" />
              <span>Login Portal</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="rounded-xl p-2 text-gray-700 hover:text-red-600 focus:outline-none lg:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="space-y-2 rounded-b-2xl border-t border-gray-200 bg-white px-2 pt-2 pb-4 text-sm shadow-lg">
              <Link
                href="/portal"
                className="mx-4 block w-full rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white shadow-lg transition-colors hover:bg-red-700"
              >
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login Portal</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Mobile Login Portal Button */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">
        <Link
          href="/portal"
          className="flex items-center space-x-2 rounded-full bg-red-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-105"
        >
          <LogIn className="h-5 w-5" />
          <span className="text-sm">Login Portal</span>
        </Link>
      </div>
    </nav>
  );
}
