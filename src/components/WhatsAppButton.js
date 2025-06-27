import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=919977909494&text=Hey+Wise+Global+Research+Service+team%2C+I+need+help+with+trading.+Please+guide+me.&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out"
      data-aos="zoom-in"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
    </a>
  );
}

export default WhatsAppButton;
