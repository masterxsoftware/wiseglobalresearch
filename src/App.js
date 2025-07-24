import React, { useEffect } from 'react';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';

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
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ParticlesBackground from './components/ParticlesBackground'; // Added import

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Demo = lazy(() => import('./pages/Demo'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const LiveChart = lazy(() => import('./pages/LiveChart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Reports = lazy(() => import('./pages/Reports'));
const Complaint = lazy(() => import('./pages/Complaint'));
const PaymentInfo = lazy(() => import('./pages/PaymentInfo'));
const Team = lazy(() => import('./pages/Team'));
const Vision = lazy(() => import('./pages/Vision'));
const Equity = lazy(() => import('./pages/Equity'));
const Intraday = lazy(() => import('./pages/Intraday'));
const Mcx = lazy(() => import('./pages/Mcx'));
const Career = lazy(() => import('./pages/Career'));
const Training = lazy(() => import('./pages/Training'));
const Blogs = lazy(() => import('./pages/Blogs'));
const MarketNews = lazy(() => import('./pages/MarketNews'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const ClientPanel = lazy(() => import('./pages/ClientPanel'));
const Cash = lazy(() => import('./pages/Cash'));
const StockOption = lazy(() => import('./pages/StockOption'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Index = lazy(() => import('./pages/Index'));
const Future = lazy(() => import('./pages/Future'));
const StockIndexOption = lazy(() => import('./pages/StockIndexOption'));
const BTST = lazy(() => import('./pages/BTST'));
const Bullions = lazy(() => import('./pages/Bullions'));
const Energy = lazy(() => import('./pages/Energy'));
const Metal = lazy(() => import('./pages/Metal'));
const MCXOption = lazy(() => import('./pages/MCXOption'));
const NCDEX = lazy(() => import('./pages/NCDEX'));
const Forex = lazy(() => import('./pages/Forex'));
const Currency = lazy(() => import('./pages/Currency'));
const Comex = lazy(() => import('./pages/Comex'));
const ContactData = lazy(() => import('./pages/ContactData'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const Privacy = lazy(() => import('./pages/Privacy'));
const DailyRecommendation = lazy(() => import('./pages/DailyRecommendation'));
const ClientServiceConsert = lazy(() => import('./pages/ClientServiceConsert'));
const ComplaintData = lazy(() => import('./pages/ComplaintData'));
const InvestorChart = lazy(() => import('./pages/InvestorChart'));
const AntiMoneyLaundering = lazy(() => import('./pages/AntiMoneyLaundering'));

function App() {
  useEffect(() => {
    // Optimize AOS for mobile
    if (window.innerWidth <= 640) {
      AOS.init({ duration: 600, once: true, disable: 'mobile' });
    } else {
      AOS.init({ duration: 800, once: true });
    }
  }, []);

  return (
    <TimeBasedThemeWrapper>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Background Particles (Hidden on Mobile) */}
      <div className="hidden sm:block fixed top-0 left-0 w-full h-full z-[-1]">
        <ParticlesBackground
          options={{
            particles: {
              number: { value: window.innerWidth <= 640 ? 20 : 50 },
              size: { value: 3 },
            },
          }}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content Wrapper */}
      <main className="pt-16 px-2 sm:px-4 md:px-8 lg:px-12 min-h-screen max-w-screen-2xl mx-auto">
        <Suspense
          fallback={
            <div className="text-center py-10 text-primaryBlue font-josefin">
              Loading...
            </div>
          }
        >
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
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/recommendation" element={<DailyRecommendation />} />
            <Route path="/services/equity/cash" element={<Cash />} />
            <Route path="/services/equity/stock-option" element={<StockOption />} />
            <Route path="/services/equity/delivery" element={<Delivery />} />
            <Route path="/services/equity/index" element={<Index />} />
            <Route path="/services/equity/future" element={<Future />} />
            <Route path="/services/equity/stock-index-option" element={<StockIndexOption />} />
            <Route path="/services/equity/btst" element={<BTST />} />
            <Route path="/services/mcx/bullions" element={<Bullions />} />
            <Route path="/services/mcx/energy" element={<Energy />} />
            <Route path="/services/mcx/metal" element={<Metal />} />
            <Route path="/services/mcx/mcx-option" element={<MCXOption />} />
            <Route path="/services/ncdex" element={<NCDEX />} />
            <Route path="/services/forex" element={<Forex />} />
            <Route path="/services/currency" element={<Currency />} />
            <Route path="/services/comex" element={<Comex />} />
            <Route
              path="/admin/contact-data"
              element={
                <ProtectedAdminRoute>
                  <ContactData />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/client-service-consert" element={<ClientServiceConsert />} />
            <Route path="/complaint-data" element={<ComplaintData />} />
            <Route path="/investor-chart" element={<InvestorChart />} />
            <Route path="/anti-money-laundering" element={<AntiMoneyLaundering />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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