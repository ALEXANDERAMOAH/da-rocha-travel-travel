import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  short_description: string;
  category: string;
  image_url: string;
  gallery_urls: string[];
  price_from: number;
  popular: boolean;
  created_at: string;
};

export type Package = {
  id: string;
  destination_id: string;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  includes: string[];
  excludes: string[];
  itinerary: unknown;
  available_dates: string[];
  max_capacity: number;
  is_featured: boolean;
  discount_percentage: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  destination: string;
  rating: number;
  comment: string;
  image_url: string;
  featured: boolean;
  created_at: string;
};

export type Booking = {
  package_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  travel_date: string;
  number_of_travelers: number;
  total_price: number;
  special_requests: string;
};
