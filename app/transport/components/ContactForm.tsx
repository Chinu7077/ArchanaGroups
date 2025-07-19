"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Send, Clock, Shield } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! Our team will contact you within 24 hours.")
    setFormData({ name: "", phone: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-xl text-gray-600">Get in touch for your heavy vehicle transportation needs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Describe your transportation requirements, cargo details, pickup/delivery locations, and timeline"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-3 shadow-lg"
              >
                <Send size={24} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-gradient-to-br from-red-600 to-black text-white rounded-2xl p-10 mb-8">
              <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone size={28} className="text-red-200 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Phone Numbers</h4>
                    <p className="text-red-100 text-lg">+91 98765 43210</p>
                    <p className="text-red-100 text-lg">+91 87654 32109</p>
                    <p className="text-red-100 text-sm mt-1">24/7 Emergency Hotline</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={28} className="text-red-200 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Email</h4>
                    <p className="text-red-100 text-lg">transport@archanagroup.com</p>
                    <p className="text-red-100 text-lg">info@archanatransport.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin size={28} className="text-red-200 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Head Office</h4>
                    <p className="text-red-100 text-lg">
                      123 Transport Hub,
                      <br />
                      Industrial Area,
                      <br />
                      City - 123456, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <Clock size={32} className="text-red-600 mb-4" />
                <h4 className="font-bold text-gray-900 text-lg mb-3">Business Hours</h4>
                <p className="text-gray-700">
                  Monday - Saturday:
                  <br />
                  <span className="font-semibold">6:00 AM - 10:00 PM</span>
                  <br />
                  Sunday:
                  <br />
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  <br />
                  <span className="text-red-600 font-semibold">Emergency: 24/7</span>
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <Shield size={32} className="text-red-600 mb-4" />
                <h4 className="font-bold text-gray-900 text-lg mb-3">Quick Response</h4>
                <p className="text-gray-700">
                  <span className="font-semibold">Quote Response:</span> Within 2 hours
                  <br />
                  <span className="font-semibold">Emergency Service:</span> Within 30 minutes
                  <br />
                  <span className="font-semibold">Regular Booking:</span> Same day confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
