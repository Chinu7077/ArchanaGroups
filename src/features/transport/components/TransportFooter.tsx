'use client';

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from 'lucide-react';

export default function TransportFooter() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30 shadow-md backdrop-blur-md">
                <img
                  src="/AT.png"
                  alt="Archana Transport Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold">Archana Transport</span>
                <p className="text-sm text-gray-400">
                  Industrial Material Transport Solutions
                </p>
              </div>
            </div>
            <p className="mb-4 max-w-md text-base leading-normal text-gray-300">
              Looking for a transport partner you can rely on? <br />
              We specialize in industrial material and mining logistics,
              delivered with care and precision.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-red-400"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.93 3H17.7L12 9.61 6.3 3H3.07L10.54 11.75 3 21h3.23l5.25-6.2 5.27 6.2h3.24l-7.56-9.27L20.93 3Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-red-400"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-red-400"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-base text-gray-300 transition-colors hover:text-white"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-base text-gray-300 transition-colors hover:text-white"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-base text-gray-300 transition-colors hover:text-white"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Info</h3>
            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="mt-[10px] h-5 w-5 shrink-0 text-red-400" />
                <div className="text-sm text-gray-300">
                  <p>+91 84580 35964</p>
                  <p>+91 78558 77317</p>
                  <p className="text-xs text-gray-400">24/7 Emergency</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="mt-[10px] h-5 w-5 shrink-0 text-red-400" />
                <div className="max-w-full space-y-1 text-sm break-words text-gray-300">
                  <p>info.at@archanagroups.in</p>
                  <p>archanatransportrgd@gmail.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-[18px] h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm leading-normal break-words text-gray-300">
                  Gautam Nagar, 6th Lane,
                  <br />
                  Dig. Door No. 15,
                  <br />
                  Rayagada, Odisha - 765001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-400"
          id="footer-bottom"
        >
          <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
            <p className="transition-colors duration-300 hover:text-white">
              &copy; 2025 Archana Transport, a unit of Archana Groups. All
              rights reserved. |
              <span className="ml-1 cursor-pointer transition-colors duration-300 hover:text-red-400">
                Privacy Policy
              </span>{' '}
              |
              <span className="ml-1 cursor-pointer transition-colors duration-300 hover:text-yellow-400">
                Terms & Conditions
              </span>
            </p>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"></div>
                <span className="text-gray-500">On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-yellow-500"></div>
                <span className="text-gray-500">Safety Assured</span>
              </div>
            </div>
          </div>

          {/* Animated Banner */}
          <div className="relative mt-6 overflow-hidden">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-red-600/20 via-black/30 to-red-600/20 blur-xl"></div>
            <div className="relative py-2 text-center">
              <p className="text-xs font-medium text-gray-300">
                🚛 Powered by Precision. Driven by Trust. 🚛
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
