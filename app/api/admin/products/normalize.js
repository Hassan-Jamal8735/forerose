const str = (v, max = 2000) => String(v ?? '').trim().slice(0, max);
const num = (v) => Math.max(0, Number(v) || 0);

export function normalizeProduct(b = {}) {
  return {
    name: str(b.name, 120),
    slug: str(b.slug, 120),
    tagline: str(b.tagline, 200),
    description: str(b.description),
    category: str(b.category, 60) || 'Testers',
    size: str(b.size, 60),
    price: num(b.price),
    comparePrice: num(b.comparePrice),
    stock: Math.floor(num(b.stock)),
    image: str(b.image, 1000),
    gallery: (Array.isArray(b.gallery) ? b.gallery : String(b.gallery || '').split('\n')).map((s) => str(s, 1000)).filter(Boolean),
    notes: { top: str(b.notes?.top, 200), heart: str(b.notes?.heart, 200), base: str(b.notes?.base, 200) },
    featured: !!b.featured,
    active: b.active !== false,
  };
}
