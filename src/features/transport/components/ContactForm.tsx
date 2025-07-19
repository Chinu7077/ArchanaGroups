'use client';

import type React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Phone, Mail, MapPin, Send, Clock, Shield } from 'lucide-react';
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
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .or(z.literal('')),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', values);
    toast('Thank you for your message!', {
      description: 'Our team will contact you within 24 hours.',
    });
    form.reset();
  }

  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600">
            Get in touch for your heavy vehicle transportation needs
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-gray-50 p-10">
            <h3 className="mb-8 text-2xl font-bold text-gray-900">
              Send Us a Message
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-gray-700">
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500"
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
                      <FormLabel className="text-sm font-bold text-gray-700">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500"
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
                      <FormLabel className="text-sm font-bold text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500"
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
                      <FormLabel className="text-sm font-bold text-gray-700">
                        Message *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Describe your transportation requirements, cargo details, pickup/delivery locations, and timeline"
                          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="flex w-full items-center justify-center space-x-3 rounded-lg bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-red-700"
                >
                  <Send size={24} />
                  <span>Send Message</span>
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8 rounded-2xl bg-gradient-to-br from-red-600 to-black p-10 text-white">
              <h3 className="mb-8 text-3xl font-bold">Get In Touch</h3>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone size={28} className="mt-1 text-red-200" />
                  <div>
                    <h4 className="mb-2 text-xl font-bold">Phone Numbers</h4>
                    <p className="text-lg text-red-100">+91 98765 43210</p>
                    <p className="text-lg text-red-100">+91 87654 32109</p>
                    <p className="mt-1 text-sm text-red-100">
                      24/7 Emergency Hotline
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={28} className="mt-1 text-red-200" />
                  <div>
                    <h4 className="mb-2 text-xl font-bold">Email</h4>
                    <p className="text-lg text-red-100">
                      transport@archanagroup.com
                    </p>
                    <p className="text-lg text-red-100">
                      info@archanatransport.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin size={28} className="mt-1 text-red-200" />
                  <div>
                    <h4 className="mb-2 text-xl font-bold">Head Office</h4>
                    <p className="text-lg text-red-100">
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

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-6">
                <Clock size={32} className="mb-4 text-red-600" />
                <h4 className="mb-3 text-lg font-bold text-gray-900">
                  Business Hours
                </h4>
                <p className="text-gray-700">
                  Monday - Saturday:
                  <br />
                  <span className="font-semibold">6:00 AM - 10:00 PM</span>
                  <br />
                  Sunday:
                  <br />
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  <br />
                  <span className="font-semibold text-red-600">
                    Emergency: 24/7
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-6">
                <Shield size={32} className="mb-4 text-red-600" />
                <h4 className="mb-3 text-lg font-bold text-gray-900">
                  Quick Response
                </h4>
                <p className="text-gray-700">
                  <span className="font-semibold">Quote Response:</span> Within
                  2 hours
                  <br />
                  <span className="font-semibold">Emergency Service:</span>{' '}
                  Within 30 minutes
                  <br />
                  <span className="font-semibold">Regular Booking:</span> Same
                  day confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
