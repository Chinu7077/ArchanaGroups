'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TransportHero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-0 sm:flex-row sm:items-center sm:justify-start sm:px-16 sm:pt-0"
    >
      {/* ✅ Background Image - Mobile */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat sm:hidden"
        style={{
          backgroundImage: "url('/mp4.png')",
        }}
      />

      {/* ✅ Background Image - Desktop */}
      <div
        className="absolute inset-0 z-0 hidden bg-cover bg-left bg-no-repeat sm:block"
        style={{
          backgroundImage: "url('/ban2.jpg')",
        }}
      />

      {/* ✅ Foreground Content */}
      <div className="relative z-20 w-full max-w-6xl text-left">
        <div className="rounded-xl px-4 py-6 shadow-2xl sm:rounded-3xl sm:px-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col flex-wrap text-black lg:flex-row lg:items-center lg:gap-4"
          >
            <h1 className="text-2xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              Industrial Waste Solutions
            </h1>
            <span className="text-xl font-semibold text-red-600 sm:text-2xl lg:text-3xl">
              Bulkers, Dumpers & More
            </span>
            <p className="text-sm leading-relaxed font-normal text-black sm:text-base lg:mt-1 lg:ml-4 lg:text-lg">
              We provide end-to-end handling of Fly Ash and Red Mud through
              carefully planned, high-capacity logistics solutions — ensuring
              safe movement, environmental compliance, and operational
              efficiency at every step.
            </p>
          </motion.div>

          {/* ✅ Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6"
          >
            <button
              onClick={scrollToContact}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-semibold shadow-lg transition duration-300 ease-in-out"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 transition-all duration-300 ease-in-out group-hover:from-red-600 group-hover:to-red-700"></span>
              <span className="relative z-10 flex items-center gap-2 text-sm text-white sm:text-base">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
