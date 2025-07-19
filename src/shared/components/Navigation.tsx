'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-black">
              <span className="text-lg font-bold text-white">AG</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Archana Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="font-medium text-gray-700 transition-colors hover:text-red-600"
            >
              Home
            </Link>
            <Link
              href="/transport"
              className="font-medium text-gray-700 transition-colors hover:text-red-600"
            >
              Archana Transport
            </Link>
            <Link
              href="/biocycle"
              className="font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              Archana BioCycle
            </Link>
            <Link
              href="#contact"
              className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 text-gray-700 hover:text-red-600 focus:outline-none md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t bg-white px-2 pt-2 pb-3 shadow-lg">
              <Link
                href="/"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors hover:text-red-600"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/transport"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors hover:text-red-600"
                onClick={toggleMenu}
              >
                Archana Transport
              </Link>
              <Link
                href="/biocycle"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors hover:text-green-600"
                onClick={toggleMenu}
              >
                Archana BioCycle
              </Link>
              <Link
                href="#contact"
                className="mx-3 block rounded-lg bg-red-600 px-3 py-3 text-center font-medium text-white transition-colors hover:bg-red-700"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
