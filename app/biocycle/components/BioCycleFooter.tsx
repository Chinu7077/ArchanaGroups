import { Mail,MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export default function BioCycleFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-28 h-28 rounded-2xl overflow-hidden">
                <Image
                  src="/ABC.png"
                  alt="Archana BioCycle Logo"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-2xl font-bold">Archana BioCycle</span>
                <p className="text-gray-400 text-sm">Sustainable Mobility</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Coming soon - innovative sustainable mobility solutions that will revolutionize eco-friendly
              transportation. Pedaling towards a greener tomorrow with cutting-edge technology.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Coming Soon Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Coming Soon</h3>
            <ul className="space-y-4">
              <li><span className="text-gray-500 text-lg">Services</span></li>
              <li><span className="text-gray-500 text-lg">Clients</span></li>
              <li><span className="text-gray-500 text-lg">Gallery</span></li>
              <li><span className="text-gray-500 text-lg">Contact</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
      <h3 className="text-xl font-bold mb-6">Contact Info</h3>
      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <Phone className="text-green-400 w-6 h-6 mt-[12px] shrink-0" />
          <div className="text-gray-300 text-base">
            <p>+91 84580 35964</p>
            <p>+91 78558 77317</p>
   
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <Mail className="text-green-400 w-6 h-6 mt-[10px] shrink-0" />
          <div className="text-gray-300 text-base space-y-1 break-words w-fit max-w-full">
            <p>info.abc@archanagroups.in</p>
            <p>archanabiocyclergda@gmail.com</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <MapPin className="text-green-400 w-6 h-6 mt-[22px] shrink-0" />
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
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">© 2024 Archana BioCycle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
