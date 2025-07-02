"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BioCycleNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Home Logo + Company Logo + Company Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            {/* Home Logo Link */}
            {/* AG Brand Icon */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mr-[-10px] sm:mr-[-12px]">
                    A
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    G
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Company Logo - Transparent PNG */}
            <div className="w-28 h-28 ">
              <Image
                src="/ABC.png"
                alt="Archana BioCycle Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Company Name */}
            <span className="text-xl font-bold text-gray-800">Archana BioCycle</span>
          </motion.div>

          {/* Right Side - Desktop Navigation (Disabled) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-8"
          >
            <span className="text-gray-400 font-medium cursor-not-allowed">Services</span>
            <span className="text-gray-400 font-medium cursor-not-allowed">Clients</span>
            <span className="text-gray-400 font-medium cursor-not-allowed">Gallery</span>
            <span className="bg-gray-400 text-white px-6 py-3 rounded-xl font-medium cursor-not-allowed">Contact</span>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-green-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Collapsible Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200 shadow-lg rounded-b-2xl">
              <span className="block w-full text-left px-4 py-3 text-gray-400 font-medium cursor-not-allowed rounded-xl">
                Services
              </span>
              <span className="block w-full text-left px-4 py-3 text-gray-400 font-medium cursor-not-allowed rounded-xl">
                Clients
              </span>
              <span className="block w-full text-left px-4 py-3 text-gray-400 font-medium cursor-not-allowed rounded-xl">
                Gallery
              </span>
              <span className="block w-full text-left px-4 py-3 mx-4 bg-gray-400 text-white rounded-xl text-center font-medium cursor-not-allowed">
                Contact
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
