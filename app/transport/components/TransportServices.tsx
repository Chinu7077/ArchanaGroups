"use client"

import { motion } from "framer-motion"
import { Truck, Shield, Clock, MapPin, Wrench, Users } from "lucide-react"

export default function TransportServices() {
  const services = [
    {
      icon: <Truck size={32} />,
      title: "Heavy Vehicle Transport",
      description:
        "We provide efficient transport services for industrial materials and machinery with a trusted fleet.",
    },
    {
      icon: <Shield size={32} />,
      title: "Mining Logistics",
      description:
        "Comprehensive logistics solutions for mining operations, including equipment and material transport to remote locations.",
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Operations",
      description:
        "Round-the-clock service availability to meet your urgent transportation requirements and emergency needs.",
    },
    {
      icon: <MapPin size={32} />,
      title: "Wide Coverage",
      description:
        "Extensive network covering major industrial areas and mining sites across Odisha with reliable connectivity.",
    },
    {
      icon: <Wrench size={32} />,
      title: "Equipment Maintenance",
      description:
        "Regular maintenance and safety checks ensure our fleet is always ready for your transportation needs.",
    },
    {
      icon: <Users size={32} />,
      title: "Expert Team",
      description:
        "A skilled logistics team committed to the safe and on-time transport of bulk materials and industrial loads.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Since 2022, we’ve been powering industrial logistics with efficient and professional transport of Fly Ash, Red Mud, and Coal — using a well-maintained fleet of dumpers and bulkers built for heavy-duty operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-700 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
