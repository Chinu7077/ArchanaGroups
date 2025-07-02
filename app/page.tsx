"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleTransportNavigation = () => {
    router.push("/transport");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleBioCycleNavigation = () => {
    router.push("/biocycle");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-red-200 rounded-full opacity-20 animate-pulse delay-500" />
      </div>

      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-16 px-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* AG Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-[140px] h-[140px] sm:w-fit sm:h-fit sm:px-10 sm:py-8 md:px-16 md:py-12 flex items-center justify-center mx-auto relative"
          >
            <div className="flex items-center justify-center">
              <motion.div
                className="text-[52px] sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mr-[-14px] sm:mr-[-24px] md:mr-[-36px]"
                initial={{ x: -80, opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 120, damping: 14 }}
              >
                A
              </motion.div>
              <motion.div
                className="text-[52px] sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ x: 80, opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}
              >
                G
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-6"
          >
            Welcome to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Archana Groups of Companies
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
  className="text-sm sm:text-base md:text-xl text-gray-600 max-w-md sm:max-w-2xl mx-auto leading-relaxed text-center"
>
  Trusted partner in industrial transport and logistics,
  <br />
  empowering progress with clean and efficient mobility.
</motion.p>

        </div>
      </motion.header>

      {/* Portal Cards */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Transport */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group relative cursor-pointer"
            onClick={handleTransportNavigation}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all overflow-hidden h-full">
              <div className="bg-gradient-to-br from-red-600 via-red-700 to-black text-white p-8 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-white/60 rounded-xl backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/AT.png"
                      alt="Archana Transport"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Archana Transport</h3>
                  <p className="text-red-100 text-lg">Heavy Vehicle Solutions</p>
                </div>
              </div>
              <div className="p-8 text-center">
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-6">
  Experts in heavy transport and mining logistics <br />
  FlyAsh, Coal, RedMud, and more.
</p>
                <div className="inline-flex items-center justify-center space-x-3 bg-red-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                  <span>Enter Portal</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* BioCycle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group relative cursor-pointer"
            onClick={handleBioCycleNavigation}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all overflow-hidden h-full">
              <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white p-8 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
                <div className="relative z-10 text-center">
                  <div className="w-[220px] h-[100px] bg-white/50 rounded-xl backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/ABC.png"
                      alt="Archana BioCycle"
                      className="h-44 object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Archana BioCycle</h3>
                  <p className="text-green-100 text-lg">Sustainable Mobility</p>
                  <div className="flex justify-center mt-4">
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-6">
                  Eco-friendly transportation technology for a cleaner tomorrow.
                </p>
                <div className="inline-flex items-center justify-center space-x-3 bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                  <span>Enter Portal</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 1.4 }}
  className="relative z-10 py-12 px-4 bg-white bg-opacity-80 backdrop-blur-sm mt-20"
>
  <div className="max-w-4xl mx-auto text-center">
    {/* Logo + Brand Name */}
    <div className="flex flex-col items-center justify-center mb-6 sm:flex-row sm:gap-3">
      <div className="flex items-center">
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          A
        </div>
        <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-[-14px]">
          G
        </div>
      </div>
      <span className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2 sm:mt-0 sm:ml-4">
        Archana Groups
      </span>
    </div>

    {/* Slogan */}
    <p className="text-gray-600 mb-4 text-sm sm:text-lg px-2 sm:px-0">
  Efficiency meets responsibility in every kilometer we&nbsp;move.
</p>

    {/* Copyright */}
    <p className="text-gray-500 text-sm sm:text-base">
  © 2022 Archana Groups. All rights reserved.
</p>
  </div>
</motion.footer>
    </main>
  );
}
