'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function BioCycleFooter() {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const getAnimationClass = (elementId: string, animationType = 'fade-up') => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    const isVisible = visibleElements.has(elementId);

    switch (animationType) {
      case 'fade-up':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      case 'fade-down':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`;
      case 'fade-left':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
      case 'fade-right':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
      case 'scale':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      default:
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  return (
    <footer className="overflow-hidden bg-gray-900 py-10 text-white">
      <div className="container mx-auto px-2">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Tagline */}
          <div
            className={getAnimationClass('footer-logo', 'fade-right')}
            data-animate
            id="footer-logo"
          >
            <div className="mb-2 flex items-center space-x-4">
              <div className="h-28 w-28 transition-all duration-300 hover:scale-110">
                <Image
                  src="/ABC.png"
                  alt="Archana BioCycle Logo"
                  width={112}
                  height={112}
                  className="h-full w-full object-contain transition-all duration-300"
                />
              </div>
              <span className="text-xl font-bold text-white transition-all duration-300 hover:text-green-400">
                Archana BioCycle
              </span>
            </div>
            <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Leading the transformation to sustainable biomass energy
              solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`hidden md:block ${getAnimationClass('footer-links', 'fade-up')}`}
            data-animate
            id="footer-links"
          >
            <h3 className="mb-4 font-semibold text-green-400">Quick Links</h3>
            <div className="space-y-2">
              {['home', 'about', 'products', 'contact'].map(
                (section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-green-400 hover:text-white"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={getAnimationClass('footer-contact', 'fade-up')}
            data-animate
            id="footer-contact"
          >
            <h3 className="mb-4 font-semibold text-blue-400">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="group flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <p className="transition-colors duration-300 hover:text-white">
                  <a href="tel:+918458035964" className="hover:text-green-400">
                    +91 84580 35964
                  </a>
                </p>
              </div>

              <div className="group flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <p className="transition-colors duration-300 hover:text-white">
                  <a
                    href="mailto:info.abc@archanagroups.in"
                    className="hover:text-blue-400"
                  >
                    info.abc@archanagroups.in
                  </a>
                </p>
              </div>

              <div className="group flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <p className="whitespace-pre-line transition-colors duration-300 hover:text-gray-300">
                  Gautam Nagar, 6th Lane,{'\n'}Dig. Door No. 15,{'\n'}Rayagada,
                  Odisha – 765001
                </p>
              </div>
            </div>
          </div>

          {/* Social Stats */}
          <div
            className={getAnimationClass('footer-social', 'fade-left')}
            data-animate
            id="footer-social"
          >
            <h3 className="mb-4 font-semibold text-pink-400"></h3>
            <div className="flex space-x-4">
              {/* Social icons can be added here */}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span>Eco-Friendly Solutions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                <span>Sustainable Energy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className={`mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400 ${getAnimationClass('footer-bottom', 'fade-up')}`}
          data-animate
          id="footer-bottom"
        >
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="transition-colors duration-300 hover:text-white">
              &copy; 2025 Archana BioCycle, a unit of Archana Groups. All rights
              reserved. |
              <span className="ml-1 cursor-pointer hover:text-green-400">
                Privacy Policy
              </span>{' '}
              |
              <span className="ml-1 cursor-pointer hover:text-blue-400">
                Terms & Conditions
              </span>
            </p>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-gray-500">Renewable Energy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                <span className="text-gray-500">Carbon Neutral</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 overflow-hidden">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-green-600/20 via-blue-600/20 to-green-600/20 blur-xl"></div>
            <div className="relative py-2 text-center">
              <p className="text-xs font-medium text-gray-500">
                🌱 Building a Sustainable Future Together 🌱
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
