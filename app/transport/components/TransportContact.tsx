"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react"

export default function TransportContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, phone, message } = formData
    const text = `🚛 Inquiry from Archana Transport 🚛

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Message: ${message}`

    const encodedText = encodeURIComponent(text)
    const phoneNumber = "918458035964"
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    const url = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`

    // Fix: No blank tab on mobile
    if (isMobile) {
      window.location.href = url
    } else {
      window.open(url, "_blank")
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            Get in touch for your industrial transportation needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Form + Business Hours */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base transition-all font-medium"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base transition-all font-medium"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base transition-all font-medium"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base transition-all font-medium resize-none"
                    placeholder="Describe your transportation requirements"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Clock size={20} className="text-red-600 mr-2 md:mr-3 md:w-6 md:h-6" />
                <h4 className="font-bold text-gray-900 text-base md:text-lg">Office Hours</h4>
              </div>
              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="font-semibold">Mon - Sat:</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Emergency:</span>
                  <span>24/7 Available</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-white border-l-4 border-red-600 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Contact Information</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-red-600 mt-1 w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Phone</h4>
                    <p className="text-gray-700">
                      <a href="tel:+918458035964" className="hover:underline">+91 8458035964</a>
                    </p>
                    <p className="text-gray-700">
                      <a href="tel:+917855877317" className="hover:underline">+91 7855877317</a>
                    </p>
                    <p className="text-red-600 text-base mt-1 font-semibold">24/7 Emergency</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-red-600 mt-1 w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Email</h4>
                    <p className="text-gray-700 break-all">
                      <a href="mailto:info.at@archanagroups.in" className="hover:underline">info.at@archanagroups.in</a>
                    </p>
                    <p className="text-gray-700 break-all">
                      <a href="mailto:archanatransportrgd@gmail.com" className="hover:underline">archanatransportrgd@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-red-600 mt-1 w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Registered Office</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Gautam Nagar, 6th Lane,<br />
                      Dig. Door No. 15,<br />
                      Rayagada, Odisha - 765001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 text-base md:text-lg mb-3 md:mb-4 flex items-center">
                <MapPin size={18} className="text-red-600 mr-2 md:w-5 md:h-5" />
                Find Us Here
              </h4>

              <div className="w-full h-60 md:h-80 bg-gray-200 rounded-lg md:rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9166.754844724384!2d83.421363!3d19.161417!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3b4355db06ea5d%3A0xb49ddcb2b2527a83!2sGautam%20Nagar%2C%20Raniguda%20Farm%2C%20Rayagada%2C%20Odisha%20765001!5e1!3m2!1sen!2sin!4v1751343466736!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg md:rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
