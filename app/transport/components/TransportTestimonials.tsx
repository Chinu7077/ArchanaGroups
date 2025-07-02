"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export default function TransportTestimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Mining Corp Ltd.",
      text: "Archana Transport has been our trusted partner for over 5 years. Their reliability and professionalism in handling heavy equipment transport is unmatched.",
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Priya Sharma",
      company: "Industrial Solutions Inc.",
      text: "Excellent service and timely delivery every single time. They handled our oversized machinery transport with precision and care.",
      rating: 5,
      location: "Delhi, NCR",
    },
    {
      name: "Amit Patel",
      company: "Construction Dynamics",
      text: "Professional team, competitive pricing, and reliable service. We've been working with Archana Transport for 3 years now.",
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      name: "Suresh Reddy",
      company: "Steel Industries Ltd.",
      text: "Outstanding logistics support for our steel transportation needs. Their drivers are experienced, and the equipment is well-maintained.",
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
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">Trusted by clients across India</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-gray-50 rounded-3xl shadow-xl p-8 md:p-12 relative"
            >
              <Quote size={40} className="text-red-600 opacity-20 absolute top-6 left-6" />

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-6 leading-relaxed font-medium">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-red-600 font-semibold">{testimonials[currentIndex].company}</p>
                <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-red-600 text-white rounded-full p-3 shadow-xl hover:bg-red-700 transition-all hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-red-600 text-white rounded-full p-3 shadow-xl hover:bg-red-700 transition-all hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
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
