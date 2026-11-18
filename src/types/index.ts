export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in QAR
  originalPrice?: number; // in QAR
  category: 'Luxury Handbags' | 'Evening Gowns' | 'Kaftans & Abayas' | 'Cocktail Dresses' | 'Modest Luxury' | 'Bridal & Gala' | string;
  occasion: string;
  silhouette: string;
  fabric: string;
  dimensions?: string; // e.g. '25cm * 16cm * 11cm'
  colors: { name: string; hex: string; image?: string }[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom' | 'One Size')[];
  images: string[];
  description: string;
  details: string[];
  care: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  dressPurchased: string;
  avatar: string;
  date: string;
}

export interface AtelierAppointment {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  occasionType: string;
  notes?: string;
}
