"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Heart,
  Globe,
  ArrowRight,
  Mail,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function BioCycleComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleNotify = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    setEmail("");
  };

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-white">
      {/* ✅ Toast Centered */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl px-6 py-5 shadow-xl text-green-700 text-lg font-semibold flex items-center gap-3"
            >
              <CheckCircle size={28} className="text-green-600" />
              Thank you! We will notify you soon.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 mt-0">
            <Image
              src="/ABC.png"
              alt="Archana BioCycle Logo"
              width={300}
              height={300}
              className="mx-auto object-contain"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Archana BioCycle
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-green-700 font-bold mb-6"
          >
            Pedaling Towards a Greener Tomorrow
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-2xl font-bold shadow-lg"
          >
            Launching Soon!
          </motion.div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Revolutionary Sustainable Mobility Solutions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="bg-green-50 rounded-2xl p-6 border-2 border-green-200"
              >
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {item.value}
                </div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Leaf size={40} />,
                title: "Eco-Friendly",
                description:
                  "Zero emission transportation solutions for a cleaner planet",
              },
              {
                icon: <Heart size={40} />,
                title: "Health Focused",
                description:
                  "Promoting active and healthy lifestyles for everyone",
              },
              {
                icon: <Globe size={40} />,
                title: "Sustainable Future",
                description:
                  "Contributing to a sustainable and greener tomorrow",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                className="text-center p-6 bg-green-50 rounded-2xl"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            We're working on something amazing! Get ready for innovative,
            eco-friendly transportation solutions that will revolutionize
            sustainable mobility with cutting-edge technology.
          </motion.p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be the First to Know
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Subscribe to get notified when we launch and receive exclusive
              early access offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg transition-all"
              />
              <button
                onClick={handleNotify}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Notify Me</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4 text-lg">
            Have questions? We'd love to hear from you!
          </p>
          <a
            href="mailto:info.abc@archanagroups.in"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-bold text-xl transition-colors"
          >
            <Mail size={24} />
            <span>info.abc@archanagroups.in</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
