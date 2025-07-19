"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export default function Gallery() {
  const images = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Heavy truck loading operation at industrial site",
      title: "Heavy Vehicle Loading Operations",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mining equipment transport on mountain roads",
      title: "Mining Equipment Transport",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Industrial cargo delivery to construction site",
      title: "Industrial Cargo Delivery",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Construction equipment being loaded onto transport vehicle",
      title: "Construction Equipment Handling",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Fleet of red and black Archana Transport vehicles",
      title: "Our Professional Fleet",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Loading dock operations with heavy machinery",
      title: "Loading Dock Operations",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Night transport operations with proper lighting",
      title: "24/7 Transport Operations",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Team of professional drivers and logistics staff",
      title: "Our Expert Team",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Modern transport vehicles with safety equipment",
      title: "Safety-First Approach",
    },
  ]

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Gallery</h2>
          <p className="text-xl text-gray-600">See our operations, fleet, and team in action across India</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg">{image.title}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-full">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                <h3 className="text-xl font-bold">{images[selectedImage].title}</h3>
                <p className="text-gray-300">{images[selectedImage].alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
