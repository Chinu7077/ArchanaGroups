import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AG</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Archana Group
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Leading provider of transportation and sustainable mobility
              solutions, committed to excellence and innovation in every service
              we deliver.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Our Businesses */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Our Businesses
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/transport"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Archana Transport
                </a>
              </li>
              <li>
                <a
                  href="/biocycle"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Archana BioCycle
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Us</h3>
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
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-600">
                  123 Business District,
                  <br />
                  Industrial Area, City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 Archana Groups of Companies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
