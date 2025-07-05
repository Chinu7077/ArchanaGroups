"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TransportHero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <section
  id="hero"
  className="relative min-h-[100dvh] w-full flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start overflow-hidden px-4 sm:px-16 pt-0 sm:pt-0"
>
      {/* ✅ Background Image - Mobile */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-top sm:hidden"
        style={{
          backgroundImage: "url('/mp.png')",
        }}
      />

      {/* ✅ Background Image - Desktop */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-left sm:block hidden"
        style={{
          backgroundImage: "url('/ban2.jpg')",
        }}
      />

      
      {/* ✅ Foreground Content */}
      <div className="relative z-20 max-w-6xl w-full text-left">
        <div className="px-4 py-6 sm:px-10 sm:py-12 rounded-xl sm:rounded-3xl shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-center lg:gap-4 flex-wrap text-black"
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Industrial Waste Solutions
            </h1>
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-red-600">
              Bulkers, Dumpers & More
            </span>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed lg:ml-4 lg:mt-1 font-normal text-black">
            We provide end-to-end handling of Fly Ash and Red Mud through carefully planned, high-capacity logistics solutions — ensuring safe movement, environmental compliance, and operational efficiency at every step.
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
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold transition duration-300 ease-in-out rounded-xl shadow-lg group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300 ease-in-out"></span>
              <span className="relative z-10 text-white text-sm sm:text-base flex items-center gap-2">
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
