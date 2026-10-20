const now = Date.now();
const tester = (i, id, name, tagline, description, notes) => ({
  id, slug: id, name, tagline, description, notes,
  category: 'Testers', size: '5 ml tester',
  price: 699, comparePrice: 899, stock: 100,
  image: `/products/${id}.jpg`, gallery: [], featured: true, active: true,
  createdAt: now - i * 1000,
});

export const seedProducts = [
  {
    id: 'discovery-pack', slug: 'discovery-pack', name: 'Discovery Pack',
    tagline: '5 scents. 1 decision.',
    description:
      'Our full collection in a black gift box: Icone, Desire, Her, Soft Smoke and White Rose. Wear each one on your skin and find your signature scent. Travel friendly and good as a gift.',
    notes: { top: 'All five Forerose signatures', heart: '', base: '' },
    category: 'Sets', size: '5 × 5 ml', price: 2999, comparePrice: 3495, stock: 50,
    image: '/products/discovery-pack.jpg', gallery: ['/products/discovery-set.jpg'],
    featured: true, active: true, createdAt: now,
  },
  tester(1, 'icone', 'Icone', 'Bold, timeless, unforgettable',
    'A confident signature for those who lead. A fresh opening settles into a warm, woody trail that lasts all day.',
    { top: 'Bergamot, Pink Pepper', heart: 'Lavender, Geranium', base: 'Vetiver, Cedarwood' }),
  tester(2, 'desire', 'Desire', 'Warm, sensual, magnetic',
    'An amber scent with soft spice and a sweet base. Made for evenings and for leaving a lasting impression.',
    { top: 'Saffron, Mandarin', heart: 'Rose, Cinnamon', base: 'Amber, Vanilla, Musk' }),
  tester(3, 'her', 'Her', 'Soft, floral, feminine',
    'A bright floral bouquet with fresh berries and a soft musky base. Light and easy to wear every day.',
    { top: 'Red Berries, Pear', heart: 'Peony, Jasmine', base: 'White Musk, Praline' }),
  tester(4, 'soft-smoke', 'Soft Smoke', 'Smoky, mysterious, refined',
    'Soft incense and smooth woods with a hint of leather. A quiet scent for people who like depth.',
    { top: 'Black Pepper, Cardamom', heart: 'Incense, Leather', base: 'Oud, Sandalwood' }),
  tester(5, 'white-rose', 'White Rose', 'Pure, elegant, luminous',
    'A clean white rose with a soft powdery finish, inspired by fresh petals in the morning light.',
    { top: 'Lychee, Bergamot', heart: 'White Rose, Magnolia', base: 'Cashmere Musk, Iris' }),
];

export const defaultSettings = {
  currency: 'Rs',
  deliveryFee: 200,
  freeDeliveryOver: 3000,
  whatsapp: '',
  announcement: 'Cash on Delivery available nationwide • Free delivery on orders over Rs 3,000',
};
