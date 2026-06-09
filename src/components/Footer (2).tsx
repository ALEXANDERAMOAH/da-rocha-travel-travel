import { Link } from 'react-router-dom';
import { Camera, Music2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Petal <span>&</span> Bloom</h3>
            <p>
              Curating the finest in beauty since 2018. Where premium quality meets
              authenticity, and every product tells a story.
            </p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/">Skincare</Link></li>
              <li><Link to="/">Makeup</Link></li>
              <li><Link to="/">Haircare</Link></li>
              <li><Link to="/">Fragrances</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Petal & Bloom Beauty. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/petalandbloombh" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Camera size={18} /></a>
            <a href="https://www.tiktok.com/@petalandbloombh" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Music2 size={18} /></a>
            <a href="https://wa.me/233534010350" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
