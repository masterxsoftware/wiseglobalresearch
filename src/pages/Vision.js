import React from 'react';

function Vision() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2c3e50] mb-6">
        Our Vision & Mission
      </h1>
      <p className="text-gray-700 text-lg leading-7 mb-6" data-aos="fade-up">
        At <span className="font-semibold text-[#2c3e50]">Wise Global Research</span>, our vision is to be a trusted and innovative leader in the financial advisory industry. We aim to empower individuals with accurate, real-time, and ethical stock market guidance, helping them achieve financial growth and security.
      </p>
      <h2 className="text-2xl font-semibold text-[#2c3e50] mb-3" data-aos="fade-up">
        Our Mission
      </h2>
      <p className="text-gray-700 text-lg leading-7 mb-4" data-aos="fade-up">
        Our mission is to:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2" data-aos="fade-up">
        <li>Deliver personalized and research-backed stock market strategies.</li>
        <li>Ensure transparent and honest financial advice to all clients.</li>
        <li>Educate investors through regular insights, blogs, and demos.</li>
        <li>Use technology and data to maximize client profitability.</li>
        <li>Follow SEBI rules & ensure client protection at every step.</li>
      </ul>
      <p className="mt-6 text-gray-700 text-lg" data-aos="fade-up">
        We believe in building long-term relationships based on trust, transparency, and results.
      </p>
    </div>
  );
}

export default Vision;
