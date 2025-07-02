"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AG</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Archana Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/transport" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Archana Transport
            </Link>
            <Link href="/biocycle" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Archana BioCycle
            </Link>
            <Link
              href="#contact"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
              <Link
                href="/"
                className="block px-3 py-3 text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/transport"
                className="block px-3 py-3 text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Archana Transport
              </Link>
              <Link
                href="/biocycle"
                className="block px-3 py-3 text-gray-700 hover:text-green-600 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Archana BioCycle
              </Link>
              <Link
                href="#contact"
                className="block px-3 py-3 mx-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-center font-medium"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
