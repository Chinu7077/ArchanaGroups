'use client';

import { Eye, Target } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

export default function AboutSection({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const stats = [
    {
      value: '24×7',
      label: 'Production Capability',
      color: 'text-green-600',
    },
    {
      value: '50+',
      label: 'TPD Production Capacity',
      color: 'text-blue-600',
    },
    {
      value: '25,000+',
      label: 'Tonnes Processed',
      color: 'text-purple-600',
    },
    {
      value: '100%',
      label: 'Agro-Waste Based',
      color: 'text-orange-600',
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`mb-16 text-center ${getAnimationClass(
            'about-header',
            'fade-up'
          )}`}
          data-animate
          id="about-header"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Building the Future of Clean Energy
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Backed by advanced infrastructure and a skilled workforce, our
            biomass production facility is designed to deliver consistent
            quality and high output. With a strong focus on innovation and
            sustainability, we provide clean energy solutions that meet the
            demands of today’s industries and tomorrow’s world.
          </p>
        </div>

        {/* Vision, Mission & Stats */}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Vision & Mission */}
          <div
            className={getAnimationClass('vision-mission', 'fade-right')}
            data-animate
            id="vision-mission"
          >
            <div className="space-y-6">
              {/* Vision */}
              <div className="group space-y-4">
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-bold text-gray-800">Vision</h3>
                </div>
                <p className="pl-9 text-gray-600">
                  To be a driving force in the global shift from fossil fuels to
                  renewable biomass energy — creating a cleaner, greener, and
                  more sustainable industrial future.
                </p>
              </div>

              {/* Mission */}
              <div className="group space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-bold text-gray-800">Mission</h3>
                </div>
                <p className="pl-9 text-gray-600">
                  To deliver high-quality, eco-friendly biomass fuel solutions
                  that enable industries to operate efficiently, reduce their
                  carbon footprint, and transition toward sustainable energy
                  practices.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={getAnimationClass('stats-grid', 'fade-left')}
            data-animate
            id="stats-grid"
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="rounded-2xl border-0 bg-white p-6 text-center shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`text-3xl font-bold ${stat.color} mb-2 transition-all duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
