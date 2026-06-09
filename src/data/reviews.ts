export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Ama Mensah',
    location: 'Accra',
    rating: 5,
    text: 'The skincare routine I got from Petal & Bloom completely transformed my skin! My friends keep asking what I\'m using. Delivery was super fast too.',
  },
  {
    id: 2,
    name: 'Akua Boateng',
    location: 'Kumasi',
    rating: 5,
    text: 'Finally, a beauty shop in Ghana with 100% authentic products. I\'ve tried so many others but this is the real deal. My go-to for all things beauty!',
  },
  {
    id: 3,
    name: 'Esi Appiah',
    location: 'Takoradi',
    rating: 4,
    text: 'Ordered the Fenty foundation and it arrived in 2 days. Perfect shade match! The team even WhatsApped me to confirm my shade before shipping.',
  },
  {
    id: 4,
    name: 'Nana Owusu',
    location: 'Tema',
    rating: 5,
    text: 'I was skeptical about ordering online but Petal & Bloom proved me wrong. Quality products, beautiful packaging, and the returns process was hassle-free.',
  },
  {
    id: 5,
    name: 'Adwoa Darko',
    location: 'Cape Coast',
    rating: 5,
    text: 'The haircare collection is everything! My natural hair has never looked this healthy. Plus the free delivery on my order was a lovely surprise.',
  },
];
