'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function TransportContact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, phone, message } = values;
    const text = `🚛 Inquiry from Archana Transport .

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    const phoneNumber = '918458035964';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    // Fix: No blank tab on mobile
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }

    toast('Message sent!', {
      description: 'Redirecting to WhatsApp...',
    });

    form.reset();
  }

  return (
    <section id="contact" className="bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-8 text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl lg:text-5xl">
            Contact Us
          </h2>
          <p className="px-4 text-lg text-gray-600 md:text-xl">
            Get in touch for your industrial transportation needs
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Form + Business Hours */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="rounded-2xl bg-white p-6 shadow-lg md:rounded-3xl md:p-8 lg:p-10"
            >
              <h3 className="mb-6 text-center text-xl font-bold text-gray-900 md:mb-8 md:text-2xl">
                Send Message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Message *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe your transportation requirements"
                            className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-red-700 hover:shadow-xl"
                  >
                    <Send size={20} />
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="rounded-xl bg-white p-6 shadow-lg md:rounded-2xl md:p-8"
            >
              <div className="mb-4 flex items-center md:mb-6">
                <Clock
                  size={20}
                  className="mr-2 text-red-600 md:mr-3 md:h-6 md:w-6"
                />
                <h4 className="text-base font-bold text-gray-900 md:text-lg">
                  Office Hours
                </h4>
              </div>
              <div className="space-y-3 text-sm text-gray-700 md:text-base">
                <div className="flex justify-between">
                  <span className="font-semibold">Mon - Sat:</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between font-semibold text-red-600">
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
            <div className="rounded-xl border-l-4 border-red-600 bg-white p-6 shadow-lg md:rounded-2xl md:p-8">
              <h3 className="mb-6 text-xl font-bold text-gray-900 md:mb-8 md:text-2xl">
                Contact Information
              </h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-gray-900">
                      Phone
                    </h4>
                    <p className="text-gray-700">
                      <a href="tel:+918458035964" className="hover:underline">
                        +91 8458035964
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <a href="tel:+917855877317" className="hover:underline">
                        +91 7855877317
                      </a>
                    </p>
                    <p className="mt-1 text-base font-semibold text-red-600">
                      24/7 Emergency
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-gray-900">
                      Email
                    </h4>
                    <p className="break-all text-gray-700">
                      <a
                        href="mailto:info.at@archanagroups.in"
                        className="hover:underline"
                      >
                        info.at@archanagroups.in
                      </a>
                    </p>
                    <p className="break-all text-gray-700">
                      <a
                        href="mailto:archanatransportrgd@gmail.com"
                        className="hover:underline"
                      >
                        archanatransportrgd@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-gray-900">
                      Registered Office
                    </h4>
                    <p className="leading-relaxed text-gray-700">
                      Gautam Nagar, 6th Lane,
                      <br />
                      Dig. Door No. 15,
                      <br />
                      Rayagada, Odisha - 765001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl bg-white p-4 shadow-lg md:rounded-2xl md:p-6">
              <h4 className="mb-3 flex items-center text-base font-bold text-gray-900 md:mb-4 md:text-lg">
                <MapPin size={18} className="mr-2 text-red-600 md:h-5 md:w-5" />
                Find Us Here
              </h4>

              <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-200 md:h-80 md:rounded-2xl">
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
  );
}
