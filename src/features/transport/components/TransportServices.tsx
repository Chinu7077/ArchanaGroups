'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Clock, MapPin, Wrench, Users } from 'lucide-react';

export default function TransportServices() {
  const services = [
    {
      icon: <Truck size={32} />,
      title: 'Heavy Vehicle Transport',
      description:
        'We provide efficient transport services for industrial materials and machinery with a trusted fleet.',
    },
    {
      icon: <Shield size={32} />,
      title: 'Mining Logistics',
      description:
        'Comprehensive logistics solutions for mining operations, including equipment and material transport to remote locations.',
    },
    {
      icon: <Clock size={32} />,
      title: '24/7 Operations',
      description:
        'Round-the-clock service availability to meet your urgent transportation requirements and emergency needs.',
    },
    {
      icon: <MapPin size={32} />,
      title: 'Wide Coverage',
      description:
        'Extensive network covering major industrial areas and mining sites across Odisha with reliable connectivity.',
    },
    {
      icon: <Wrench size={32} />,
      title: 'Equipment Maintenance',
      description:
        'Regular maintenance and safety checks ensure our fleet is always ready for your transportation needs.',
    },
    {
      icon: <Users size={32} />,
      title: 'Expert Team',
      description:
        'A skilled logistics team committed to the safe and on-time transport of bulk materials and industrial loads.',
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            About Our Services
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Since 2022, we’ve been powering industrial logistics with efficient
            and professional transport of Fly Ash, Red Mud, and More — using a
            well-maintained fleet of dumpers and bulkers built for heavy-duty
            operations.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="text-center leading-relaxed text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
