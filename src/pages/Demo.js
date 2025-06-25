import React from 'react';

function Demo() {
  return (
    <div
      className="py-16 px-6 bg-white text-gray-800 max-w-4xl mx-auto"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl md:text-4xl font-bold font-josefin mb-6 text-center"
        data-aos="fade-down"
      >
        Free Demo Calls
      </h1>

      <p
        className="text-base leading-relaxed text-gray-700 mb-4 text-center"
        data-aos="fade-right"
      >
        Experience the quality of our stock advisory with <strong>2–3 free calls</strong> before you decide to subscribe.
      </p>

      <div className="text-center space-y-4 mt-6">
        <p
          className="text-lg font-semibold text-gray-800"
          data-aos="zoom-in"
        >
          📞 Call Us Now
        </p>
        <a
          href="tel:9977909494"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          data-aos="flip-up"
        >
          99779 09494
        </a>

        <p
          className="text-lg font-semibold text-gray-800 mt-4"
          data-aos="zoom-in"
        >
          💬 Chat on WhatsApp
        </p>
        <a
          href="https://wa.me/919977909494"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          data-aos="flip-up"
        >
          Message on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default Demo;
