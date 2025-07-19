'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Mining Corp Ltd.',
      text: 'Archana Transport has been our trusted partner for over 5 years. Their reliability and professionalism in handling heavy equipment transport is unmatched. They always deliver on time and handle our expensive machinery with utmost care.',
      rating: 5,
      location: 'Mumbai, Maharashtra',
    },
    {
      name: 'Priya Sharma',
      company: 'Industrial Solutions Inc.',
      text: 'Excellent service and timely delivery every single time. They handled our oversized machinery transport with precision and care. The team is professional, and their rates are very competitive. Highly recommended!',
      rating: 5,
      location: 'Delhi, NCR',
    },
    {
      name: 'Amit Patel',
      company: 'Construction Dynamics',
      text: "Professional team, competitive pricing, and reliable service. We've been working with Archana Transport for 3 years now, and they never disappoint. Their 24/7 support is exceptional, and they handle emergency requirements efficiently.",
      rating: 5,
      location: 'Pune, Maharashtra',
    },
    {
      name: 'Suresh Reddy',
      company: 'Steel Industries Ltd.',
      text: 'Outstanding logistics support for our steel transportation needs. Their drivers are experienced, and the equipment is well-maintained. They understand the importance of safe handling of heavy industrial materials.',
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
    <section id="testimonials" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by leading companies across industries throughout India
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative rounded-2xl bg-white p-10 shadow-2xl md:p-16">
            <Quote
              size={48}
              className="absolute top-8 left-8 text-red-600 opacity-20"
            />

            <div className="mb-6 flex justify-center">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-current text-yellow-400"
                />
              ))}
            </div>

            <blockquote className="mb-8 text-center text-xl leading-relaxed font-medium text-gray-700 md:text-2xl">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-lg font-semibold text-red-600">
                {testimonials[currentIndex].company}
              </p>
              <p className="text-gray-500">
                {testimonials[currentIndex].location}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-x-6 -translate-y-1/2 transform rounded-full bg-red-600 p-4 text-white shadow-xl transition-all hover:bg-red-700"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 transform rounded-full bg-red-600 p-4 text-white shadow-xl transition-all hover:bg-red-700"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots indicator */}
          <div className="mt-8 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-4 w-4 rounded-full transition-all ${
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
