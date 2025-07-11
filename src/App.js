// src/App.js
import React, { useEffect } from 'react';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './firebase';

// Theme Wrapper
import TimeBasedThemeWrapper from './components/TimeBasedThemeWrapper';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import FloatingPayButton from './components/FloatingPayButton';
import ParticlesBackground from './components/ParticlesBackground';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Demo from './pages/Demo';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import LiveChart from './pages/LiveChart';
import NotFound from './pages/NotFound';
import Reports from './pages/Reports';
import Complaint from './pages/Complaint';
import PaymentInfo from './pages/PaymentInfo';

// Dropdown Pages
import Team from './pages/Team';
import Vision from './pages/Vision';
import Equity from './pages/Equity';
import Intraday from './pages/Intraday';
import Mcx from './pages/Mcx';
import Career from './pages/Career';
import Training from './pages/Training';
import Blogs from './pages/Blogs';
import MarketNews from './pages/MarketNews';
import UserLogin from './pages/UserLogin';
import ClientPanel from './pages/ClientPanel';

// Services - Equity
import Cash from './pages/Cash';
import StockOption from './pages/StockOption';
import Delivery from './pages/Delivery';
import Index from './pages/Index';
import Future from './pages/Future';
import StockIndexOption from './pages/StockIndexOption';
import BTST from './pages/BTST';

// Services - MCX
import Bullions from './pages/Bullions';
import Energy from './pages/Energy';
import Metal from './pages/Metal';
import MCXOption from './pages/MCXOption';

// Other Services
import NCDEX from './pages/NCDEX';
import Forex from './pages/Forex';
import Currency from './pages/Currency';
import Comex from './pages/Comex';

// Admin
import ContactData from './pages/ContactData';

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <TimeBasedThemeWrapper>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
      <ScrollToTop />

      {/* Background Particles */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        <ParticlesBackground />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content Wrapper */}
      <main className="pt-20 px-4 md:px-6 min-h-screen max-w-screen-xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/livechart" element={<LiveChart />} />
          <Route path="/team" element={<Team />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/equity" element={<Equity />} />
          <Route path="/intraday" element={<Intraday />} />
          <Route path="/mcx" element={<Mcx />} />
          <Route path="/career" element={<Career />} />
          <Route path="/training" element={<Training />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/market-news" element={<MarketNews />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/client-panel" element={<ClientPanel />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payment" element={<PaymentInfo />} />

          {/* Equity Services */}
          <Route path="/services/equity/cash" element={<Cash />} />
          <Route path="/services/equity/stock-option" element={<StockOption />} />
          <Route path="/services/equity/delivery" element={<Delivery />} />
          <Route path="/services/equity/index" element={<Index />} />
          <Route path="/services/equity/future" element={<Future />} />
          <Route path="/services/equity/stock-index-option" element={<StockIndexOption />} />
          <Route path="/services/equity/btst" element={<BTST />} />

          {/* MCX Services */}
          <Route path="/services/mcx/bullions" element={<Bullions />} />
          <Route path="/services/mcx/energy" element={<Energy />} />
          <Route path="/services/mcx/metal" element={<Metal />} />
          <Route path="/services/mcx/mcx-option" element={<MCXOption />} />

          {/* Other Services */}
          <Route path="/services/ncdex" element={<NCDEX />} />
          <Route path="/services/forex" element={<Forex />} />
          <Route path="/services/currency" element={<Currency />} />
          <Route path="/services/comex" element={<Comex />} />

          {/* Admin Panel Route */}
          <Route
            path="/admin/contact-data"
            element={
              <ProtectedAdminRoute>
                <ContactData />
              </ProtectedAdminRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer & Floating Buttons */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <ChatWidget />
      <FloatingPayButton />
    </TimeBasedThemeWrapper>
  );
}

export default App;
