import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-600 text-white min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-josefin">
          Smart Investment, <br /> Bright Future
        </h1>
        <p className="text-lg md:text-xl mb-6 font-light">
          Join thousands of investors growing their wealth with Wise Global. Learn, invest, and grow with expert guidance.
        </p>
        <Link
          to="/demo"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Get Free Demo
        </Link>
      </div>
    </div>
  );
};

export default Hero;