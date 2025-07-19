'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function TransportPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: 'Ashtech India Pvt Ltd', logo: 'P1.png' },
    { name: 'Gargsons Logistics Pvt. Ltd.', logo: 'P2.png' },
    { name: 'Afar Infra India Pvt. Ltd.', logo: 'P3.png' },
    { name: 'JK Cement', logo: 'P4.png' },
    { name: 'H. G. Infra Engineering Limited', logo: 'P5.png' },
  ];

  const handlePause = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'paused';

      // Auto-resume after 2 seconds (for mobile tap)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.animationPlayState = 'running';
        }
      }, 2000);
    }
  };

  const handleResume = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <section id="partners" className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Our Clients
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={containerRef}
            className="animate-scroll flex gap-6"
            style={{
              animation: 'scroll 25s linear infinite',
              width: 'max-content',
              animationPlayState: 'running',
            }}
            onTouchStart={handlePause} // mobile tap
            onMouseEnter={handlePause} // desktop hover
            onMouseLeave={handleResume} // desktop resume
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-shrink-0 flex-col items-center"
                style={{ minWidth: 120 }}
              >
                <div className="relative h-20 w-20 rounded-2xl border-2 border-gray-200 bg-gray-100 md:h-24 md:w-24">
                  <Image
                    src={`/logos/${partner.logo}`}
                    alt={partner.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                <p className="mt-2 line-clamp-2 w-28 text-center text-xs leading-tight font-medium text-gray-600 md:w-auto md:text-sm">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
