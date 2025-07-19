'use client';

export default function SustainabilitySection({
  getAnimationClass = () => '',
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  return (
    <section className="bg-white bg-[url('/mbg-2.png')] bg-cover bg-center bg-no-repeat py-20 sm:bg-[url('/bg-2.png')]">
      <div className="container mx-auto px-4">
        <div
          className={`mx-auto max-w-4xl space-y-6 rounded-xl bg-white/25 p-8 text-center shadow backdrop-blur-[1px] ${getAnimationClass(
            'sustainability',
            'fade-up'
          )}`}
          data-animate
          id="sustainability"
        >
          <h2 className="text-3xl font-bold text-gray-800 md:text-5xl">
            Turning Waste Into Worth{' '}
            <span className="inline-block text-green-600 transition-all duration-500 hover:scale-110">
              Today’s Effort
            </span>{' '}
            Tomorrow’s Impact
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            As the world shifts toward cleaner and smarter energy solutions,
            industries are choosing biofuels like briquettes and pellets to
            reduce pollution and meet energy demands responsibly. At Archana
            BioCycle, we’re dedicated to providing eco-friendly biomass fuels
            along with reliable machines for briquetting, pelletizing, drying,
            and chipping. With a strong focus on quality, performance, and
            sustainability, we support industries in making a smooth and
            meaningful transition toward renewable energy.
          </p>
        </div>
      </div>
    </section>
  );
}
