'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, Truck } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function HomeNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-lg font-bold text-white">AG</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Archana Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/transport"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Archana Transport
            </Link>
            <Link
              href="/biocycle"
              className="font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              Archana BioCycle
            </Link>

            {/* Login Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Link
                  href="/auth/partner-login"
                  className="flex items-center space-x-1"
                >
                  <Truck className="h-4 w-4" />
                  <span>Partner</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white"
              >
                <Link
                  href="/auth/admin-login"
                  className="flex items-center space-x-1"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 text-gray-700 hover:text-blue-600 focus:outline-none md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t bg-white px-2 pt-2 pb-3 shadow-lg">
              <Link
                href="/transport"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors hover:text-blue-600"
                onClick={toggleMenu}
              >
                Archana Transport
              </Link>
              <Link
                href="/biocycle"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors hover:text-purple-600"
                onClick={toggleMenu}
              >
                Archana BioCycle
              </Link>

              {/* Mobile Login Options */}
              <div className="mt-2 border-t pt-2">
                <div className="px-3 pb-2">
                  <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Login
                  </p>
                </div>
                <Link
                  href="/auth/partner-login"
                  className="flex items-center space-x-2 px-3 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  onClick={toggleMenu}
                >
                  <Truck className="h-4 w-4" />
                  <span>Partner Login</span>
                </Link>
                <Link
                  href="/auth/admin-login"
                  className="flex items-center space-x-2 px-3 py-3 font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  onClick={toggleMenu}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
