'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
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

export default function ContactSection({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const phoneNumber = '8458035964'; // Archana BioCycle WhatsApp number
  const formattedPhone = '+91 84580 35964'; // Display version
  const email = 'info.abc@archanagroups.in';

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
    const text = `♻️ Inquiry from Archana BioCycle %0A%0A👤 Name: ${name}%0A📧 Email: ${email}%0A📞 Phone: ${phone}%0A📝 Message: ${message}`;
    const whatsappURL = /Android|iPhone/i.test(navigator.userAgent)
      ? `https://wa.me/91${phoneNumber}?text=${text}`
      : `https://web.whatsapp.com/send?phone=91${phoneNumber}&text=${text}`;

    window.open(whatsappURL, '_blank');

    toast('Message sent!', {
      description: 'Redirecting to WhatsApp...',
    });

    form.reset();
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`mb-16 text-center ${getAnimationClass('contact-header', 'fade-up')}`}
          data-animate
          id="contact-header"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            Get in touch with us for all your biomass fuel needs
          </p>
        </div>

        {/* Grid Layout */}
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div
            className={getAnimationClass('contact-info', 'fade-right')}
            data-animate
            id="contact-info"
          >
            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  value: formattedPhone,
                  color: 'bg-green-100 text-green-600',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  value: email,
                  color: 'bg-blue-100 text-blue-600',
                },
                {
                  icon: MapPin,
                  title: 'Archana Transport Office',
                  value: `Gautam Nagar, 6th Lane,\nDig. Door No. 15,\nRayagada, Odisha – 765001`,
                  color: 'bg-purple-100 text-purple-600',
                },
              ].map((contact, index) => (
                <div
                  key={contact.title}
                  className="flex items-start space-x-4 transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`h-12 w-12 ${contact.color} flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
                  >
                    <contact.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {contact.title}
                    </h3>
                    <p className="whitespace-pre-line text-gray-600">
                      {contact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Form */}
          <div
            className={getAnimationClass('contact-form', 'fade-left')}
            data-animate
            id="contact-form"
          >
            <Card className="rounded-3xl border-0 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Name"
                              className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
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
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Phone"
                            className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
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
                        <FormControl>
                          <Textarea
                            placeholder="Message"
                            rows={4}
                            className="rounded-xl border-gray-200 transition-all duration-300 focus:scale-105"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-green-600 py-3 text-lg text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>

        {/* Quote */}
        <div
          className={`mt-16 text-center ${getAnimationClass('contact-quote', 'fade-up')}`}
          data-animate
          id="contact-quote"
        >
          <p className="text-xl font-semibold text-gray-800">
            "Renewable. Responsible. Revolutionary — That's What Our Biomass
            Solutions Stand For."
          </p>
        </div>
      </div>
    </section>
  );
}
