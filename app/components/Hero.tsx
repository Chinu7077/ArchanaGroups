export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-red-900 via-black to-red-800 text-white min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Archana Groups of Companies
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Leading the way in heavy transport logistics and sustainable
            mobility solutions across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/transport"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Transport Services
            </a>
            <a
              href="/biocycle"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Discover BioCycle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
