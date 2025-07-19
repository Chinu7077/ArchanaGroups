'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function TransportTestimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Mining Corp Ltd.',
      text: 'Archana Transport has been our trusted partner for over 5 years. Their reliability and professionalism in handling heavy equipment transport is unmatched.',
      rating: 5,
      location: 'Mumbai, Maharashtra',
    },
    {
      name: 'Priya Sharma',
      company: 'Industrial Solutions Inc.',
      text: 'Excellent service and timely delivery every single time. They handled our oversized machinery transport with precision and care.',
      rating: 5,
      location: 'Delhi, NCR',
    },
    {
      name: 'Amit Patel',
      company: 'Construction Dynamics',
      text: "Professional team, competitive pricing, and reliable service. We've been working with Archana Transport for 3 years now.",
      rating: 5,
      location: 'Pune, Maharashtra',
    },
    {
      name: 'Suresh Reddy',
      company: 'Steel Industries Ltd.',
      text: 'Outstanding logistics support for our steel transportation needs. Their drivers are experienced, and the equipment is well-maintained.',
      rating: 5,
      location: 'Hyderabad, Telangana',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by clients across India
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="relative rounded-3xl bg-gray-50 p-8 shadow-xl md:p-12"
            >
              <Quote
                size={40}
                className="absolute top-6 left-6 text-red-600 opacity-20"
              />

              <div className="mb-4 flex justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-current text-yellow-400"
                  />
                ))}
              </div>

              <blockquote className="mb-6 text-center text-lg leading-relaxed font-medium text-gray-700 md:text-xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {testimonials[currentIndex].name}
                </p>
                <p className="font-semibold text-red-600">
                  {testimonials[currentIndex].company}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-x-6 -translate-y-1/2 transform rounded-full bg-red-600 p-3 text-white shadow-xl transition-all hover:scale-110 hover:bg-red-700"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 transform rounded-full bg-red-600 p-3 text-white shadow-xl transition-all hover:scale-110 hover:bg-red-700"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'scale-125 bg-red-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
