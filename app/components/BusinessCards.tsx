import { Truck, Bike } from "lucide-react"
import Link from "next/link"

export default function BusinessCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Businesses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two distinct companies united by excellence, innovation, and commitment to quality service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Archana Transport Card */}
          <Link href="/transport" className="group">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-red-600 to-black p-10 text-white">
                <Truck size={56} className="mb-6" />
                <h3 className="text-3xl font-bold mb-4">Archana Transport</h3>
                <p className="text-red-100 text-lg">
                  Heavy vehicle transport, mining logistics, and industrial solutions
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 text-gray-600 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Heavy vehicle transportation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Mining & industrial logistics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Cargo & equipment solutions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    24/7 reliable service
                  </li>
                </ul>
                <div className="mt-8">
                  <span className="text-red-600 font-bold text-lg group-hover:text-red-800">Explore Services →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Archana BioCycle Card */}
          <Link href="/biocycle" className="group">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-10 text-white">
                <Bike size={56} className="mb-6" />
                <h3 className="text-3xl font-bold mb-4">Archana BioCycle</h3>
                <p className="text-green-100 text-lg">Sustainable mobility and eco-friendly transportation</p>
              </div>
              <div className="p-8">
                <div className="text-center py-12">
                  <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                    🚴‍♂️ Coming Soon
                  </div>
                  <p className="text-gray-600 text-lg font-medium">Pedaling Towards a Greener Tomorrow</p>
                  <p className="text-gray-500 mt-2">Launching Soon!</p>
                </div>
                <div className="mt-8">
                  <span className="text-green-600 font-bold text-lg group-hover:text-green-800">Stay Tuned →</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
