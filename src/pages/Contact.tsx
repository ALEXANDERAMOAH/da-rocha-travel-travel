import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitContactMessage } from '../lib/database';

export default function Contact() {
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastType(type);
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContactMessage({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      showToast('Message sent successfully!');
    } catch {
      showToast('Could not send your message. Please try again or contact us directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-enter">
      <section className="contact-hero">
        <div className="container">
          <p className="section-eyebrow">Get in Touch</p>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Reach out for questions, collaborations, or just to say hello.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal>
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select a topic</option>
                      <option>General Inquiry</option>
                      <option>Product Question</option>
                      <option>Order Support</option>
                      <option>Wholesale & Partnerships</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="contact-info-side">
                {[
                  { icon: <MapPin size={18} />, title: 'Visit Us', text: 'Tantra hill\nAccra, Ghana' },
                  { icon: <Phone size={18} />, title: 'Call Us', text: '+233 534010350\nMon–Fri, 9am–6pm GMT' },
                  { icon: <Mail size={18} />, title: 'Email Us', text: 'wemadeit524@gmail.com\nWe reply within 24 hours' },
                  { icon: <Clock size={18} />, title: 'Store Hours', text: 'Mon–Sat: 10am–8pm\nSunday: 11am–6pm' },
                ].map((card, i) => (
                  <div key={i} className="contact-info-card">
                    <div className="contact-info-icon">{card.icon}</div>
                    <div>
                      <h4>{card.title}</h4>
                      <p>{card.text.split('\n').map((line, j) => (
                        <span key={j}>{line}{j < card.text.split('\n').length - 1 && <br />}</span>
                      ))}</p>
                    </div>
                  </div>
                ))}

                <div className="contact-map">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.255%2C5.611%2C-0.235%2C5.631&layer=mapnik&marker=5.621%2C-0.245"
                    title="Store location map"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {toast && <div className={`toast ${toastType}`}>{toast}</div>}
    </div>
  );
}
