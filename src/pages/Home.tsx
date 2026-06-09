import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../lib/database';
import { ArrowRight, Sparkles, Truck, Shield, Leaf } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import Reviews from '../components/Reviews';
import {
  skincareProducts,
  makeupProducts,
  haircareProducts,
  fragranceProducts,
} from '../data/products';

const categoryImages = [
  { slug: 'skincare', label: 'Skincare', count: 24, img: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop' },
  { slug: 'makeup', label: 'Makeup', count: 32, img: 'https://images.pexels.com/photos/2533366/pexels-photo-2533366.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop' },
  { slug: 'haircare', label: 'Haircare', count: 18, img: 'https://images.pexels.com/photos/3750635/pexels-photo-3750635.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop' },
  { slug: 'fragrances', label: 'Fragrances', count: 14, img: 'https://images.pexels.com/photos/932405/pexels-photo-932405.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop' },
];

function ProductSection({ title, products, bgClass }: { title: string; products: typeof skincareProducts; bgClass: string }) {
  return (
    <section className={`product-section ${bgClass}`}>
      <div className="container">
        <ScrollReveal>
          <div className="product-section-header">
            <div>
              <p className="section-eyebrow">Curated Collection</p>
              <h2 className="section-title">{title}</h2>
            </div>
            <Link to="/" className="view-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
        <div className="product-grid">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} className={`delay-${i + 1}`}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterSubmitting(true);
    setNewsletterStatus('idle');

    try {
      await subscribeNewsletter(newsletterEmail.trim());
      setNewsletterEmail('');
      setNewsletterStatus('success');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-tag">
              <span className="hero-tag-line" />
              Spring Collection 2026
            </div>
            <h1 className="hero-title">
              Unveil Your <em>Natural</em> Beauty
            </h1>
            <p className="hero-subtitle">
              Premium beauty and cosmetics crafted for every woman.
              Discover curated skincare, makeup, and fragrances crafted with
              the finest ingredients.
            </p>
            <div className="hero-buttons">
              <Link to="/" className="btn-primary">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img
              src="https://images.pexels.com/photos/3685534/pexels-photo-3685534.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"
              alt="Luxury skincare products"
              className="hero-image"
            />
            <div className="hero-floating-card">
              <div className="hero-floating-card-icon">
                <Sparkles size={18} />
              </div>
              <div className="hero-floating-card-text">
                <strong>2,500+</strong>
                Happy customers worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="categories">
        <div className="container">
          <ScrollReveal>
            <div className="categories-header">
              <p className="section-eyebrow">Explore</p>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Find your perfect beauty ritual from our carefully curated collections
              </p>
            </div>
          </ScrollReveal>
          <div className="categories-grid">
            {categoryImages.map((cat, i) => (
              <ScrollReveal key={cat.slug} className={`delay-${i + 1}`}>
                <div className="category-card">
                  <img src={cat.img} alt={cat.label} className="category-card-image" loading="lazy" />
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">{cat.label}</h3>
                    <span className="category-card-count">{cat.count} Products</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection title="Skincare" products={skincareProducts} bgClass="skincare" />
      <ProductSection title="Makeup" products={makeupProducts} bgClass="makeup" />
      <ProductSection title="Haircare" products={haircareProducts} bgClass="haircare" />
      <ProductSection title="Fragrances" products={fragranceProducts} bgClass="fragrances" />

      {/* Features */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="features-grid">
            {[
              { icon: <Truck size={22} />, title: 'Free Shipping', desc: 'On orders over GH₵200' },
              { icon: <Shield size={22} />, title: 'Clean Beauty', desc: 'Cruelty-free & vegan' },
              { icon: <Leaf size={22} />, title: 'Sustainable', desc: 'Eco-conscious packaging' },
              { icon: <Sparkles size={22} />, title: 'Premium Quality', desc: 'Only the finest ingredients' },
            ].map((feat, i) => (
              <ScrollReveal key={i} className={`delay-${i + 1}`}>
                <div className="feature-item">
                  <div className="feature-icon">{feat.icon}</div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Trust Badges */}
      <Reviews />

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <ScrollReveal>
            <h3>Stay in the Glow</h3>
            <p>Subscribe for exclusive offers, beauty tips, and early access to new arrivals.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={newsletterSubmitting}>
                {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'success' && (
              <p style={{ marginTop: '12px', color: 'var(--rose-gold)' }}>
                You're subscribed! Welcome to the glow.
              </p>
            )}
            {newsletterStatus === 'error' && (
              <p style={{ marginTop: '12px', color: '#9b2226' }}>
                Could not subscribe right now. Please try again.
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
