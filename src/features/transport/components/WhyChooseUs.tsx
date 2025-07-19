import { Target, Heart } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Why Choose Archana Transport?
          </h2>
          <p className="text-xl text-gray-600">
            Built on trust, driven by excellence
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
                  <Heart size={32} className="text-red-600" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Message from the Founder
                  </h3>
                  <p className="mb-4 text-lg leading-relaxed text-gray-600">
                    "At Archana Transport, we believe in building relationships
                    that last. Our commitment to excellence and customer
                    satisfaction has been the cornerstone of our success for
                    over two decades. Every client is family to us, and we treat
                    their cargo with the same care we would our own."
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    - Founder & Managing Director, Archana Transport
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-black">
                  <Target size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    To provide safe, reliable, and efficient transportation
                    solutions that enable our clients' success while maintaining
                    the highest standards of professionalism and environmental
                    responsibility. We strive to be India's most trusted heavy
                    vehicle transport partner.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-gray-50 p-10">
            <h3 className="mb-8 text-3xl font-bold text-gray-900">
              Our Commitment to You
            </h3>
            <ul className="space-y-5">
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  Safety-first approach in all operations
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  Timely delivery with real-time tracking
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  Competitive pricing with transparent billing
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  24/7 customer support and emergency assistance
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  Fully insured and licensed operations
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-lg text-gray-700">
                  Experienced team with industry expertise
                </span>
              </li>
            </ul>

            <div className="mt-8 rounded-xl border-l-4 border-red-600 bg-white p-6">
              <p className="text-lg font-medium text-gray-700">
                "Your success is our success. We don't just transport your cargo
                - we deliver your trust."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
