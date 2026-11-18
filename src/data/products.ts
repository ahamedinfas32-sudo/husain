import { Product, Testimonial } from '../types';

export const BRAND_CONTACT = {
  name: 'HIFA FASHION',
  fullName: 'HIFA FASHION BOUTIQUE & ATELIER',
  category: "Women's Fashion, Dresses, and Luxury Handbags",
  whatsapp: '+974 7001 5100',
  formattedWhatsApp: '+974 7001 5100',
  phone: '+974 7001 5100',
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb9t2I15vKA4umaROo1e',
  channelName: 'Haifa Shoppy',
  location: 'Madina Khalifa South, Doha, Qatar',
  city: 'Doha',
  district: 'Madina Khalifa South',
  country: 'Qatar',
  currency: 'QAR',
  currencySymbol: 'ر.ق',
  email: 'concierge@hifafashion.qa',
  hours: 'Saturday – Thursday: 10:00 AM – 10:00 PM | Friday: 4:00 PM – 11:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Madina+Khalifa+South+Doha+Qatar',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14429.627685603767!2d51.4820!3d25.3168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c52c6f145ad7%3A0x7d6f5f3e9c52c1e!2sMadinat+Khalifa+South%2C+Doha%2C+Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa'
};

export const PRODUCTS: Product[] = [
  // User's Products: Uploaded Luxury Handbags
  {
    id: 'hifa-bag-01',
    name: 'Louis Vuitton Speedy 25 Monogram Handbag',
    subtitle: 'Classic Monogram Canvas with Toron Handles & Golden Lock',
    price: 1850,
    originalPrice: 2200,
    category: 'Luxury Handbags',
    occasion: 'Everyday Luxury & Gala Travel',
    silhouette: 'Boston Handbag',
    fabric: 'Iconic Monogram Coated Canvas & Natural Cowhide Trim',
    dimensions: '25cm x 19cm x 15cm',
    colors: [
      { name: 'Monogram Brown / Gold', hex: '#4A2E18' }
    ],
    sizes: ['One Size', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An iconic silhouette presented on luxury display in our Doha boutique. Features signature monogram coated canvas, rolled leather Toron top handles, polished golden brass padlock with keys clochette, and spacious interior.',
    details: [
      'Authentic monogram coated canvas with micro-grain finish',
      'Signature engraved golden brass padlock and matching key clochette',
      'Dual rolled leather Toron handles with double stitching',
      'Spacious textile interior with zipped safety pocket',
      'Official HIFA dustbag and certificate included'
    ],
    care: ['Wipe with a soft damp cloth', 'Keep away from direct heat and moisture', 'Store in dustbag with paper stuffing'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 5.0,
    reviewCount: 42,
    inStock: true
  },
  {
    id: 'hifa-bag-02',
    name: 'Chanel 19 Quilted Large Flap Bag',
    subtitle: 'Supple Diamond-Quilted Lambskin with Tri-Tone Chain & CC Lock',
    price: 2400,
    originalPrice: 2850,
    category: 'Luxury Handbags',
    occasion: 'VIP Soirées & High-Society Events',
    silhouette: 'Flap Shoulder Bag',
    fabric: 'Ultra-Supple Quilted Lambskin Leather',
    dimensions: '30cm x 20cm x 10cm',
    colors: [
      { name: 'Noir Black & Antique Gold', hex: '#1C1C1C' }
    ],
    sizes: ['One Size', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The epitome of contemporary Parisian sophistication. Crafted from luscious oversized diamond-quilted black leather, decorated with the iconic leather-interlaced CC turnlock clasp, and convertible tri-tone antique gold and ruthenium chain shoulder strap.',
    details: [
      'Ultra-plush pillowed diamond quilting',
      'Interlaced leather and gold-finish CC turnlock clasp',
      'Versatile gold and silver chain shoulder strap with leather comfort pad',
      'Rear magnetic snap pocket for fast smartphone access',
      'Burgundy silk-grosgrain lining with interior zippered compartment'
    ],
    care: ['Store flat in original presentation box', 'Avoid friction with rough fabrics', 'Professional leather care only'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 4.9,
    reviewCount: 38,
    inStock: true
  },
  {
    id: 'hifa-bag-03',
    name: 'Fendi Roma "By The Way" Boston Bag — Pastel Teal',
    subtitle: 'Smooth Calfskin in HIFA Signature Teal with Studded Handles',
    price: 1650,
    originalPrice: 1950,
    category: 'Luxury Handbags',
    occasion: 'Day-to-Evening Chic & Qatar Brunches',
    silhouette: 'Boston Handbag',
    fabric: 'Smooth Italian Calfskin Leather',
    dimensions: '25cm x 16cm x 11cm',
    colors: [
      { name: 'Pastel Teal / Tiffany Sky', hex: '#58ACB2' }
    ],
    sizes: ['One Size', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Directly matching HIFA’s brand signature teal aesthetic! A refined Boston handbag crafted from silky pastel-teal calfskin with tonal embossed FENDI ROMA lettering, gold-tone pyramid conical studs, collapsible top handles, and an adjustable crossbody strap.',
    details: [
      'HIFA Signature Pastel Teal tone crafted in buttery calfskin',
      'Embossed tonal macro lettering across front face',
      'Iconic gold-tone conical pyramid studs on collapsible handles',
      'Detachable and adjustable leather crossbody strap with clochette tag',
      'Dual compartment partitioned by a zipped divider pocket'
    ],
    care: ['Protect from extreme humidity', 'Clean gently with microfiber cloth'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 5.0,
    reviewCount: 31,
    inStock: true
  },
  {
    id: 'hifa-bag-04',
    name: 'Fendi Roma Boston Bag Capsule (5 Colors)',
    subtitle: 'Signature 25cm*16cm*11cm Boston Handbag with Embossed Detailing',
    price: 1550,
    originalPrice: 1850,
    category: 'Luxury Handbags',
    occasion: 'Fashion Statements & Daily Elegance',
    silhouette: 'Boston Handbag',
    fabric: 'Structured Calfskin with Textured Relief Lettering',
    dimensions: '25cm * 16cm * 11cm',
    colors: [
      { name: 'Pastel Teal', hex: '#58ACB2' },
      { name: 'Taupe Grey', hex: '#877F76' },
      { name: 'Camel Tan', hex: '#A86D39' },
      { name: 'Nude Beige', hex: '#D7C4B2' },
      { name: 'Classic Black', hex: '#1A1A1A' }
    ],
    sizes: ['One Size', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The complete 5-colorway Boston bag capsule as showcased in our boutique catalogue. Dimensions precisely measured at 25cm * 16cm * 11cm. Available in Pastel Teal, Taupe Grey, Camel Tan, Nude Beige, and Classic Black with matching leather charms and shoulder straps.',
    details: [
      'Precise Dimensions: 25cm length * 16cm height * 11cm depth',
      'Five versatile luxury shades: Teal, Taupe, Camel, Nude, and Noir Black',
      'Textured snakeskin-effect relief FENDI ROMA lettering',
      'Gold-plated metallic conical studs and hardware rivets',
      'Includes detachable long strap for shoulder or crossbody carrying'
    ],
    care: ['Store in provided HIFA dustbag', 'Avoid direct perfume spray'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: true,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 45,
    inStock: true
  },

  // Luxury Dresses & Gowns Collection
  {
    id: 'hifa-01',
    name: 'The Pearl of Doha Emerald Gown',
    subtitle: 'Hand-Pleated Silk Chiffon with Crystal Bodice',
    price: 1850,
    originalPrice: 2200,
    category: 'Evening Gowns',
    occasion: 'Gala & Red Carpet',
    silhouette: 'Flowing A-Line',
    fabric: '100% Pure Silk Chiffon & French Netting',
    colors: [
      { name: 'Teal Emerald', hex: '#0E626B' },
      { name: 'Champagne Gold', hex: '#C5A059' },
      { name: 'Midnight Onyx', hex: '#1A1A1A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal evening creation tailored for Doha high-society galas. Featuring sweeping micro-pleated pure silk chiffon with a couture-sculpted waistline and fine crystal embellishments that catch the Arabian evening light.',
    details: [
      'Bespoke hand-pleated silk chiffon cascading to a court train',
      'Concealed back zip closure with mother-of-pearl buttons',
      'Internal boned corset structure for impeccable posture',
      'Full silk habotai inner lining for supreme comfort in warm climates'
    ],
    care: ['Specialist dry clean only', 'Store in the provided HIFA garment bag', 'Steam with low heat'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 4.9,
    reviewCount: 28,
    inStock: true
  },
  {
    id: 'hifa-02',
    name: 'Al-Rayyan Royal Kaftan Dress',
    subtitle: 'Gold Zari Thread Embroidered Georgette',
    price: 2400,
    originalPrice: 2800,
    category: 'Kaftans & Abayas',
    occasion: 'Ramadan & Eid Celebrations',
    silhouette: 'Flowing Maxi',
    fabric: 'Italian Crepe Georgette with Metallic Zari',
    colors: [
      { name: 'Imperial Teal', hex: '#0B4F56' },
      { name: 'Desert Dune Beige', hex: '#D6C7B2' },
      { name: 'Royal Ivory', hex: '#FAF7F2' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A celebration of Arabian grandeur reimagined with contemporary couture sensibility. Handcrafted in our Madina Khalifa atelier using intricate golden embroidery framing the neckline and dramatic cape sleeves.',
    details: [
      'Exquisite gold threadwork inspired by traditional Qatari architectural motifs',
      'Flattering drape with integrated belt sash for optional fitted silhouette',
      'Floor-sweeping dramatic cape sleeves with weighted silk hem',
      'Modest neckline with delicate hand-stitched beadwork'
    ],
    care: ['Dry clean only by luxury garment specialist', 'Do not iron directly on zari embroidery'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 5.0,
    reviewCount: 34,
    inStock: true
  },
  {
    id: 'hifa-03',
    name: 'Madina Khalifa Silk Mermaid Gown',
    subtitle: 'Structured Duchesse Silk with Off-Shoulder Fold',
    price: 2150,
    originalPrice: 2500,
    category: 'Evening Gowns',
    occasion: 'Weddings & Receptions',
    silhouette: 'Sculpted Mermaid',
    fabric: 'Heavyweight Italian Duchesse Silk',
    colors: [
      { name: 'Warm Champagne', hex: '#E3CCA2' },
      { name: 'Teal Sapphire', hex: '#116979' },
      { name: 'Lustrous Rose', hex: '#D99B9B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Architecture meets romantic silhouette. Crafted from dense Italian Duchesse silk, this architectural gown creates an enviable hourglass outline with an elegant folded portrait collar.',
    details: [
      'Architectural folded off-the-shoulder neckline',
      'Hidden interior waist stay and sculpted seams',
      'Graceful godet train that flares gracefully from the knee',
      'Fully lined with silk satin'
    ],
    care: ['Professional dry clean only', 'Hang on contoured padded hanger'],
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 4.8,
    reviewCount: 19,
    inStock: true
  },
  {
    id: 'hifa-04',
    name: 'Katara Velvet & Lace Gala Dress',
    subtitle: 'French Chantilly Lace with Micro-Velvet Panels',
    price: 1950,
    originalPrice: 2450,
    category: 'Cocktail Dresses',
    occasion: 'Cocktail Party & Soirées',
    silhouette: 'Sheath Column',
    fabric: 'Silk-Blend Micro Velvet & French Chantilly Lace',
    colors: [
      { name: 'Obsidian Black', hex: '#161616' },
      { name: 'Persian Teal', hex: '#0C4B53' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sensual textures balance tailored precision. Sheer Chantilly lace sleeves and illusion yoke meet rich stretch silk-velvet for comfortable all-evening elegance.',
    details: [
      'Scalloped lace wrist cuffs with miniature silk fabric buttons',
      'Thigh-high side slit positioned with modesty lining',
      'Subtle back keyhole opening with gold filigree clasp'
    ],
    care: ['Dry clean recommended', 'Steam inside-out only'],
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: true,
    discountPercentage: 20,
    rating: 4.7,
    reviewCount: 15,
    inStock: true
  },
  {
    id: 'hifa-05',
    name: 'Lusail Crescent Tiered Organza Gown',
    subtitle: 'Multi-Tiered Silk Organza with Gold Filigree Belt',
    price: 2750,
    originalPrice: 3200,
    category: 'Bridal & Gala',
    occasion: 'Engagements & Luxury Banquets',
    silhouette: 'Flared Tiered',
    fabric: 'Crisp Japanese Silk Organza',
    colors: [
      { name: 'Desert Dune Beige', hex: '#D6C7B2' },
      { name: 'Alabaster White', hex: '#F7F6F2' },
      { name: 'Lagoon Teal', hex: '#1A6B73' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Weightless volume that commands every room. Cascading layers of crystalline silk organza capture graceful movement with every step.',
    details: [
      'Six cascading tiered organza flounces with horsehair braid hems',
      'Bespoke gold filigree metal waist belt handcrafted in Qatar',
      'Fully covered back with invisible couture zipper',
      'Includes complementary silk chiffon shawl'
    ],
    care: ['Luxury couture specialist cleaning only', 'Do not crush organza tiers in storage'],
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    rating: 5.0,
    reviewCount: 22,
    inStock: true
  },
  {
    id: 'hifa-06',
    name: 'Zubarah Linen & Silk Modest Dress',
    subtitle: 'Breathable Natural Silk-Linen with Subtle Tone Embroidery',
    price: 1350,
    originalPrice: 1600,
    category: 'Modest Luxury',
    occasion: 'Afternoon High Tea & Gatherings',
    silhouette: 'Flowing A-Line',
    fabric: 'Belgian Fine Linen & Mulberry Silk Weave',
    colors: [
      { name: 'Natural Sand', hex: '#E0D6C3' },
      { name: 'Oasis Teal', hex: '#377E85' },
      { name: 'Cloud White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Everyday elegance perfected for the Qatar climate. Exceptionally breathable linen blended with mulberry silk creates a soft, effortless drape that stays cool and crease-resistant throughout Doha’s warm afternoons.',
    details: [
      'Pre-washed and softened Belgian linen and silk weave',
      'Functional mother-of-pearl buttons from neckline to waist',
      'Deep, discreet in-seam side pockets',
      'Removable fabric tie belt to cinch the waist as desired'
    ],
    care: ['Gentle cycle cold wash or specialist dry clean', 'Warm iron while slightly damp'],
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: false,
    rating: 4.8,
    reviewCount: 31,
    inStock: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sheikha Noor Al-Thani',
    location: 'West Bay Lagoon, Doha',
    comment: 'HIFA tailored my custom gown and matching handbag for our family banquet. The attention to detail, impeccable finish, and fast delivery to West Bay exceeded all expectations. The WhatsApp consultation was effortless!',
    rating: 5,
    dressPurchased: 'The Pearl of Doha Emerald Gown & Chanel 19 Flap Bag',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'February 2026'
  },
  {
    id: 't-2',
    name: 'Fatima Al-Kuwari',
    location: 'Madina Khalifa South, Doha',
    comment: 'Having HIFA right in our neighborhood in Madina Khalifa South is wonderful. I ordered the Fendi Roma Boston Bag in pastel teal and received it same-day. The quality and packaging are truly boutique luxury.',
    rating: 5,
    dressPurchased: 'Fendi Roma Boston Bag in Pastel Teal',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: 'January 2026'
  },
  {
    id: 't-3',
    name: 'Reem Al-Sulaiti',
    location: 'The Pearl-Qatar',
    comment: 'The Louis Vuitton Speedy and Royal Kaftan Dress made our Eid celebration so memorable. Being able to message their stylist directly on WhatsApp at +974 7001 5100 made the entire purchase so seamless.',
    rating: 5,
    dressPurchased: 'Louis Vuitton Speedy 25 & Al-Rayyan Royal Kaftan',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    date: 'February 2026'
  }
];
