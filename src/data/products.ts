export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const pexelsBase = (id: number, w = 600, h = 750) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

const pexelsSquare = (id: number, s = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${s}&h=${s}&fit=crop`;

export const skincareProducts: Product[] = [
  {
    id: 1,
    name: 'Rose Petal Hydrating Serum',
    category: 'skincare',
    price: 120,
    image: pexelsBase(3685530),
    description: 'Deep hydration with wild rose extract and hyaluronic acid',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Lavender Night Cream',
    category: 'skincare',
    price: 85,
    image: pexelsBase(3685529),
    description: 'Restorative overnight treatment with French lavender',
  },
  {
    id: 3,
    name: 'Golden Hour Illuminating Oil',
    category: 'skincare',
    price: 145,
    image: pexelsBase(4058458),
    description: 'Radiance-boosting oil with vitamin E and squalane',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Silk Petal Cleansing Balm',
    category: 'skincare',
    price: 60,
    image: pexelsBase(3685534),
    description: 'Gentle melting cleanser that dissolves makeup effortlessly',
  },
];

export const makeupProducts: Product[] = [
  {
    id: 5,
    name: 'Velvet Blush Duo',
    category: 'makeup',
    price: 55,
    image: pexelsBase(2533366),
    description: 'Silky powder blush in complementary rose and peach tones',
    badge: 'Trending',
  },
  {
    id: 6,
    name: 'Satin Lip Palette',
    category: 'makeup',
    price: 75,
    image: pexelsBase(1583291),
    description: 'Six universally flattering shades from nude to berry',
  },
  {
    id: 7,
    name: 'Luminous Foundation',
    category: 'makeup',
    price: 90,
    image: pexelsBase(3323399),
    description: 'Weightless, buildable coverage with a dewy finish',
    badge: 'New',
  },
  {
    id: 8,
    name: 'Smoky Eye Essentials',
    category: 'makeup',
    price: 70,
    image: pexelsBase(2584329),
    description: 'Five richly pigmented shadows for day-to-night looks',
  },
];

export const haircareProducts: Product[] = [
  {
    id: 9,
    name: 'Botanical Shine Shampoo',
    category: 'haircare',
    price: 45,
    image: pexelsBase(3750635),
    description: 'Gentle cleansing with argan oil and keratin proteins',
  },
  {
    id: 10,
    name: 'Silk Repair Mask',
    category: 'haircare',
    price: 60,
    image: pexelsBase(3997826),
    description: 'Deep conditioning treatment for damaged, color-treated hair',
    badge: 'Bestseller',
  },
  {
    id: 11,
    name: 'Ocean Salt Texturizing Spray',
    category: 'haircare',
    price: 40,
    image: pexelsBase(5632402),
    description: 'Effortless beach waves without the drying effects',
  },
  {
    id: 12,
    name: 'Crown Oil Elixir',
    category: 'haircare',
    price: 75,
    image: pexelsBase(5632399),
    description: 'Lightweight nourishing oil for brilliant, frizz-free shine',
    badge: 'New',
  },
];

export const fragranceProducts: Product[] = [
  {
    id: 13,
    name: 'Jardin de Roses EDP',
    category: 'fragrances',
    price: 180,
    image: pexelsBase(932405),
    description: 'A romantic bouquet of Damask rose and white peony',
    badge: 'Signature',
  },
  {
    id: 14,
    name: 'Velvet Oud Parfum',
    category: 'fragrances',
    price: 220,
    image: pexelsBase(965989),
    description: 'Warm, intoxicating blend of oud, amber, and vanilla',
  },
  {
    id: 15,
    name: 'Fresh Citrus Bloom',
    category: 'fragrances',
    price: 130,
    image: pexelsBase(6039506),
    description: 'Bright bergamot and neroli with a hint of jasmine',
    badge: 'New',
  },
  {
    id: 16,
    name: 'Midnight Iris EDP',
    category: 'fragrances',
    price: 195,
    image: pexelsBase(932404),
    description: 'Elegant iris and violet leaf with powdery musk base',
  },
];

export const allProducts = [
  ...skincareProducts,
  ...makeupProducts,
  ...haircareProducts,
  ...fragranceProducts,
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: pexelsSquare(3685530), alt: 'Skincare products arranged on marble', category: 'skincare' },
  { id: 2, src: pexelsSquare(2533366), alt: 'Makeup brushes and blush palette', category: 'makeup' },
  { id: 3, src: pexelsSquare(3750635), alt: 'Hair care bottles in natural light', category: 'haircare' },
  { id: 4, src: pexelsSquare(932405), alt: 'Rose perfume bottle with petals', category: 'fragrances' },
  { id: 5, src: pexelsSquare(4058458), alt: 'Golden illuminating oil drops', category: 'skincare' },
  { id: 6, src: pexelsSquare(1583291), alt: 'Lip palette in satin finish', category: 'makeup' },
  { id: 7, src: pexelsSquare(5632402), alt: 'Texturizing spray on wavy hair', category: 'haircare' },
  { id: 8, src: pexelsSquare(965989), alt: 'Oud perfume with dark backdrop', category: 'fragrances' },
  { id: 9, src: pexelsSquare(3323399), alt: 'Foundation swatches on skin', category: 'makeup' },
  { id: 10, src: pexelsSquare(3997826), alt: 'Deep conditioning hair mask', category: 'haircare' },
  { id: 11, src: pexelsSquare(6039506), alt: 'Citrus bloom fragrance details', category: 'fragrances' },
  { id: 12, src: pexelsSquare(3685534), alt: 'Cleansing balm texture close-up', category: 'skincare' },
];
