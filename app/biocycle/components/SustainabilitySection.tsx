"use client";

export default function SustainabilitySection({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  return (
    <section
      className="py-20 bg-white bg-[url('/mbg-2.png')] sm:bg-[url('/bg-2.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-4xl mx-auto space-y-6 rounded-xl bg-white/25 backdrop-blur-[1px] p-8 shadow ${getAnimationClass(
            "sustainability",
            "fade-up"
          )}`}
          data-animate
          id="sustainability"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Turning Waste Into Worth{" "}
            <span className="text-green-600 inline-block transition-all duration-500 hover:scale-110">
              Today’s Effort
            </span>{" "}
            Tomorrow’s Impact
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
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
