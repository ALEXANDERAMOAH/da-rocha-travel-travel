import { useState, useEffect } from 'react';
import { Filter, MapPin } from 'lucide-react';
import { supabase, Destination } from '../lib/supabase';

type DestinationsPageProps = {
  onNavigate: (page: string, data?: unknown) => void;
  searchData?: { search?: string; selected?: string };
};

export default function DestinationsPage({ onNavigate, searchData }: DestinationsPageProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'beach', label: 'Beach Holidays' },
    { id: 'adventure', label: 'Adventure Travel' },
    { id: 'cultural', label: 'Cultural Tours' },
    { id: 'luxury', label: 'Luxury Escapes' },
  ];

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredDestinations(destinations);
    } else {
      setFilteredDestinations(
        destinations.filter((d) => d.category === selectedCategory)
      );
    }
  }, [selectedCategory, destinations]);

  const fetchDestinations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('destinations')
      .select('*')
      .order('popular', { ascending: false });

    if (data) {
      setDestinations(data);
      setFilteredDestinations(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl text-gray-200">
            Discover amazing places around the world
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center space-x-2 mb-8">
          <Filter className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Filter by Category</h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                  onClick={() => onNavigate('packages', { destinationId: destination.id })}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={destination.image_url}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                        {destination.category}
                      </span>
                    </div>
                    {destination.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin size={18} />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                      <h3 className="text-3xl font-bold">{destination.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {destination.short_description}
                    </p>
                    <div className="flex justify-end">
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        View Packages
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600">No destinations found in this category</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
