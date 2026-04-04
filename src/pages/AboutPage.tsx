import { Award, Users, Globe, Heart, CheckCircle, Target } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '50,000+' },
    { icon: Globe, label: 'Destinations', value: '150+' },
    { icon: Award, label: 'Years Experience', value: '14+' },
    { icon: Heart, label: 'Satisfaction Rate', value: '99%' },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Passionate about creating unforgettable travel experiences',
    },
    {
      name: 'James Anderson',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: '15 years of experience in hospitality and travel',
    },
    {
      name: 'Emily Chen',
      role: 'Travel Consultant',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      bio: 'Specialist in luxury and adventure travel',
    },
    {
      name: 'Garry Prince',
      role: 'Customer Success Manager',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      bio: 'Dedicated to ensuring every journey is perfect',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Customer First',
      description: 'Your dream vacation is our top priority. We go above and beyond to exceed your expectations.',
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'Our team has firsthand experience with every destination we offer, ensuring authentic recommendations.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'We partner only with the best hotels, airlines, and tour operators to guarantee premium experiences.',
    },
    {
      icon: Heart,
      title: 'Sustainable Travel',
      description: 'We are committed to responsible tourism that respects local communities and protects our planet.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Da-Rocha Travel &amp; Tour Agency</h1>
          <p className="text-xl text-gray-200">
            Creating extraordinary travel experiences since 2010
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className="mx-auto text-blue-600 mb-3" size={40} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2010, Da-Rocha Travel &amp; Tour Agency was born from a simple belief:
                travel should be extraordinary, not ordinary. What started as a small travel
                consultancy has grown into one of the most trusted names in luxury and adventure
                travel.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We've helped over 50,000 travelers explore 150+ destinations worldwide, creating
                memories that last a lifetime. Our team of experienced travel consultants brings
                decades of combined expertise and firsthand knowledge of every destination we offer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and evolve, staying ahead of travel trends while
                maintaining the personalized service that our clients have come to expect.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us to deliver excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <value.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate travel experts dedicated to your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the Da-Rocha Travel &amp; Tour Agency difference and let us create your
            perfect adventure
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all">
            Start Planning Your Trip
          </button>
        </div>
      </section>
    </div>
  );
}
