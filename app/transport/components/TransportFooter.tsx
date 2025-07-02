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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
                <img
                  src="/AT.png"
                  alt="Archana Transport Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold">Archana Transport</span>
                <p className="text-gray-400 text-sm">
                  Industrial Material Transport Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Looking for a transport partner you can rely on? <br />
              We specialize in industrial material and mining logistics,
              delivered with care and precision.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links (hidden on mobile) */}
          <div className="hidden md:block">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="text-red-400 w-6 h-6 mt-[12px] shrink-0" />
                <div className="text-gray-300 text-base">
                  <p>+91 84580 35964</p>
                  <p>+91 78558 77317</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
  <Mail className="text-red-400 w-6 h-6 mt-[10px] shrink-0" />
  <div className="text-gray-300 text-base space-y-1 break-words w-fit max-w-full">
    <p>info.at@archanagroups.in</p>
    <p>archanatransportrgd@gmail.com</p>
  </div>
</div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="text-red-400 w-6 h-6 mt-[22px] shrink-0" />
                <p className="text-gray-300 text-base leading-relaxed break-words">
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

        <p className="text-center text-sm text-gray-400 mt-8">
          © 2022 Archana Transport. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
