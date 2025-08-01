import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { containerVariants } from '../utils/animationVariants';
import HeroSection from '../components/HeroSection';
import AlertBar from '../components/AlertBar';
import WhyChooseUs from '../components/WhyChooseUs';
import MarketOverview from '../components/MarketOverview';
import ServicesSection from '../components/ServicesSection';
import MarketInsights from '../components/MarketInsights';
import PerformanceMetrics from '../components/PerformanceMetrics';
import MethodologySection from '../components/MethodologySection';
import TeamSection from '../components/TeamSection';
import PlatformFeatures from '../components/PlatformFeatures';
import TestimonialsSection from '../components/TestimonialsSection';
import SubscriptionPlans from '../components/SubscriptionPlans';
import CallToAction from '../components/CallToAction';
import TimelineSection from '../components/TimelineSection';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import ComplaintTable from '../components/ComplaintTable';
import PopupForm from '../components/PopupForm';

const Home = () => {
  const contactFormRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]); // Dependencies for checkScrollTop

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]); // checkScrollTop is now stable

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent text-white relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
      <AlertBar />
      <HeroSection />
      <WhyChooseUs />
      <MarketOverview />
      <ServicesSection />
      <MarketInsights />
      <PerformanceMetrics />
      <MethodologySection />
      <TeamSection />
      <PlatformFeatures />
      <TestimonialsSection />
      <SubscriptionPlans />
      <CallToAction scrollToContactForm={scrollToContactForm} />
      <TimelineSection />
      <FAQSection />
      <ContactFormSection contactFormRef={contactFormRef} />
      <ComplaintTable />
      {showScroll && (
        <motion.button
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white rounded-full p-2 sm:p-3 shadow-lg z-50"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp className="text-lg sm:text-xl" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Home;