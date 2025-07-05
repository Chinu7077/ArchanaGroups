"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProductSpecifications({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const products = [
    {
      title: "Biomass Pellets",
      image: "/BF1.png",
      alt: "Biomass Pellets",
      gradient: "from-green-50 to-green-100",
      animation: "fade-right",
      id: "pellets-card",
      specs: [
        { label: "Shape", value: "Cylindrical" },
        { label: "Dimensions", value: "8mm, 10mm, 20mm diameter" },
        { label: "Length", value: "10–50mm" },
        { label: "Calorific Value", value: "3,200–4,100 Kcal/Kg" },
        { label: "Ash Content", value: "< 15%", highlight: true },
      ],
    },
    {
      title: "Biomass Briquettes",
      image: "/BF2.png",
      alt: "Biomass Briquettes",
      gradient: "from-blue-50 to-blue-100",
      animation: "fade-left",
      id: "briquettes-card",
      specs: [
        { label: "Shape", value: "Cylindrical" },
        { label: "Dimensions", value: "70mm, 90mm, 100mm diameter" },
        { label: "Length", value: "20–350mm" },
        { label: "Calorific Value", value: "3,200–4,100 Kcal/Kg" },
        { label: "Ash Content", value: "< 15%", highlight: true },
      ],
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${getAnimationClass(
            "products-header",
            "fade-up"
          )}`}
          data-animate
          id="products-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Product Specifications
          </h2>
          <p className="text-lg text-gray-600">
            Premium quality pellets and briquettes for your energy needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={getAnimationClass(product.id, product.animation)}
              data-animate
              id={product.id}
            >
              <Card
                className={`rounded-3xl shadow-xl border-0 bg-gradient-to-br ${product.gradient} p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 h-full flex flex-col justify-between`}
              >
                <CardHeader className="text-center p-0">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto mb-0">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      width={256}
                      height={256}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mt-0 pt-0">
                    {product.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 mt-4 text-sm sm:text-base">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 p-3 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                        spec.highlight
                          ? `bg-${
                              product.title.includes("Pellets")
                                ? "green"
                                : "blue"
                            }-100 text-${
                              product.title.includes("Pellets")
                                ? "green"
                                : "blue"
                            }-600 font-semibold`
                          : "bg-white text-gray-700"
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
