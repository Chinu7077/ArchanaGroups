import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AG</span>
              </div>
              <span className="text-2xl font-bold">Archana Group</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Leading provider of transportation and sustainable mobility
              solutions, committed to excellence and innovation in every service
              we deliver across India.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Businesses</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/transport"
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Archana Transport
                </Link>
              </li>
              <li>
                <Link
                  href="/biocycle"
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Archana BioCycle
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" />
                <span className="text-gray-300 text-lg">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <span className="text-gray-300 text-lg">
                  info@archanagroup.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1" />
                <span className="text-gray-300 text-lg">
                  123 Business District,
                  <br />
                  Industrial Area, City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 Archana Groups of Companies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
