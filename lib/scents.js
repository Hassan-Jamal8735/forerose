// Look-and-feel data for each scent (colours, scent family, profile bars).
// Products added from the admin that aren't listed here use FALLBACK.
export const SCENTS = {
  icone: {
    liquid: '#e6d1a0', tint: '#ebe3d4', family: 'Woody',
    mood: ['Confident', 'Fresh', 'Day to night'],
    profile: { intensity: 4, longevity: 4, sillage: 4 },
  },
  desire: {
    liquid: '#d4954a', tint: '#eedcc4', family: 'Amber',
    mood: ['Sensual', 'Warm', 'Evening'],
    profile: { intensity: 5, longevity: 5, sillage: 4 },
  },
  her: {
    liquid: '#f09aae', tint: '#f4dfe3', family: 'Floral',
    mood: ['Romantic', 'Playful', 'Everyday'],
    profile: { intensity: 3, longevity: 4, sillage: 3 },
  },
  'soft-smoke': {
    liquid: '#a67550', tint: '#ddd3c9', family: 'Smoky',
    mood: ['Mysterious', 'Refined', 'Night'],
    profile: { intensity: 5, longevity: 5, sillage: 5 },
  },
  'white-rose': {
    liquid: '#f0e2d8', tint: '#f2ece8', family: 'Floral',
    mood: ['Clean', 'Elegant', 'Office'],
    profile: { intensity: 3, longevity: 3, sillage: 3 },
  },
};

export const FALLBACK = {
  liquid: '#e2cfa8', tint: '#ece5de', family: 'Signature',
  mood: ['Long lasting', 'Versatile'],
  profile: { intensity: 4, longevity: 4, sillage: 4 },
};

export const scentOf = (p) => SCENTS[p?.slug] || SCENTS[p?.id] || FALLBACK;

export const FAMILIES = [
  { key: 'all', label: 'All scents', blurb: 'The full Forerose wardrobe.' },
  { key: 'Woody', label: 'Woody & Fresh', blurb: 'Crisp citrus over clean woods. Easy to wear anywhere.' },
  { key: 'Floral', label: 'Floral', blurb: 'Petals, berries and soft musk. Light and pretty.' },
  { key: 'Amber', label: 'Warm & Amber', blurb: 'Spice, amber and vanilla for evenings out.' },
  { key: 'Smoky', label: 'Smoky & Deep', blurb: 'Incense, leather and oud for people who like depth.' },
];
