import { useState } from 'react';
import { Plane, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

type FooterProps = {
  onNavigate: (page: string, data?: unknown) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        setMessage('Successfully subscribed!');
        setEmail('');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane size={28} className="text-blue-500" />
              <span className="text-2xl font-bold">Da-Rocha</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating unforgettable travel experiences since 2010. Your journey begins with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Destinations', 'Packages', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase().replace(' ', ''))}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Ahafo Hwidiem, Ahafo Goaso</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-500 flex-shrink-0" />
                <div className="flex flex-col text-gray-400">
                  <a href="tel:0593039094" className="hover:text-blue-400 transition-colors">
                    +233 593 039 094
                  </a>
                  <a
                    href="tel:+15142337060"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +1 (514) 233-7060
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-500 flex-shrink-0" />
                <div className="flex flex-col text-gray-400">
                  <a
                    href="mailto:bonsudarocha36@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    bonsudarocha36@gmail.com
                  </a>
                  <a
                    href="mailto:armandokotm@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    armandokotm@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and travel tips</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p className={`text-sm ${message.includes('Success') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Da-Rocha Travel & Tour Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => onNavigate('privacy')}
            >
              Privacy Policy
            </button>
            <button
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => onNavigate('terms')}
            >
              Terms of Service
            </button>
            <button
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => onNavigate('refund')}
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
