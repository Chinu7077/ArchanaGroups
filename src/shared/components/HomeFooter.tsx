import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

export default function HomeFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="text-lg font-bold text-white">AG</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Archana Group
              </span>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              Leading provider of transportation and sustainable mobility
              solutions, committed to excellence and innovation in every service
              we deliver.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Our Businesses */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Our Businesses
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/transport"
                  className="text-gray-600 transition-colors hover:text-red-600"
                >
                  Archana Transport
                </a>
              </li>
              <li>
                <a
                  href="/biocycle"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  Archana BioCycle
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-600">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-600">info@archanagroup.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 text-gray-400" />
                <span className="text-gray-600">
                  123 Business District,
                  <br />
                  Industrial Area, City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 Archana Groups of Companies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
