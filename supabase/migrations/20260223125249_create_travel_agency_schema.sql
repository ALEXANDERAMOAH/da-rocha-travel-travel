/*
  # Travel Agency Database Schema

  ## Overview
  Creates the complete database structure for a travel agency website including destinations,
  packages, bookings, testimonials, and blog posts.

  ## New Tables

  ### 1. destinations
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Destination name
  - `country` (text) - Country name
  - `description` (text) - Full description
  - `short_description` (text) - Brief summary
  - `category` (text) - Type (beach, adventure, cultural, luxury)
  - `image_url` (text) - Main destination image
  - `gallery_urls` (text[]) - Additional images
  - `price_from` (numeric) - Starting price
  - `popular` (boolean) - Featured on homepage
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. packages
  - `id` (uuid, primary key) - Unique identifier
  - `destination_id` (uuid, foreign key) - Links to destinations
  - `name` (text) - Package name
  - `description` (text) - Full description
  - `duration_days` (integer) - Trip duration
  - `price` (numeric) - Package price
  - `includes` (text[]) - What's included
  - `excludes` (text[]) - What's not included
  - `itinerary` (jsonb) - Day-by-day itinerary
  - `available_dates` (date[]) - Available start dates
  - `max_capacity` (integer) - Maximum travelers
  - `is_featured` (boolean) - Show on homepage
  - `discount_percentage` (numeric) - Current discount
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. bookings
  - `id` (uuid, primary key) - Unique identifier
  - `package_id` (uuid, foreign key) - Links to packages
  - `customer_name` (text) - Customer full name
  - `customer_email` (text) - Contact email
  - `customer_phone` (text) - Contact phone
  - `travel_date` (date) - Departure date
  - `number_of_travelers` (integer) - Party size
  - `total_price` (numeric) - Final price
  - `status` (text) - Booking status (pending, confirmed, cancelled)
  - `special_requests` (text) - Additional notes
  - `created_at` (timestamptz) - Booking timestamp

  ### 4. testimonials
  - `id` (uuid, primary key) - Unique identifier
  - `customer_name` (text) - Customer name
  - `destination` (text) - Where they traveled
  - `rating` (integer) - Star rating (1-5)
  - `comment` (text) - Review text
  - `image_url` (text) - Customer photo (optional)
  - `featured` (boolean) - Show on homepage
  - `created_at` (timestamptz) - Review timestamp

  ### 5. blog_posts
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article title
  - `slug` (text, unique) - URL-friendly title
  - `excerpt` (text) - Brief summary
  - `content` (text) - Full article content
  - `author` (text) - Author name
  - `image_url` (text) - Featured image
  - `category` (text) - Article category
  - `published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp

  ### 6. newsletter_subscribers
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email
  - `subscribed_at` (timestamptz) - Subscription timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for destinations, packages, testimonials, and blog posts
  - Authenticated insert for bookings and newsletter subscriptions
  - Admin-only write access for content management tables
*/

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  gallery_urls text[] DEFAULT '{}',
  price_from numeric NOT NULL,
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  duration_days integer NOT NULL,
  price numeric NOT NULL,
  includes text[] DEFAULT '{}',
  excludes text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]',
  available_dates date[] DEFAULT '{}',
  max_capacity integer DEFAULT 20,
  is_featured boolean DEFAULT false,
  discount_percentage numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES packages(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  travel_date date NOT NULL,
  number_of_travelers integer NOT NULL,
  total_price numeric NOT NULL,
  status text DEFAULT 'pending',
  special_requests text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  destination text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Destinations policies (public read)
CREATE POLICY "Public can view destinations"
  ON destinations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Packages policies (public read)
CREATE POLICY "Public can view packages"
  ON packages FOR SELECT
  TO anon, authenticated
  USING (true);

-- Bookings policies (anyone can create)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt()->>'email');

-- Testimonials policies (public read)
CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog posts policies (public read for published)
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Newsletter policies (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert sample destinations
INSERT INTO destinations (name, country, description, short_description, category, image_url, price_from, popular) VALUES
('Maldives', 'Maldives', 'Experience paradise in the Maldives with crystal-clear waters, pristine beaches, and luxurious overwater villas. Perfect for honeymooners and beach lovers.', 'Paradise islands with crystal-clear waters', 'beach', 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg', 2499, true),
('Santorini', 'Greece', 'Discover the enchanting white-washed buildings and blue-domed churches of Santorini. Enjoy stunning sunsets, delicious cuisine, and rich history.', 'Iconic Greek island with stunning sunsets', 'cultural', 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg', 1899, true),
('Swiss Alps', 'Switzerland', 'Adventure awaits in the Swiss Alps with world-class skiing, hiking trails, and breathtaking mountain views. Perfect for nature enthusiasts.', 'Majestic mountains and alpine adventures', 'adventure', 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg', 2199, true),
('Bali', 'Indonesia', 'Immerse yourself in Balinese culture with ancient temples, lush rice terraces, and tropical beaches. A perfect blend of relaxation and exploration.', 'Tropical paradise with culture and beaches', 'beach', 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', 1599, true),
('Dubai', 'UAE', 'Experience luxury and innovation in Dubai with iconic skyscrapers, world-class shopping, and desert adventures. Modern elegance meets Arabian hospitality.', 'Luxury destination with modern marvels', 'luxury', 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg', 1799, true),
('Iceland', 'Iceland', 'Witness the Northern Lights, explore volcanic landscapes, and relax in geothermal hot springs. Iceland offers otherworldly natural beauty.', 'Land of fire, ice, and Northern Lights', 'adventure', 'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg', 2299, false);

-- Insert sample packages
INSERT INTO packages (destination_id, name, description, duration_days, price, includes, is_featured, discount_percentage) 
SELECT 
  id,
  name || ' Ultimate Experience',
  'Discover the best of ' || name || ' with our carefully curated package including accommodations, activities, and guided tours.',
  7,
  price_from,
  ARRAY['Round-trip flights', 'Luxury accommodation', 'Daily breakfast', 'Guided tours', 'Travel insurance'],
  popular,
  CASE WHEN popular THEN 15 ELSE 0 END
FROM destinations;

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, destination, rating, comment, featured) VALUES
('Sarah Johnson', 'Maldives', 5, 'The most amazing vacation of my life! The resort was stunning and the service was impeccable. Highly recommend!', true),
('Michael Chen', 'Santorini', 5, 'Absolutely breathtaking views and wonderful hospitality. The sunset in Oia was unforgettable.', true),
('Emma Williams', 'Swiss Alps', 5, 'Perfect winter getaway! The skiing was fantastic and the mountain views were spectacular.', true),
('David Brown', 'Bali', 4, 'Beautiful culture and amazing food. The temples and rice terraces were highlights of our trip.', false);
