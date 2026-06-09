import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { galleryImages } from '../data/products';

const categories = ['all', 'skincare', 'makeup', 'haircare', 'fragrances'];

export default function Gallery() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === active);

  return (
    <div className="page-enter">
      <section className="gallery-hero">
        <div className="container">
          <p className="section-eyebrow">Visual Stories</p>
          <h1 className="gallery-hero-title">The Gallery</h1>
          <p className="gallery-hero-subtitle">
            A glimpse into the world of Petal & Bloom — where beauty is captured in every detail.
          </p>
        </div>
      </section>

      <section className="gallery-main">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <ScrollReveal key={img.id} className={`delay-${(i % 4) + 1}`}>
                <div className="gallery-item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span>{img.category}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
