const now = Date.now();
const perfume = (i, id, name, tagline, description, notes) => ({
  id, slug: id, name, tagline, description, notes,
  category: 'Eau de Parfum', size: '100 ml',
  price: 3499, comparePrice: 4499, stock: 50,
  image: `/products/${id}-edp.jpg`, gallery: [`/products/${id}-bottle.jpg`], featured: true, active: true,
  createdAt: now - i * 1000,
});

export const seedProducts = [
  perfume(1, 'icone', 'Icone', 'Bold, timeless, unforgettable',
    'A confident signature for those who lead. A fresh opening settles into a warm, woody trail that lasts all day.',
    { top: 'Bergamot, Pink Pepper', heart: 'Lavender, Geranium', base: 'Vetiver, Cedarwood' }),
  perfume(2, 'desire', 'Desire', 'Warm, sensual, magnetic',
    'An amber scent with soft spice and a sweet base. Made for evenings and for leaving a lasting impression.',
    { top: 'Saffron, Mandarin', heart: 'Rose, Cinnamon', base: 'Amber, Vanilla, Musk' }),
  perfume(3, 'her', 'Her', 'Soft, floral, feminine',
    'A bright floral bouquet with fresh berries and a soft musky base. Light and easy to wear every day.',
    { top: 'Red Berries, Pear', heart: 'Peony, Jasmine', base: 'White Musk, Praline' }),
  perfume(4, 'soft-smoke', 'Soft Smoke', 'Smoky, mysterious, refined',
    'Soft incense and smooth woods with a hint of leather. A quiet scent for people who like depth.',
    { top: 'Black Pepper, Cardamom', heart: 'Incense, Leather', base: 'Oud, Sandalwood' }),
  perfume(5, 'white-rose', 'White Rose', 'Pure, elegant, luminous',
    'A clean white rose with a soft powdery finish, inspired by fresh petals in the morning light.',
    { top: 'Lychee, Bergamot', heart: 'White Rose, Magnolia', base: 'Cashmere Musk, Iris' }),
  {
    id: 'discovery-pack', slug: 'discovery-pack', name: 'Discovery Pack',
    tagline: '5 scents. 1 decision.',
    description:
      'All five Forerose scents as 5 ml testers in a black gift box: Icone, Desire, Her, Soft Smoke and White Rose. Wear each one on your skin, then choose your full-size bottle. Travel friendly and good as a gift.',
    notes: { top: '', heart: '', base: '' },
    category: 'Tester Box', size: '5 × 5 ml testers', price: 1499, comparePrice: 1999, stock: 50,
    image: '/products/discovery-pack.jpg', gallery: ['/products/discovery-set.jpg', '/products/testers-banner.jpg'],
    featured: true, active: true, createdAt: now - 10_000,
  },
];

export const isSet = (p) => /set|box|pack|tester/i.test(p?.category || '');

export const defaultSettings = {
  currency: 'Rs',
  deliveryFee: 200,
  freeDeliveryOver: 3000,
  whatsapp: '',
  announcement: 'Cash on Delivery nationwide • Free delivery on orders over Rs 3,000',
};
