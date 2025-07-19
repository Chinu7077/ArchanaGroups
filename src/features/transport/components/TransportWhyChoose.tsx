'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Award } from 'lucide-react';
import Image from 'next/image';

export default function TransportWhyChoose() {
  return (
    <section id="why-choose" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Why Choose Archana Transport?
          </h2>
          <p className="text-xl text-gray-600">
            Trusted for our commitment, chosen for our performance, and
            respected for our results.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative mb-16 overflow-hidden rounded-3xl bg-white p-10 shadow-xl"
        >
          {/* Soft blur background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-red-50 opacity-50"></div>

          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-center">
              <Heart size={32} className="mr-4 text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Message from Founder
              </h3>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Founder Photo */}
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Founder"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-gray-800">TULASI DAS</p>
                  <p className="text-sm text-gray-600">Managing Director</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 italic">
                  "When I started Archana Transport, my goal was simple — to
                  bring honesty, structure, and accountability to industrial
                  logistics. Today, we proudly partner with businesses that
                  share our values — efficiency, safety, and trust. Because at
                  the end of the day, we’re not just moving materials. We’re
                  moving reputations."
                </blockquote>
                <p className="text-lg font-bold text-gray-800">
                  – Founder, Archana Transport
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 rounded-2xl border-l-4 border-red-600 bg-white p-10 shadow-xl"
        >
          <div className="mb-8 flex items-center">
            <Target size={32} className="mr-4 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                To provide safe, reliable, and efficient transportation
                solutions that enable our clients' success while maintaining the
                highest standards of professionalism and environmental
                responsibility.
              </p>
            </div>
            <div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  <span>Excellence in every delivery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  <span>Innovation in logistics solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  <span>Commitment to sustainability</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  <span>Building lasting partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Our Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
          className="rounded-3xl bg-white p-10 shadow-xl"
        >
          <div className="mb-8 flex items-center">
            <Award size={32} className="mr-4 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              Our Commitment to Excellence
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Safety-first approach in all operations',
              'Timely delivery with real-time tracking',
              'Competitive pricing with transparent billing',
              '24/7 customer support and emergency assistance',
              'Fully insured and licensed operations',
              'Experienced team with industry expertise',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-center space-x-3 rounded-xl bg-gray-50 p-4"
              >
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
