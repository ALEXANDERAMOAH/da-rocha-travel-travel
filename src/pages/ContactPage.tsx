import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitMessage('Thank you for contacting us! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);

    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (514) 223-7060', '+233 593 039 094'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['bonsudarocha36@.com'],},

    {
      icon: MapPin,
      title: 'Address',
      details: ['Hwidiem, ahafo goaso'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            We're here to help plan your perfect journey
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <info.icon className="text-blue-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our packages or need help planning your trip? Fill out the form
              and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="booking">Booking Question</option>
                  <option value="package">Package Information</option>
                  <option value="custom">Custom Trip Planning</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about your dream vacation..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={20} />
              </button>

              {submitMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full">
              <div className="h-full min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/place/Da-Rocha+Travel+and+Tour/@6.9342154,-2.3594584,17z/data=!3m1!4b1!4m6!3m5!1s0xfdb2f975f3337ed:0x7b440d2761c1ae1!8m2!3d6.9342154!4d-2.3568835!16s%2Fg%2F11k9f3gx_d?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-cyan-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our packages and start your adventure today
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all">
            View Packages
          </button>
        </div>
      </section>
    </div>
  );
}
