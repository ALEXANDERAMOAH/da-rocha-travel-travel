import { Heart, Leaf, Sparkles } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const values = [
  {
    icon: <Leaf size={24} />,
    title: 'Clean & Conscious',
    desc: 'Every product is thoughtfully formulated without harmful chemicals, parabens, or synthetic fragrances.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Cruelty-Free Always',
    desc: 'We never test on animals. Our commitment to ethical beauty extends to every step of our process.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Luxury Within Reach',
    desc: 'Premium ingredients and elegant formulations should be accessible — not exclusive.',
  },
];

export default function About() {
  return (
    <div className="page-enter">
      <section className="about-hero">
        <div className="container">
          <p className="section-eyebrow">Our Story</p>
          <h1 className="about-hero-title">Where Beauty Meets Purpose</h1>
          <p className="about-hero-subtitle">
            Born from a passion for clean, luxurious beauty, Petal & Bloom celebrates
            the art of self-care with intention and integrity.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <ScrollReveal>
              <img
                src="https://images.pexels.com/photos/3373732/pexels-photo-3373732.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Beauty workshop"
                className="about-story-image"
              />
            </ScrollReveal>
            <ScrollReveal>
              <div className="about-story-text">
                <h3>A Story Rooted in Passion</h3>
                <p>
                  Petal & Bloom was founded in 2018 by Ama Osei, a Accra-born
                  cosmetic chemist who spent a decade in luxury beauty labs
                  before realizing that the products she loved most were often
                  out of reach for everyday women across West Africa.
                </p>
                <p>
                  What began as a small batch of handcrafted serums in her
                  Accra studio has blossomed into a beloved brand that
                  serves thousands of women who believe beauty should be both
                  luxurious and ethical.
                </p>
                <p>
                  Every formula is a marriage of West African botanical wisdom and modern
                  clean science — no shortcuts, no compromises. We source
                  botanicals from local farms, test rigorously without
                  animals, and package with sustainability in mind.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <ScrollReveal>
            <div className="categories-header" style={{ textAlign: 'center', marginBottom: 0 }}>
              <p className="section-eyebrow">What We Stand For</p>
              <h2 className="section-title">Our Core Values</h2>
            </div>
          </ScrollReveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <ScrollReveal key={i} className={`delay-${i + 1}`}>
                <div className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="section-eyebrow">Our Journey</p>
              <h2 className="section-title">Milestones</h2>
            </div>
          </ScrollReveal>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {[
              { year: '2018', text: 'Petal & Bloom launches with 5 handcrafted serums from an Accra studio' },
              { year: '2019', text: 'First retail partnership with 12 boutique stores across Accra' },
              { year: '2020', text: 'Expanded into makeup and haircare; launched our online store' },
              { year: '2022', text: 'Reached 50,000 customers; certified B Corp for ethical business' },
              { year: '2024', text: 'Opened flagship store in SoHo; launched fragrance collection' },
              { year: '2026', text: 'Now serving 2,500+ happy customers worldwide and growing' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div style={{
                  display: 'flex', gap: 24, padding: '20px 0',
                  borderBottom: i < 5 ? '1px solid var(--beige-200)' : 'none',
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
                    fontWeight: 600, color: 'var(--rose-gold)', minWidth: 60,
                  }}>
                    {item.year}
                  </span>
                  <p style={{ color: 'var(--warm-gray)', lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
