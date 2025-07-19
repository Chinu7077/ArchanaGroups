'use client';

import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function SellRawMaterial({
  getAnimationClass = () => '',
  scrollToSection = () => {},
}: {
  getAnimationClass?: (id: string, type?: string) => string;
  scrollToSection?: (id: string) => void;
}) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div
          className={`mx-auto max-w-5xl space-y-12 ${getAnimationClass(
            'raw-material',
            'fade-up'
          )}`}
          data-animate
          id="raw-material"
        >
          <h2 className="text-center text-4xl font-bold text-gray-800 md:text-6xl">
            Partner with Us: Sell Your Agricultural Waste
          </h2>

          <p className="text-center text-lg leading-relaxed text-gray-700 md:text-xl">
            <strong>Turn Your Waste into Wealth!</strong>
            <br />
            At{' '}
            <span className="font-semibold text-blue-600">
              Archana BioCycle
            </span>
            , we convert agricultural waste into eco-friendly biomass briquettes
            — a cleaner fuel for a greener tomorrow. Partner with us to sell
            materials like rice husks, bagasse, stalks, and more.
          </p>

          {/* Why Sell Section */}
          <div className="space-y-5 rounded-xl bg-gray-50 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">
              Why Sell to Us?
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {[
                {
                  label: 'Earn',
                  desc: 'Get fair pricing for your agri-waste.',
                },
                { label: 'Go Green', desc: 'Help support renewable energy.' },
                { label: 'No Hassle', desc: 'Easy pickup & prompt payment.' },
                {
                  label: 'Local Impact',
                  desc: 'Boost rural and farmer income.',
                },
              ].map((item, index) => (
                <li key={index} className="md:flex md:items-start md:gap-2">
                  <span className="hidden md:inline">•</span>
                  <div className="relative pl-6 md:pl-0">
                    <span className="absolute top-1 left-0 md:hidden">•</span>
                    <span className="block font-semibold text-gray-800 md:inline">
                      {item.label}:
                    </span>
                    <span className="block md:ml-1 md:inline">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Buy Section */}
          <div className="space-y-5 rounded-xl bg-gray-50 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">
              What We Buy
            </h3>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>Rice husk</li>
              <li>Sugarcane bagasse</li>
              <li>Corn cobs & stalks</li>
              <li>Wheat straw</li>
              <li>Other crop residues</li>
            </ul>
          </div>

          {/* How It Works Section */}
          <div className="space-y-5 rounded-xl bg-gray-50 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">
              How It Works
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {[
                {
                  label: 'Contact Us',
                  desc: 'Share type, quantity & location.',
                },
                { label: 'Get Quote', desc: 'Receive a fair offer.' },
                {
                  label: 'Pickup & Pay',
                  desc: 'We handle logistics & pay you fast.',
                },
              ].map((item, index) => (
                <li key={index} className="md:flex md:items-start md:gap-2">
                  <span className="hidden md:inline">•</span>
                  <div className="relative pl-6 md:pl-0">
                    <span className="absolute top-1 left-0 md:hidden">•</span>
                    <span className="block font-semibold text-gray-800 md:inline">
                      {item.label}:
                    </span>
                    <span className="block md:ml-1 md:inline">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3 text-center">
            <p className="text-lg font-medium text-gray-800 md:text-xl">
              Let’s build a cleaner future — together!
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              className="group rounded-full bg-blue-600 px-8 py-4 text-lg text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Sell Your Waste Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
