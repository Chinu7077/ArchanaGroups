import { Truck, Shield, Clock, MapPin, Wrench, Users } from "lucide-react";

export default function AboutServices() {
  const services = [
    {
      icon: <Truck size={40} />,
      title: "Heavy Vehicle Transport",
      description:
        "Specialized transportation for heavy machinery, construction equipment, and oversized cargo with expert handling.",
    },
    {
      icon: <Shield size={40} />,
      title: "Mining Logistics",
      description:
        "Comprehensive logistics solutions for mining operations, including equipment and material transport to remote locations.",
    },
    {
      icon: <Clock size={40} />,
      title: "24/7 Operations",
      description:
        "Round-the-clock service availability to meet your urgent transportation requirements and emergency needs.",
    },
    {
      icon: <MapPin size={40} />,
      title: "Wide Coverage",
      description:
        "Extensive network covering major industrial areas and mining sites across India with reliable connectivity.",
    },
    {
      icon: <Wrench size={40} />,
      title: "Equipment Maintenance",
      description:
        "Regular maintenance and safety checks ensure our fleet is always ready for your transportation needs.",
    },
    {
      icon: <Users size={40} />,
      title: "Expert Team",
      description:
        "Experienced drivers and logistics professionals dedicated to safe and timely delivery of your cargo.",
    },
  ];

  return (
    <section id="about-services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About O Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:bg-red-50 group"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-600 to-black text-white rounded-2xl p-10 md:p-16">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Our Area of Operation
            </h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
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
