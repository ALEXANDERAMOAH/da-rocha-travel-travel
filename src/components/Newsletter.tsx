import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { subscribeNewsletter } from '../lib/database';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const result = await subscribeNewsletter(email.trim());
      setSubmitted(true);
      setEmail('');
      if (result.alreadySubscribed) {
        setError("You're already subscribed — thanks for being part of our community!");
      }
      setTimeout(() => {
        setSubmitted(false);
        setError(null);
      }, 4000);
    } catch {
      setError('Could not subscribe right now. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="newsletter-banner">
      <div className="newsletter-banner-inner">
        <div className="newsletter-banner-icon">
          <Sparkles size={28} />
        </div>
        <h3>Get Beauty Tips & Exclusive Deals</h3>
        <p className="newsletter-banner-tagline">
          Join 500+ beauty lovers — new deals every week!
        </p>
        <form className="newsletter-banner-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Subscribing...' : 'Subscribe'} <Send size={16} />
          </button>
        </form>
        {submitted && !error && (
          <p className="newsletter-banner-success">
            You're in! Check your inbox for a welcome gift.
          </p>
        )}
        {error && <p className="newsletter-banner-error">{error}</p>}
      </div>
    </section>
  );
}
