"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export default function BioCycleFooter() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    const animatedElements = document.querySelectorAll("[data-animate]")
    animatedElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  const getAnimationClass = (elementId: string, animationType = "fade-up") => {
    const baseClasses = "transition-all duration-1000 ease-out"
    const isVisible = visibleElements.has(elementId)

    switch (animationType) {
      case "fade-up":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
      case "fade-down":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`
      case "fade-left":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`
      case "fade-right":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`
      case "scale":
        return `${baseClasses} ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
      default:
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-10 overflow-hidden">
      <div className="container mx-auto px-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className={getAnimationClass("footer-logo", "fade-right")} data-animate id="footer-logo">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-28 h-28 transition-all duration-300 hover:scale-110">
                <Image
                  src="/ABC.png"
                  alt="Archana BioCycle Logo"
                  width={112}
                  height={112}
                  className="object-contain w-full h-full transition-all duration-300 "
                />
              </div>
              <span className="text-xl font-bold text-white transition-all duration-300 hover:text-green-400">
                Archana BioCycle
              </span>
            </div>
            <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Leading the transformation to sustainable biomass energy solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`hidden md:block ${getAnimationClass("footer-links", "fade-up")}`}
            data-animate
            id="footer-links"
          >
            <h3 className="font-semibold mb-4 text-green-400">Quick Links</h3>
            <div className="space-y-2">
              {["home", "about", "products", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:text-green-400"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={getAnimationClass("footer-contact", "fade-up")} data-animate id="footer-contact">
            <h3 className="font-semibold mb-4 text-blue-400">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <p className="hover:text-white transition-colors duration-300">
                  <a href="tel:+918458035964" className="hover:text-green-400">
                    +91 84580 35964
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <p className="hover:text-white transition-colors duration-300">
                  <a href="mailto:info.abc@archanagroups.in" className="hover:text-blue-400">
                    info.abc@archanagroups.in
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="hover:text-gray-300 transition-colors duration-300 whitespace-pre-line">
                  Gautam Nagar, 6th Lane,{"\n"}Dig. Door No. 15,{"\n"}Rayagada, Odisha – 765001
                </p>
              </div>
            </div>
          </div>

          {/* Social Stats */}
          <div className={getAnimationClass("footer-social", "fade-left")} data-animate id="footer-social">
            <h3 className="font-semibold mb-4 text-pink-400"></h3>
            <div className="flex space-x-4">{/* Social icons can be added here */}</div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Eco-Friendly Solutions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Sustainable Energy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className={`border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm ${getAnimationClass("footer-bottom", "fade-up")}`}
          data-animate
          id="footer-bottom"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="transition-colors duration-300 hover:text-white">
              &copy; 2025 Archana BioCycle, a unit of Archana Groups. All rights reserved. |
              <span className="hover:text-green-400 cursor-pointer ml-1">Privacy Policy</span> |
              <span className="hover:text-blue-400 cursor-pointer ml-1">Terms & Conditions</span>
            </p>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-500">Renewable Energy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-500">Carbon Neutral</span>
              </div>
            </div>
          </div>

          <div className="mt-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-green-600/20 animate-pulse rounded-full blur-xl"></div>
            <div className="relative text-center py-2">
              <p className="text-xs text-gray-500 font-medium">🌱 Building a Sustainable Future Together 🌱</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
