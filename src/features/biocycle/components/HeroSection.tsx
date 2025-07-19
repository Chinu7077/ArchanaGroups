'use client';

import { useEffect, useRef, useState } from 'react';
import { Recycle, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function HeroSection({
  getAnimationClass = () => '',
  scrollToSection = () => {},
}: {
  getAnimationClass?: (id: string, type?: string) => string;
  scrollToSection?: (id: string) => void;
}) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    []
  );

  useEffect(() => {
    if (!slider) return;

    timer.current = setInterval(() => {
      slider.current?.next();
    }, 3000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slider]);

  const totalSlides = 6;

  return (
    <section
      id="home"
      className="overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center gap-12 lg:grid lg:grid-cols-2">
          {/* Hero Text */}
          <div
            className={`space-y-6 ${getAnimationClass('hero-content', 'fade-right')}`}
            data-animate
            id="hero-content"
          >
            <h1 className="text-center text-3xl leading-tight font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-left">
              Bio Waste{' '}
              <span className="inline-block text-green-600 transition-all duration-500 hover:scale-110">
                Bright Future
              </span>
            </h1>
            <p className="text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-left">
              We convert agricultural residue and plant-based waste into clean
              and renewable fuels—briquettes and pellets. These are a smart
              alternative to steam coal, offering a more eco-friendly way to
              produce energy.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('contact')}
                className="group rounded-full bg-green-600 px-6 py-3 text-base text-white transition duration-300 hover:scale-105 hover:bg-green-700 sm:text-lg"
              >
                Contact Us{' '}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Hero Image Slider */}
          <div
            className={`w-full ${getAnimationClass('hero-visual', 'fade-left')}`}
            data-animate
            id="hero-visual"
          >
            <div className="relative">
              <div
                ref={sliderRef}
                className="keen-slider aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/9]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="keen-slider__slide flex items-center justify-center"
                  >
                    <Image
                      src={`/images/H-${n}.png`}
                      alt={`Hero Slide ${n}`}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'scale-110 bg-green-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
