// src/pages/Contact.js
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

function Contact() {
  const [state, handleSubmit] = useForm('mgvyzjrd');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  if (state.succeeded) {
    return (
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] px-4 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-green-200 mb-4">🎉 Thank you!</h2>
        <p className="text-lg text-center max-w-md">
          Your message has been received. We'll be in touch shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white"
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-md mb-6"
          variants={fadeInUp}
          custom={0}
        >
          Let's Talk
        </motion.h2>

        <motion.p
          className="text-center text-white/90 mb-10"
          variants={fadeInUp}
          custom={1}
        >
          We’re here to help. Send us a message and we’ll respond as soon as
          possible.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/30 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-8 space-y-6 text-white"
          variants={fadeInUp}
          custom={2}
        >
          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
            custom={2.1}
          >
            <FaUser className="text-white/80 text-xl" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-300 transition border border-white/20"
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
            custom={2.2}
          >
            <FaEnvelope className="text-white/80 text-xl" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-300 transition border border-white/20"
            />
          </motion.div>
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
            custom={2.3}
          >
            <FaPhone className="text-white/80 text-xl" />
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-300 transition border border-white/20"
            />
          </motion.div>

          <motion.div
            className="flex items-start gap-3"
            variants={fadeInUp}
            custom={2.4}
          >
            <FaCommentDots className="text-white/80 text-xl mt-3" />
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message..."
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-300 transition border border-white/20"
            />
          </motion.div>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <motion.button
            type="submit"
            disabled={state.submitting}
            className="w-full py-3 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {/* ✅ Updated Social Icons with Links */}
        <motion.div
          className="flex justify-center items-center gap-6 mt-10"
          initial="hidden"
          animate="visible"
        >
          {[
            {
              Icon: FaWhatsapp,
              url: 'https://api.whatsapp.com/send/?phone=919977909494&text=Hey+Wise+Global+Research+Service+team%2C+I+need+help+with+trading.+Please+guide+me.&type=phone_number&app_absent=0',
              color: 'text-green-400',
            },
            {
              Icon: FaFacebookF,
              url: 'https://www.facebook.com/wiseglobalresearch/',
              color: 'text-blue-500',
            },
            {
              Icon: FaInstagram,
              url: 'https://www.instagram.com/wiseglobalresearch/',
              color: 'text-pink-500',
            },
            {
              Icon: FaLinkedinIn,
              url: 'https://www.linkedin.com/in/wise-global-research-services-63b535317/',
              color: 'text-blue-400',
            },
            {
              Icon: FaXTwitter,
              url: 'https://x.com/research221711',
              color: 'text-black',
            },
          ].map(({ Icon, url, color }, index) => (
            <motion.a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: -50, rotate: -90 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  transition: {
                    delay: 0.4 + index * 0.2,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                  },
                },
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { type: 'spring', stiffness: 300 },
              }}
              whileTap={{
                scale: 0.95,
                rotate: -5,
              }}
              className="cursor-pointer"
            >
              <Icon className={`text-3xl transition-transform ${color}`} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
