import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-black">
                <span className="text-lg font-bold text-white">AG</span>
              </div>
              <span className="text-2xl font-bold">Archana Group</span>
            </div>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-300">
              Leading provider of transportation and sustainable mobility
              solutions, committed to excellence and innovation in every service
              we deliver across India.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Our Businesses</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-lg text-gray-300 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/transport"
                  className="text-lg text-gray-300 transition-colors hover:text-white"
                >
                  Archana Transport
                </Link>
              </li>
              <li>
                <Link
                  href="/biocycle"
                  className="text-lg text-gray-300 transition-colors hover:text-white"
                >
                  Archana BioCycle
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-lg text-gray-300 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" />
                <span className="text-lg text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <span className="text-lg text-gray-300">
                  info@archanagroup.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 text-gray-400" />
                <span className="text-lg text-gray-300">
                  123 Business District,
                  <br />
                  Industrial Area, City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-lg text-gray-400">
            © 2024 Archana Groups of Companies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
