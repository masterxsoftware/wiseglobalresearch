import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPalette
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import wiseLogo from '../assets/images/wise3.png';
import { ThemeContext } from '../context/ThemeContext';

function Footer() {
  const { changeTheme, theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients[theme] || gradients.default;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        style={{ background, color: textColor }}
        className="transition-all duration-1000 pt-8 pb-4 px-4 mx-2 my-2 border-4 border-[#64ed37] rounded-xl shadow-xl"
      >
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar px-2">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm">

            {/* 🌟 Logo Section */}
            <div className="text-center md:text-left">
              <div className="relative inline-block w-40 h-40 mx-auto md:mx-0 animate-float shine-hover">
                <div className="absolute inset-0 rounded-full bg-white/10 blur-lg shadow-2xl z-0 animate-pulseFast" />
                <div className="relative rounded-full overflow-hidden border-4 shadow-xl hover:scale-105 transition duration-500" style={{ borderColor: '#4efc03' }}>
                  <img src={wiseLogo} alt="Wise Global Logo" className="w-40 h-40 object-contain rounded-full" />
                </div>
              </div>
              <p className="mt-4 text-sm" style={{ color: textColor }}>
                Wise Global Research Services Pvt. Ltd. comprises seasoned and proficient research analysts specializing in the stock and commodity markets.
              </p>
              <div className="flex gap-4 justify-center md:justify-start mt-4">
                <a href="https://www.facebook.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaFacebookF className="text-blue-600 text-lg hover:scale-110 transition" /></a>
                <a href="https://www.instagram.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaInstagram className="text-pink-500 text-lg hover:scale-110 transition" /></a>
                <a href="https://x.com/research221711" target="_blank" rel="noreferrer"><SiX className="bg-white text-black rounded-full text-lg hover:scale-110 transition p-[2px]" /></a>
                <a href="https://www.linkedin.com/in/wise-global-research-services-63b535317/" target="_blank" rel="noreferrer"><FaLinkedinIn className="text-white text-lg hover:scale-110 transition" /></a>
                <a href="https://www.youtube.com/@WiseGlobalResearchService" target="_blank" rel="noreferrer"><FaYoutube className="text-red-600 text-lg hover:scale-110 transition" /></a>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-yellow-400">→ About Us</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400">→ Contact</Link></li>
                <li><Link to="/payment" className="hover:text-yellow-400">→ Payment</Link></li>
                <li><Link to="/career" className="hover:text-yellow-400">→ Careers</Link></li>
                <li><Link to="/recommendation" className="hover:text-yellow-400">→ Recommendations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Useful Links</h3>
              <ul className="space-y-2">
                <li><Link to="/legal" className="hover:text-yellow-400">→ Disclaimer</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-400">→ Privacy Policy</Link></li>
                <li><Link to="/refund" className="hover:text-yellow-400">→ Refund Policy</Link></li>
                <li><Link to="/complaint" className="hover:text-yellow-400">→ Complaint Box</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-400">→ Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Our Registration Details</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>WISE GLOBAL RESEARCH SERVICES PVT LTD</strong></li>
                <li>GST No.: <strong>23AADCW7173Q1ZO</strong></li>
                <li>CIN: <strong>U66190MP2024PTC069199</strong></li>
                <li>SEBI Reg. No.: <strong>INH000016719</strong></li>
                <li>BSE Enlistment No.: <strong>6205</strong></li>
                <li>Validity: <strong>24-June-2024 to Perpetual</strong></li>
                <li>SEBI Office: Bandra (E), Mumbai – 400051</li>
                <li>Toll Free: <strong>1800 22 7575</strong></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 my-6" />

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Quick Contact</h3>
              <p><FaEnvelope className="inline mr-2 text-yellow-400" /> support@wiseglobalresearch.com</p>
              <p><FaPhone className="inline mr-2 text-yellow-400" /> +91 9977909494</p>
              <p><FaMapMarkerAlt className="inline mr-2 text-yellow-400" /> 18 AB Road, Onam Plaza, Office No 602, Indore, MP - 452001</p>
            </div>

            <div className="text-right md:text-left space-y-2">
              <h3 className="font-semibold flex items-center gap-1"><FaPalette /> Select Website Theme</h3>
              <div className="bg-white text-black rounded shadow-md overflow-hidden">
                <select
                  onChange={(e) => changeTheme(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-white focus:outline-none"
                >
                  {Object.keys(gradients).map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Alert Marquee */}
      <div className="w-full py-2 border-t border-yellow-400 overflow-hidden" style={{ backgroundColor: '#2eed1c' }}>
        <div className="whitespace-nowrap animate-scroll text-sm">
          <p className="inline-block text-black font-medium">
            <strong>कृपया ध्यान दें –</strong> प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे।
            हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते।
            &nbsp;|&nbsp;
            <strong>Note:</strong> Dear Client, payments will be accepted only if made to the account details listed on the Wise Global Research website.
          </p>
        </div>
      </div>

      <div className="bg-black text-white text-center text-xs py-2">
        Powered by <a href="https://mrxads.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">MRXADS</a>
      </div>

      {/* 🔼 Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition z-50"
          aria-label="Scroll to Top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default Footer;
