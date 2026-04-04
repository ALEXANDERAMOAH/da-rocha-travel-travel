import { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Check, AlertCircle, MapPin, Clock } from 'lucide-react';
import { supabase, Package, Destination, Booking } from '../lib/supabase';

type BookingPageProps = {
  onNavigate: (page: string) => void;
  bookingData?: { packageId?: string };
};

export default function BookingPage({ onNavigate, bookingData }: BookingPageProps) {
  const [selectedPackage, setSelectedPackage] = useState<(Package & { destination?: Destination }) | null>(null);
  const [packages, setPackages] = useState<(Package & { destination?: Destination })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    package_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    travel_date: '',
    number_of_travelers: 1,
    special_requests: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (bookingData?.packageId) {
      const pkg = packages.find((p) => p.id === bookingData.packageId);
      if (pkg) {
        setSelectedPackage(pkg);
        setFormData({ ...formData, package_id: pkg.id });
      }
    }
  }, [bookingData, packages]);

  const fetchPackages = async () => {
    setLoading(false);
    const { data } = await supabase
      .from('packages')
      .select('*, destination:destinations(*)')
      .order('is_featured', { ascending: false });

    if (data) {
      setPackages(data as (Package & { destination?: Destination })[]);
      if (bookingData?.packageId) {
        const pkg = data.find((p: Package) => p.id === bookingData.packageId);
        if (pkg) {
          setSelectedPackage(pkg as Package & { destination?: Destination });
          setFormData((prev) => ({ ...prev, package_id: pkg.id }));
        }
      }
    }
    setLoading(false);
  };

  const handlePackageSelect = (pkg: Package & { destination?: Destination }) => {
    setSelectedPackage(pkg);
    setFormData({ ...formData, package_id: pkg.id });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'number_of_travelers' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData: Booking = {
        ...formData,
        total_price: 0,
      };

      const { error } = await supabase.from('bookings').insert([bookingData]);

      if (error) throw error;

      setBookingSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="text-green-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for booking with Da-Rocha Travel &amp; Tour Agency. We've sent a confirmation
            email to <span className="font-semibold">{formData.customer_email}</span>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Package:</span> {selectedPackage?.name}
              </p>
              <p>
                <span className="font-medium">Travel Date:</span> {formData.travel_date}
              </p>
              <p>
                <span className="font-medium">Travelers:</span> {formData.number_of_travelers}
              </p>
              <p>
                <span className="font-medium">Total:</span> To be confirmed
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            Our team will contact you within 24 hours to finalize your travel arrangements.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-80 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Book Your Adventure</h1>
          <p className="text-xl text-gray-200">Just a few steps to your dream vacation</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!selectedPackage && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Package</h2>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => handlePackageSelect(pkg)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.package_id === pkg.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={pkg.destination?.image_url}
                            alt={pkg.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                            <p className="text-sm text-gray-600">{pkg.destination?.name}</p>
                            <p className="text-sm text-gray-600">{pkg.duration_days} days</p>
                          </div>
                          <div className="text-right" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPackage && (
                <>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="customer_name"
                          value={formData.customer_name}
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
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="customer_phone"
                            value={formData.customer_phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Details</h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="inline mr-2" size={16} />
                            Travel Date *
                          </label>
                          <input
                            type="date"
                            name="travel_date"
                            value={formData.travel_date}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Users className="inline mr-2" size={16} />
                            Number of Travelers *
                          </label>
                          <select
                            name="number_of_travelers"
                            value={formData.number_of_travelers}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Special Requests
                        </label>
                        <textarea
                          name="special_requests"
                          value={formData.special_requests}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-blue-900">
                      By submitting this booking, you agree to our terms and conditions. A deposit
                      of 25% is required to confirm your reservation. Our team will contact you
                      within 24 hours to process payment and finalize details.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={24} />
                    <span>{isSubmitting ? 'Processing...' : 'Confirm Booking'}</span>
                  </button>
                </>
              )}
            </form>
          </div>

          {selectedPackage && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

                <div className="mb-4">
                  <img
                    src={selectedPackage.destination?.image_url}
                    alt={selectedPackage.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPackage.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>
                        {selectedPackage.destination?.name}, {selectedPackage.destination?.country}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{selectedPackage.duration_days} days</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Number of travelers</span>
                    <span>{formData.number_of_travelers}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      To be confirmed
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
                  <ul className="space-y-1">
                    {selectedPackage.includes.slice(0, 5).map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <Check className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
