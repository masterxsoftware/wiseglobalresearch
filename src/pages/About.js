import React from 'react';

function About() {
  return (
    <div className="py-16 px-6 bg-white text-gray-800 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold font-josefin mb-6 text-center">
        About Wise Global
      </h1>

      <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4">
        <strong>Wise Global Research</strong> is a SEBI-registered stock market advisory firm based in Indore. Founded in <strong>January 2024</strong>, our goal is to empower Indian investors with trustworthy, research-based stock recommendations.
      </p>

      <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4">
        We specialize in <strong>intraday tips</strong>, <strong>positional trades</strong>, and <strong>long-term investment planning</strong>. Our team consists of certified research analysts who combine technical and fundamental analysis to deliver value-driven strategies.
      </p>

      <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-10">
        Whether you're a beginner or a seasoned trader, Wise Global offers the tools, insights, and support you need to make smarter financial decisions — without false promises or guaranteed returns.
      </p>

      {/* ✅ Certification Section - Text Boxes only */}
      <div className="bg-gray-100 py-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          We are Certified By
        </h2>
        <div className="flex flex-wrap justify-center gap-4 px-4 text-gray-500 text-sm">
          <div className="bg-white p-4 rounded shadow w-32 text-center">
            MSME<br />Certified
          </div>
          <div className="bg-white p-4 rounded shadow w-32 text-center">
            ISO<br />9001:2015
          </div>
          <div className="bg-white p-4 rounded shadow w-32 text-center">
            SSL<br />Secure
          </div>
          <div className="bg-white p-4 rounded shadow w-32 text-center">
            SEBI<br />Registered
          </div>
          <div className="bg-white p-4 rounded shadow w-32 text-center">
            BSE<br />Enlisted
          </div>
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">* Logos will be added soon</p>
      </div>
    </div>
  );
}

export default About;
