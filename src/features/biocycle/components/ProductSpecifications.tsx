'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';

export default function ProductSpecifications({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const products = [
    {
      title: 'Biomass Pellets',
      image: '/BF1.png',
      alt: 'Biomass Pellets',
      gradient: 'from-green-50 to-green-100',
      animation: 'fade-right',
      id: 'pellets-card',
      specs: [
        { label: 'Shape', value: 'Cylindrical' },
        { label: 'Dimensions', value: '8mm, 10mm, 20mm diameter' },
        { label: 'Length', value: '10–50mm' },
        { label: 'Calorific Value', value: '3,200–4,100 Kcal/Kg' },
        { label: 'Ash Content', value: '< 15%', highlight: true },
      ],
    },
    {
      title: 'Biomass Briquettes',
      image: '/BF2.png',
      alt: 'Biomass Briquettes',
      gradient: 'from-blue-50 to-blue-100',
      animation: 'fade-left',
      id: 'briquettes-card',
      specs: [
        { label: 'Shape', value: 'Cylindrical' },
        { label: 'Dimensions', value: '70mm, 90mm, 100mm diameter' },
        { label: 'Length', value: '20–350mm' },
        { label: 'Calorific Value', value: '3,200–4,100 Kcal/Kg' },
        { label: 'Ash Content', value: '< 15%', highlight: true },
      ],
    },
  ];

  return (
    <section id="products" className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`mb-16 text-center ${getAnimationClass(
            'products-header',
            'fade-up'
          )}`}
          data-animate
          id="products-header"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Product Specifications
          </h2>
          <p className="text-lg text-gray-600">
            Premium quality pellets and briquettes for your energy needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={getAnimationClass(product.id, product.animation)}
              data-animate
              id={product.id}
            >
              <Card
                className={`rounded-3xl border-0 bg-gradient-to-br shadow-xl ${product.gradient} flex h-full flex-col justify-between p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              >
                <CardHeader className="p-0 text-center">
                  <div className="mx-auto mb-0 h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      width={256}
                      height={256}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <CardTitle className="mt-0 pt-0 text-xl leading-tight font-bold text-gray-800 sm:text-2xl">
                    {product.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="mt-4 space-y-3 text-sm sm:text-base">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col items-start justify-between gap-1 rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-md sm:flex-row sm:items-center ${
                        spec.highlight
                          ? `bg-${
                              product.title.includes('Pellets')
                                ? 'green'
                                : 'blue'
                            }-100 text-${
                              product.title.includes('Pellets')
                                ? 'green'
                                : 'blue'
                            }-600 font-semibold`
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
