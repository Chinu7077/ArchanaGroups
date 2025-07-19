import { Target, Heart } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Archana Transport?</h2>
          <p className="text-xl text-gray-600">Built on trust, driven by excellence</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart size={32} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message from the Founder</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    "At Archana Transport, we believe in building relationships that last. Our commitment to excellence
                    and customer satisfaction has been the cornerstone of our success for over two decades. Every client
                    is family to us, and we treat their cargo with the same care we would our own."
                  </p>
                  <p className="text-gray-800 font-bold text-lg">- Founder & Managing Director, Archana Transport</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To provide safe, reliable, and efficient transportation solutions that enable our clients' success
                    while maintaining the highest standards of professionalism and environmental responsibility. We
                    strive to be India's most trusted heavy vehicle transport partner.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment to You</h3>
            <ul className="space-y-5">
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">Safety-first approach in all operations</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">Timely delivery with real-time tracking</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">Competitive pricing with transparent billing</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">24/7 customer support and emergency assistance</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">Fully insured and licensed operations</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-lg">Experienced team with industry expertise</span>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-white rounded-xl border-l-4 border-red-600">
              <p className="text-gray-700 font-medium text-lg">
                "Your success is our success. We don't just transport your cargo - we deliver your trust."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
