import { useState, useEffect } from 'react';
import { Clock, Check, Tag, Calendar } from 'lucide-react';
import { supabase, Package, Destination } from '../lib/supabase';

type PackagesPageProps = {
  onNavigate: (page: string, data?: unknown) => void;
  filterData?: { destinationId?: string };
};

export default function PackagesPage({ onNavigate, filterData }: PackagesPageProps) {
  const [packages, setPackages] = useState<(Package & { destination?: Destination })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, [filterData]);

  const fetchPackages = async () => {
    setLoading(true);
    let query = supabase
      .from('packages')
      .select('*, destination:destinations(*)');

    if (filterData?.destinationId) {
      query = query.eq('destination_id', filterData.destinationId);
    }

    const { data } = await query.order('is_featured', { ascending: false });

    if (data) {
      setPackages(data as (Package & { destination?: Destination })[]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel Packages</h1>
          <p className="text-xl text-gray-200">
            Carefully curated packages for unforgettable experiences
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {packages.length} package{packages.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64">
                    <img
                      src={pkg.destination?.image_url}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    {pkg.is_featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                    {pkg.discount_percentage > 0 && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                          <Tag size={16} />
                          <span>{pkg.discount_percentage}% OFF</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span>{pkg.destination?.name}, {pkg.destination?.country}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                    <div className="flex items-center space-x-4 mb-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock size={16} />
                        <span>{pkg.duration_days} days</span>
                      </div>
                      <div className="text-gray-600">
                        Max {pkg.max_capacity} people
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Check className="text-green-500" size={18} />
                        <span>What's Included</span>
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {pkg.includes.slice(0, 4).map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Check className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {pkg.includes.length > 4 && (
                        <p className="text-sm text-blue-600 mt-2">+{pkg.includes.length - 4} more</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div />
                      <button
                        onClick={() => onNavigate('booking', { packageId: pkg.id })}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {packages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600 mb-4">No packages available</p>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Destinations
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
