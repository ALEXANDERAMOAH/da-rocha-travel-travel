import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            Petal <span>&</span> Bloom
          </Link>
          <div className="navbar-links">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="navbar-actions">
            <button aria-label="Search"><Search size={18} /></button>
            <button aria-label="Wishlist"><Heart size={18} /></button>
            <button aria-label="Cart"><ShoppingBag size={18} /></button>
          </div>
          <div className="mobile-toggle" onClick={() => setMobileOpen(true)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav open">
          <span className="mobile-close" onClick={() => setMobileOpen(false)}><X size={28} /></span>
          {links.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </div>
      )}
    </>
  );
}
