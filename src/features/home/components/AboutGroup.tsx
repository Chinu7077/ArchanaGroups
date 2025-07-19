export default function AboutGroup() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
            About Archana Group
          </h2>
          <p className="mx-auto max-w-4xl text-xl text-gray-600">
            Built on a foundation of trust, innovation, and excellence, we
            deliver solutions that drive progress and create lasting value
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl font-bold text-red-600">25+</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Years of Experience
            </h3>
            <p className="text-lg text-gray-600">
              Decades of trusted service in transportation and logistics
              industry
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-3xl font-bold text-green-600">500+</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Happy Clients
            </h3>
            <p className="text-lg text-gray-600">
              Satisfied customers across various industries and sectors
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <span className="text-3xl font-bold text-blue-600">24/7</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Support</h3>
            <p className="text-lg text-gray-600">
              Round-the-clock assistance and emergency services
            </p>
          </div>
        </div>

        <div className="mt-20 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-10 md:p-16">
          <div className="text-center">
            <h3 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Mission
            </h3>
            <p className="mx-auto max-w-5xl text-xl leading-relaxed text-gray-700">
              To provide exceptional transportation and mobility solutions that
              exceed expectations while contributing to sustainable development.
              We are committed to innovation, reliability, and building lasting
              partnerships with our clients and communities across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
