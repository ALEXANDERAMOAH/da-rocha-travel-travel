import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { supabase, Destination, Testimonial } from '../lib/supabase';

type HomePageProps = {
  onNavigate: (page: string, data?: unknown) => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCountries = [
    {
      name: 'Ghana',
      country: 'Ghana',
      imageUrl:
        'https://images.pexels.com/photos/18358061/pexels-photo-18358061.jpeg',
      description: 'Discover vibrant culture, historic castles, and golden beaches in West Africa.',
      searchQuery: 'Ghana',
    },
    {
      name: 'United States',
      country: 'USA',
      imageUrl:
        'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
      description: 'From New York City skylines to California sunsets and national parks.',
      searchQuery: 'United States',
    },
    {
      name: 'Canada',
      country: 'Canada',
      imageUrl:
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      description: 'Snow-capped mountains, crystal lakes, and charming modern cities.',
      searchQuery: 'Canada',
    },
    {
      name: 'Mexico',
      country: 'Mexico',
      imageUrl:
        'https://images.pexels.com/photos/15887575/pexels-photo-15887575.jpeg',
      description: 'Colorful streets, ancient ruins, and turquoise Caribbean waters.',
      searchQuery: 'Mexico',
    },
    {
      name: 'Germany',
      country: 'Germany',
      imageUrl:
        'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
      description: 'Fairytale castles, Christmas markets, and vibrant European cities.',
      searchQuery: 'Germany',
    },
  ];

  useEffect(() => {
    fetchDestinations();
    fetchTestimonials();
  }, []);

  const fetchDestinations = async () => {
    const { data } = await supabase
      .from('destinations')
      .select('*')
      .eq('popular', true)
      .order('created_at', { ascending: false });

    if (data) setDestinations(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) setTestimonials(data);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate('destinations', { search: searchQuery });
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2131967/pexels-photo-2131967.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Explore breathtaking destinations around the world with expert guidance
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 appearance-none">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3-5 Travelers</option>
                  <option>6+ Travelers</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked destinations for unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCountries.map((country) => (
              <div
                key={country.name}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                onClick={() => onNavigate('destinations', { search: country.searchQuery })}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={country.imageUrl}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    Top pick
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                    <p className="text-sm text-gray-200">{country.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{country.description}</p>
                  <button className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700">
                    <span>Explore</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                onClick={() => onNavigate('destinations', { selected: destination.id })}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image_url}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{destination.short_description}</p>
                  <button className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700">
                    <span>Explore</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('destinations')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real adventurers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.customer_name}</p>
                  <p className="text-sm text-gray-600">{testimonial.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied travelers and create memories that last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('packages')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Browse Packages
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
