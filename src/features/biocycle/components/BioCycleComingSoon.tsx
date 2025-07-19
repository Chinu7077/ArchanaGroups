'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Heart,
  Globe,
  ArrowRight,
  Mail,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';

export default function BioCycleComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleNotify = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    setEmail('');
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
    <section className="relative flex min-h-screen items-center justify-center bg-white px-4 py-20">
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
              className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 text-lg font-semibold text-green-700 shadow-xl"
            >
              <CheckCircle size={28} className="text-green-600" />
              Thank you! We will notify you soon.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mx-auto mt-0 mb-6 w-full max-w-xs sm:max-w-sm md:max-w-md">
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
            className="mb-6 text-4xl font-bold text-gray-900 md:text-7xl"
          >
            Archana BioCycle
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-xl font-bold text-green-700 md:text-3xl"
          >
            Pedaling Towards a Greener Tomorrow
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block rounded-full bg-green-600 px-6 py-3 text-lg font-bold text-white shadow-lg md:px-8 md:py-4 md:text-2xl"
          >
            Launching Soon!
          </motion.div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 rounded-3xl bg-white p-10 shadow-2xl md:p-16"
        >
          <h2 className="mb-12 text-3xl font-bold text-gray-900 md:text-4xl">
            Revolutionary Sustainable Mobility Solutions
          </h2>

          <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="rounded-2xl border-2 border-green-200 bg-green-50 p-6"
              >
                <div className="mb-2 text-4xl font-bold text-green-600 md:text-5xl">
                  {item.value}
                </div>
                <div className="font-medium text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Leaf size={40} />,
                title: 'Eco-Friendly',
                description:
                  'Zero emission transportation solutions for a cleaner planet',
              },
              {
                icon: <Heart size={40} />,
                title: 'Health Focused',
                description:
                  'Promoting active and healthy lifestyles for everyone',
              },
              {
                icon: <Globe size={40} />,
                title: 'Sustainable Future',
                description:
                  'Contributing to a sustainable and greener tomorrow',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                className="rounded-2xl bg-green-50 p-6 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-600"
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
            className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-8"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Be the First to Know
            </h3>
            <p className="mb-6 text-lg text-gray-600">
              Subscribe to get notified when we launch and receive exclusive
              early access offers.
            </p>
            <div className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border-2 border-gray-200 px-6 py-4 text-lg transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleNotify}
                className="flex items-center justify-center space-x-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-green-700 hover:shadow-xl"
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
          <p className="mb-4 text-lg text-gray-600">
            Have questions? We'd love to hear from you!
          </p>
          <a
            href="mailto:info.abc@archanagroups.in"
            className="inline-flex items-center space-x-2 text-xl font-bold text-green-600 transition-colors hover:text-green-700"
          >
            <Mail size={24} />
            <span>info.abc@archanagroups.in</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
