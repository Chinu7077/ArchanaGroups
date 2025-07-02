"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function TransportNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector("nav"); // dynamically get nav

    if (element && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 sm:gap-4"
          >
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

            {/* AT Logo */}
            <div className="w-20 h-20 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src="/AT.png"
                alt="Archana Transport Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Name */}
            <span className="font-bold text-gray-800 text-xl sm:text-3xl">
              Archana Transport
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-6"
          >
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-red-600 transition-colors font-semibold"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("partners")}
              className="text-gray-700 hover:text-red-600 transition-colors font-semibold"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-700 hover:text-red-600 transition-colors font-semibold"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Contact
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-red-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200 shadow-lg rounded-b-2xl text-sm">
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-red-600 transition-colors font-medium rounded-xl hover:bg-gray-50"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("partners")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-red-600 transition-colors font-medium rounded-xl hover:bg-gray-50"
              >
                Partners
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-red-600 transition-colors font-medium rounded-xl hover:bg-gray-50"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full px-4 py-3 mx-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-center font-semibold shadow-lg"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
