export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center bg-gradient-to-r from-red-900 via-black to-red-800 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="animate-fade-in mb-6 text-4xl font-bold md:text-6xl">
            Archana Groups of Companies
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed opacity-90 md:text-2xl">
            Leading the way in heavy transport logistics and sustainable
            mobility solutions across India
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/transport"
              className="transform rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-700"
            >
              Explore Transport Services
            </a>
            <a
              href="/biocycle"
              className="transform rounded-lg bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-green-700"
            >
              Discover BioCycle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
