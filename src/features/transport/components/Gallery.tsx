'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Heavy truck loading operation at industrial site',
      title: 'Heavy Vehicle Loading Operations',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Mining equipment transport on mountain roads',
      title: 'Mining Equipment Transport',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Industrial cargo delivery to construction site',
      title: 'Industrial Cargo Delivery',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Construction equipment being loaded onto transport vehicle',
      title: 'Construction Equipment Handling',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Fleet of red and black Archana Transport vehicles',
      title: 'Our Professional Fleet',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Loading dock operations with heavy machinery',
      title: 'Loading Dock Operations',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Night transport operations with proper lighting',
      title: '24/7 Transport Operations',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Team of professional drivers and logistics staff',
      title: 'Our Expert Team',
    },
    {
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Modern transport vehicles with safety equipment',
      title: 'Safety-First Approach',
    },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Gallery
          </h2>
          <p className="text-xl text-gray-600">
            See our operations, fleet, and team in action across India
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                width={600}
                height={400}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <p className="text-lg font-bold text-white">{image.title}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage !== null && (
          <div
            className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-h-full max-w-6xl">
              <Image
                src={images[selectedImage].src || '/placeholder.svg'}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 rounded-full bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
              >
                <X size={24} />
              </button>
              <div className="bg-opacity-75 absolute right-4 bottom-4 left-4 rounded-lg bg-black p-4 text-white">
                <h3 className="text-xl font-bold">
                  {images[selectedImage].title}
                </h3>
                <p className="text-gray-300">{images[selectedImage].alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
