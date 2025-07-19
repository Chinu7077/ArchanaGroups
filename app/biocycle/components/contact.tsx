"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactSection({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const phoneNumber = "8458035964"; // Archana BioCycle WhatsApp number
  const formattedPhone = "+91 84580 35964"; // Display version
  const email = "info.abc@archanagroups.in";

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 ${getAnimationClass("contact-header", "fade-up")}`}
          data-animate
          id="contact-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            Get in touch with us for all your biomass fuel needs
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            className={getAnimationClass("contact-info", "fade-right")}
            data-animate
            id="contact-info"
          >
            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  value: formattedPhone,
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: Mail,
                  title: "Email",
                  value: email,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: MapPin,
                  title: "Archana Transport Office",
                  value: `Gautam Nagar, 6th Lane,\nDig. Door No. 15,\nRayagada, Odisha – 765001`,
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((contact, index) => (
                <div
                  key={contact.title}
                  className="flex items-start space-x-4 transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
                  >
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {contact.title}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {contact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Form */}
          <div
            className={getAnimationClass("contact-form", "fade-left")}
            data-animate
            id="contact-form"
          >
            <Card className="p-8 rounded-3xl shadow-xl border-0 bg-white transition-all duration-500 hover:shadow-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;

                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const emailInput = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

                  const text = `♻️ Inquiry from Archana BioCycle %0A%0A👤 Name: ${name}%0A📧 Email: ${emailInput}%0A📞 Phone: ${phone}%0A📝 Message: ${message}`;
                  const whatsappURL = /Android|iPhone/i.test(navigator.userAgent)
                    ? `https://wa.me/91${phoneNumber}?text=${text}`
                    : `https://web.whatsapp.com/send?phone=91${phoneNumber}&text=${text}`;

                  window.open(whatsappURL, "_blank");
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Name"
                    required
                    className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                  />
                </div>
                <Input
                  name="phone"
                  placeholder="Phone"
                  required
                  className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                />
                <Textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Quote */}
        <div
          className={`text-center mt-16 ${getAnimationClass("contact-quote", "fade-up")}`}
          data-animate
          id="contact-quote"
        >
          <p className="text-xl font-semibold text-gray-800">
            "Renewable. Responsible. Revolutionary — That's What Our Biomass Solutions Stand For."
          </p>
        </div>
      </div>
    </section>
  );
}
