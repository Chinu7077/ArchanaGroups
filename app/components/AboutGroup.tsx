export default function AboutGroup() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">About Archana Group</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Built on a foundation of trust, innovation, and excellence, we deliver solutions that drive progress and
            create lasting value
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-red-600">25+</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Years of Experience</h3>
            <p className="text-gray-600 text-lg">Decades of trusted service in transportation and logistics industry</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-green-600">500+</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Happy Clients</h3>
            <p className="text-gray-600 text-lg">Satisfied customers across various industries and sectors</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-blue-600">24/7</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Support</h3>
            <p className="text-gray-600 text-lg">Round-the-clock assistance and emergency services</p>
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-10 md:p-16">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h3>
            <p className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              To provide exceptional transportation and mobility solutions that exceed expectations while contributing
              to sustainable development. We are committed to innovation, reliability, and building lasting partnerships
              with our clients and communities across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
