import { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Packages' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className={`transition-colors ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
              <Plane size={32} />
            </div>
            <span
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Da-Rocha Travel & Tour Agency
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors ${
                  currentPage === item.id
                    ? isScrolled
                      ? 'text-blue-600'
                      : 'text-white font-semibold'
                    : isScrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('booking')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Book Now
            </button>
          </div>

          <button
            className={`md:hidden transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('booking');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
