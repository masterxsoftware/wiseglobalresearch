import React from 'react';

const services = [
  {
    title: 'Equity Research',
    description: 'Get expert analysis on top-performing stocks and maximize your returns with confidence.',
    icon: '📊',
  },
  {
    title: 'Intraday Calls',
    description: 'Short-term stock tips for quick profits using our tested technical strategies.',
    icon: '⏱️',
  },
  {
    title: 'Long-Term Investment',
    description: 'Build wealth steadily with personalized investment advice based on fundamentals.',
    icon: '📈',
  },
  {
    title: 'Portfolio Review',
    description: 'Get your current stock portfolio analyzed by SEBI-registered advisors.',
    icon: '🧾',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-josefin mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-600">
          Tailored research and recommendations to help you invest smarter.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;