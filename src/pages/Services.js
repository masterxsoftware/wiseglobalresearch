import React from 'react';

function Services() {
  return (
    <div
      className="py-16 px-6 bg-white text-gray-800 max-w-6xl mx-auto"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl md:text-4xl font-bold font-josefin mb-10 text-center"
        data-aos="fade-down"
      >
        Our Stock Market Services
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Intraday Tips */}
        <div
          className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          data-aos="zoom-in-up"
        >
          <h2 className="text-xl font-bold mb-2">📈 Intraday Calls</h2>
          <p className="text-gray-700">
            High-accuracy stock recommendations for same-day buying/selling. Suitable for fast traders looking for daily profits.
          </p>
        </div>

        {/* Positional Tips */}
        <div
          className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          data-aos="zoom-in-up"
          data-aos-delay="100"
        >
          <h2 className="text-xl font-bold mb-2">📊 Positional Calls</h2>
          <p className="text-gray-700">
            Medium-term recommendations with 3–10 days holding period. Backed by strong technical & fundamental research.
          </p>
        </div>

        {/* Long-Term Investment */}
        <div
          className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          data-aos="zoom-in-up"
          data-aos-delay="200"
        >
          <h2 className="text-xl font-bold mb-2">💹 Long-Term Picks</h2>
          <p className="text-gray-700">
            Safe and high-return stocks to build wealth steadily. Ideal for investors with 6+ months vision.
          </p>
        </div>

        {/* Portfolio Review */}
        <div
          className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          data-aos="zoom-in-up"
          data-aos-delay="300"
        >
          <h2 className="text-xl font-bold mb-2">🧾 Portfolio Review</h2>
          <p className="text-gray-700">
            Already invested? Let us audit your portfolio and suggest improvements for better returns & lower risk.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
