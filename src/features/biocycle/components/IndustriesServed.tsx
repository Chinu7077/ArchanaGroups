'use client';

import { Card } from '@/shared/components/ui/card';

export default function IndustriesServed({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const industries = [
    { name: 'Pharmaceuticals', icon: '💊' },
    { name: 'FMCG', icon: '📦' },
    { name: 'Brick Kilns', icon: '🧱' },
    { name: 'Boilers', icon: '🏭' },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-green-50 py-20">
      <div className="container mx-auto px-4">
        <div
          className={`mb-16 text-center ${getAnimationClass(
            'industries-header',
            'fade-up'
          )}`}
          data-animate
          id="industries-header"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Industries We Serve
          </h2>
        </div>

        <div
          className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${getAnimationClass(
            'industries-grid',
            'scale'
          )}`}
          data-animate
          id="industries-grid"
        >
          {industries.map((industry, index) => (
            <Card
              key={index}
              className="rounded-2xl border-0 bg-white p-8 text-center shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 text-4xl transition-transform duration-300 hover:scale-125">
                {industry.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {industry.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
