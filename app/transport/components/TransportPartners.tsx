"use client";

import { useRef } from "react";
import Image from "next/image";

export default function TransportPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: "Ashtech India Pvt Ltd", logo: "P1.png" },
    { name: "Gargsons Logistics Pvt. Ltd.", logo: "P2.png" },
    { name: "Afar Infra India Pvt. Ltd.", logo: "P3.png" },
    { name: "JK Cement", logo: "P4.png" },
    { name: "H. G. Infra Engineering Limited", logo: "P5.png" },
  ];

  const handlePause = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = "paused";

      // Auto-resume after 2 seconds (for mobile tap)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.animationPlayState = "running";
        }
      }, 2000);
    }
  };

  const handleResume = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section id="partners" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Partners
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-6 animate-scroll"
            style={{
              animation: "scroll 25s linear infinite",
              width: "max-content",
              animationPlayState: "running",
            }}
            onTouchStart={handlePause} // mobile tap
            onMouseEnter={handlePause} // desktop hover
            onMouseLeave={handleResume} // desktop resume
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center flex-shrink-0"
                style={{ minWidth: 120 }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-2xl border-2 border-gray-200">
                  <Image
                    src={`/logos/${partner.logo}`}
                    alt={partner.name}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <p className="mt-2 text-xs md:text-sm font-medium text-gray-600 text-center w-28 md:w-auto line-clamp-2 leading-tight">
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
