import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import RefundPolicyPage from './pages/RefundPolicyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<unknown>(null);

  const handleNavigate = (page: string, data?: unknown) => {
    setCurrentPage(page);
    setPageData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'destinations':
        return <DestinationsPage onNavigate={handleNavigate} searchData={pageData as { search?: string; selected?: string }} />;
      case 'packages':
        return <PackagesPage onNavigate={handleNavigate} filterData={pageData as { destinationId?: string }} />;
      case 'about':
      case 'aboutus':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'booking':
        return (
          <BookingPage
            onNavigate={handleNavigate}
            bookingData={pageData as { packageId?: string }}
          />
        );
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'refund':
        return <RefundPolicyPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
