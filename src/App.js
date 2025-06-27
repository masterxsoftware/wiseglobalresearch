// src/App.js
import React, { useEffect } from 'react';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TimeBasedThemeWrapper from './components/TimeBasedThemeWrapper';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import FloatingPayButton from './components/FloatingPayButton';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Demo from './pages/Demo';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import LiveChart from './pages/LiveChart';

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

// Other Pages
import Complaint from './pages/Complaint';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import PaymentInfo from './pages/PaymentInfo';

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

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <TimeBasedThemeWrapper>
      <ScrollToTop />
      <Navbar />
      <div className="pt-16 px-4">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/livechart" element={<LiveChart />} />

          {/* Dropdown Routes - Company */}
          <Route path="/team" element={<Team />} />
          <Route path="/vision" element={<Vision />} />

          {/* Dropdown Routes - Services */}
          <Route path="/equity" element={<Equity />} />
          <Route path="/intraday" element={<Intraday />} />
          <Route path="/mcx" element={<Mcx />} />

          {/* Dropdown Routes - HR Zone */}
          <Route path="/career" element={<Career />} />
          <Route path="/training" element={<Training />} />

          {/* Dropdown Routes - Insights */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/market-news" element={<MarketNews />} />

          {/* Dashboard Routes */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/client-panel" element={<ClientPanel />} />

          {/* Other Pages */}
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payment" element={<PaymentInfo />} />

          {/* Nested Services - Equity */}
          <Route path="/services/equity/cash" element={<Cash />} />
          <Route path="/services/equity/stock-option" element={<StockOption />} />
          <Route path="/services/equity/delivery" element={<Delivery />} />
          <Route path="/services/equity/index" element={<Index />} />
          <Route path="/services/equity/future" element={<Future />} />
          <Route path="/services/equity/stock-index-option" element={<StockIndexOption />} />
          <Route path="/services/equity/btst" element={<BTST />} />

          {/* Nested Services - MCX */}
          <Route path="/services/mcx/bullions" element={<Bullions />} />
          <Route path="/services/mcx/energy" element={<Energy />} />
          <Route path="/services/mcx/metal" element={<Metal />} />
          <Route path="/services/mcx/mcx-option" element={<MCXOption />} />

          {/* Other Services */}
          <Route path="/services/ncdex" element={<NCDEX />} />
          <Route path="/services/forex" element={<Forex />} />
          <Route path="/services/currency" element={<Currency />} />
          <Route path="/services/comex" element={<Comex />} />

          {/* Fallback - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <ChatWidget />
      <FloatingPayButton />
    </TimeBasedThemeWrapper>
  );
}

export default App;
