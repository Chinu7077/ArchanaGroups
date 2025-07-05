"use client";

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function TransportFooter() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
                <img
                  src="/AT.png"
                  alt="Archana Transport Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold">Archana Transport</span>
                <p className="text-gray-400 text-sm">
                  Industrial Material Transport Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-base leading-normal">
              Looking for a transport partner you can rely on? <br />
              We specialize in industrial material and mining logistics,
              delivered with care and precision.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
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
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-white transition-colors text-base"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-300 hover:text-white transition-colors text-base"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors text-base"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="text-red-400 w-5 h-5 mt-[10px] shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>+91 84580 35964</p>
                  <p>+91 78558 77317</p>
                  <p className="text-gray-400 text-xs">24/7 Emergency</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="text-red-400 w-5 h-5 mt-[10px] shrink-0" />
                <div className="text-gray-300 text-sm space-y-1 break-words max-w-full">
                  <p>info.at@archanagroups.in</p>
                  <p>archanatransportrgd@gmail.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="text-red-400 w-5 h-5 mt-[18px] shrink-0" />
                <p className="text-gray-300 text-sm leading-normal break-words">
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
          className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-sm"
          id="footer-bottom"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="transition-colors duration-300 hover:text-white">
            &copy; 2025 Archana Transport, a unit of Archana Groups. All rights reserved. |

              <span className="hover:text-red-400 cursor-pointer transition-colors duration-300 ml-1">
                Privacy Policy
              </span>{" "}
              |
              <span className="hover:text-yellow-400 cursor-pointer transition-colors duration-300 ml-1">
                Terms & Conditions
              </span>
            </p>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-500">On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-500">Safety Assured</span>
              </div>
            </div>
          </div>

          {/* Animated Banner */}
          <div className="mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-black/30 to-red-600/20 animate-pulse rounded-full blur-xl"></div>
            <div className="relative text-center py-2">
              <p className="text-xs text-gray-300 font-medium">
                🚛 Powered by Precision. Driven by Trust. 🚛
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
