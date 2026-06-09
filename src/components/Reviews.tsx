import { Star, ShieldCheck, Truck, RotateCcw, BadgeCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { reviews } from '../data/reviews';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= rating ? 'star-filled' : 'star-empty'}
        />
      ))}
    </div>
  );
}

const trustBadges = [
  { icon: <BadgeCheck size={24} />, title: '100% Authentic Products', desc: 'Verified genuine brands' },
  { icon: <Truck size={24} />, title: 'Fast Delivery in Ghana', desc: '2–5 days nationwide' },
  { icon: <ShieldCheck size={24} />, title: 'Secure Payment', desc: 'Encrypted checkout' },
  { icon: <RotateCcw size={24} />, title: 'Easy Returns', desc: 'Hassle-free refunds' },
];

export default function Reviews() {
  return (
    <section className="reviews-section">
      <div className="container">
        <ScrollReveal>
          <div className="reviews-header">
            <p className="section-eyebrow">Customer Love</p>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Real reviews from real beauty lovers across Ghana
            </p>
          </div>
        </ScrollReveal>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} className={`delay-${i + 1}`}>
              <div className="review-card">
                <StarRating rating={review.rating} />
                <p className="review-text">&ldquo;{review.text}&rdquo;</p>
                <div className="review-author">
                  <div className="review-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <span className="review-name">{review.name}</span>
                    <span className="review-location">{review.location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="trust-badges">
            {trustBadges.map((badge, i) => (
              <div key={i} className="trust-badge">
                <div className="trust-badge-icon">{badge.icon}</div>
                <div>
                  <strong>{badge.title}</strong>
                  <span>{badge.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
