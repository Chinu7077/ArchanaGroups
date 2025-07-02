"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Mining Corp Ltd.",
      text: "Archana Transport has been our trusted partner for over 5 years. Their reliability and professionalism in handling heavy equipment transport is unmatched. They always deliver on time and handle our expensive machinery with utmost care.",
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Priya Sharma",
      company: "Industrial Solutions Inc.",
      text: "Excellent service and timely delivery every single time. They handled our oversized machinery transport with precision and care. The team is professional, and their rates are very competitive. Highly recommended!",
      rating: 5,
      location: "Delhi, NCR",
    },
    {
      name: "Amit Patel",
      company: "Construction Dynamics",
      text: "Professional team, competitive pricing, and reliable service. We've been working with Archana Transport for 3 years now, and they never disappoint. Their 24/7 support is exceptional, and they handle emergency requirements efficiently.",
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      name: "Suresh Reddy",
      company: "Steel Industries Ltd.",
      text: "Outstanding logistics support for our steel transportation needs. Their drivers are experienced, and the equipment is well-maintained. They understand the importance of safe handling of heavy industrial materials.",
      rating: 5,
      location: "Hyderabad, Telangana",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Trusted by leading companies across industries throughout India</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-16 relative">
            <Quote size={48} className="text-red-600 opacity-20 absolute top-8 left-8" />

            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed font-medium">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="text-center">
              <p className="font-bold text-gray-900 text-xl">{testimonials[currentIndex].name}</p>
              <p className="text-red-600 font-semibold text-lg">{testimonials[currentIndex].company}</p>
              <p className="text-gray-500">{testimonials[currentIndex].location}</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-red-600 text-white rounded-full p-4 shadow-xl hover:bg-red-700 transition-all"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-red-600 text-white rounded-full p-4 shadow-xl hover:bg-red-700 transition-all"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentIndex ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
