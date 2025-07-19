'use client';

import { Card } from '@/shared/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function BiomassProcess({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const processSteps = [
    { step: 'Waste', icon: '🌾' },
    { step: 'Drying', icon: '☀️' },
    { step: 'Crushing', icon: '⚙️' },
    { step: 'Briquetting', icon: '🔧' },
    { step: 'Packaging', icon: '📦' },
    { step: 'Delivery', icon: '🚛' },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div
          className={`mb-16 text-center ${getAnimationClass(
            'process-header',
            'fade-up'
          )}`}
          data-animate
          id="process-header"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Biomass Waste to Energy – Our Process
          </h2>
        </div>

        <div
          className={`grid gap-6 md:grid-cols-3 lg:grid-cols-6 ${getAnimationClass(
            'process-grid',
            'scale'
          )}`}
          data-animate
          id="process-grid"
        >
          {processSteps.map((process, index) => (
            <div key={index} className="text-center">
              <Card
                className="mb-4 rounded-2xl border-0 bg-white p-6 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-2 text-3xl transition-transform duration-300 hover:scale-125">
                  {process.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{process.step}</h3>
              </Card>
              {index < processSteps.length - 1 && (
                <ArrowRight className="mx-auto hidden h-6 w-6 text-gray-400 transition-all duration-300 hover:text-green-600 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
