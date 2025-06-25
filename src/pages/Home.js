import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import TrustWall from '../components/TrustWall';
import ComplaintSummary from '../components/ComplaintSummary'; // ✅ Add this

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: 'easeOut' }
});

function Home() {
  return (
    <div className="font-josefin min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white">
      
      {/* 🔄 Image Slider */}
      <ImageSlider />

      {/* 🧠 Typewriter Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          {...fadeIn(0.3)}
        >
          <Typewriter
            words={['Master the Indian Stock Market', 'Intraday Trading Made Simple']}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl"
          {...fadeIn(0.6)}
        >
          Get accurate signals, expert advice, and real-time trading insights. Start your trading journey with confidence!
        </motion.p>

        {/* 📞 CTA Buttons */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row gap-10 justify-center items-center"
          {...fadeIn(0.9)}
        >
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20start%20trading"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white font-semibold shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition duration-300 hover:scale-105"
          >
            <FaWhatsapp className="text-green-400 text-xl" />
            Start Trading
          </a>

          {/* Contact CTA */}
          <a
            href="/contact"
            className="flex items-center gap-3 px-7 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white font-semibold shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition duration-300 hover:scale-105"
          >
            <FaPhoneAlt className="text-white text-xl" />
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* 🛡️ Trusted Wall Section */}
      <TrustWall />

      {/* 📊 Complaint Summary Table */}
      <ComplaintSummary />
    </div>
  );
}

export default Home;
