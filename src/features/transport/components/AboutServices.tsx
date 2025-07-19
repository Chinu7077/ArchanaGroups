import { Truck, Shield, Clock, MapPin, Wrench, Users } from 'lucide-react';

export default function AboutServices() {
  const services = [
    {
      icon: <Truck size={40} />,
      title: 'Heavy Vehicle Transport',
      description:
        'Specialized transportation for heavy machinery, construction equipment, and oversized cargo with expert handling.',
    },
    {
      icon: <Shield size={40} />,
      title: 'Mining Logistics',
      description:
        'Comprehensive logistics solutions for mining operations, including equipment and material transport to remote locations.',
    },
    {
      icon: <Clock size={40} />,
      title: '24/7 Operations',
      description:
        'Round-the-clock service availability to meet your urgent transportation requirements and emergency needs.',
    },
    {
      icon: <MapPin size={40} />,
      title: 'Wide Coverage',
      description:
        'Extensive network covering major industrial areas and mining sites across India with reliable connectivity.',
    },
    {
      icon: <Wrench size={40} />,
      title: 'Equipment Maintenance',
      description:
        'Regular maintenance and safety checks ensure our fleet is always ready for your transportation needs.',
    },
    {
      icon: <Users size={40} />,
      title: 'Expert Team',
      description:
        'Experienced drivers and logistics professionals dedicated to safe and timely delivery of your cargo.',
    },
  ];

  return (
    <section id="about-services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            About O Services
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
            Professional
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-xl bg-gray-50 p-8 transition-all duration-300 hover:bg-red-50 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="text-center leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-red-600 to-black p-10 text-white md:p-16">
          <div className="text-center">
            <h3 className="mb-6 text-3xl font-bold md:text-4xl">
              Our Area of Operation
            </h3>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed">
              We provide comprehensive transportation services across major
              industrial hubs, mining regions, and commercial centers throughout
              India. Our strategic network ensures efficient logistics solutions
              for businesses of all sizes, from local deliveries to
              long-distance heavy cargo transport.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
