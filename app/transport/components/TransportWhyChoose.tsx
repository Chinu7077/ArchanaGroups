"use client";

import { motion } from "framer-motion";
import { Target, Heart, Award } from "lucide-react";
import Image from "next/image";

export default function TransportWhyChoose() {
  return (
    <section id="why-choose" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
          className="bg-white rounded-3xl p-10 shadow-xl mb-16 relative overflow-hidden"
        >
          {/* Soft blur background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-red-50 opacity-50"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Heart size={32} className="text-red-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                Message from Founder
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Founder Photo */}
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Founder"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-gray-800">TULASI DAS</p>
                  <p className="text-sm text-gray-600">Managing Director</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-6">
                  "When I started Archana Transport, my goal was simple — to
                  bring honesty, structure, and accountability to industrial
                  logistics. Today, we proudly partner with businesses that
                  share our values — efficiency, safety, and trust. Because at
                  the end of the day, we’re not just moving materials. We’re
                  moving reputations."
                </blockquote>
                <p className="text-gray-800 font-bold text-lg">
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
          className="bg-white border-l-4 border-red-600 rounded-2xl p-10 shadow-xl mb-16"
        >
          <div className="flex items-center mb-8">
            <Target size={32} className="text-red-600 mr-4" />
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To provide safe, reliable, and efficient transportation
                solutions that enable our clients' success while maintaining the
                highest standards of professionalism and environmental
                responsibility.
              </p>
            </div>
            <div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Excellence in every delivery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Innovation in logistics solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Commitment to sustainability</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
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
          className="bg-white rounded-3xl p-10 shadow-xl"
        >
          <div className="flex items-center mb-8">
            <Award size={32} className="text-red-600 mr-4" />
            <h3 className="text-2xl font-bold text-gray-900">
              Our Commitment to Excellence
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Safety-first approach in all operations",
              "Timely delivery with real-time tracking",
              "Competitive pricing with transparent billing",
              "24/7 customer support and emergency assistance",
              "Fully insured and licensed operations",
              "Experienced team with industry expertise",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
