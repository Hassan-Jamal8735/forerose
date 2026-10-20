const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' };

export const RoseIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5c-2.2 0-4.3 1.3-4.6 3.6-.2 1.9.9 3.6 2.6 4.4-.6-.9-.8-2-.4-3 .5-1.3 1.9-2.1 3.3-1.9-1 .4-1.7 1.3-1.7 2.4 0 1.4 1.1 2.5 2.5 2.5 1.6 0 2.8-1.4 2.6-3-.1-.6-.3-1.1-.7-1.6 1.3.5 2.1 1.9 1.8 3.4-.3 1.9-2 3.2-3.9 3.2h-1C9.5 12.5 7 10.4 6.6 7.6 5.7 8.7 5.4 10.3 6 11.8c.8 2.1 2.9 3.5 5.2 3.6v6.1h1.4v-4.2c1.2-.4 2.6-1.3 3.4-2.8-1.5.2-2.6.9-3.4 1.6v-.9c3.1-.4 5.4-3 5.4-6.1 0-2.9-2.6-6.6-6-6.6z" />
  </svg>
);
export const BagIcon = (p) => (
  <svg {...base} width="22" height="22" {...p}><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
);
export const BottleIcon = (p) => (
  <svg {...base} {...p}><rect x="7" y="9" width="10" height="12" rx="3" /><path d="M10 9V6h4v3M11 3h2v3h-2zM14 4h3" /></svg>
);
export const AwardIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="9" r="5" /><path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" /></svg>
);
export const LeafIcon = (p) => (
  <svg {...base} {...p}><path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z" /><path d="M5 19 13 11" /></svg>
);
export const GiftIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="9" width="18" height="12" rx="1" /><path d="M3 13h18M12 9v12M12 9C10 4 6 5 7.5 8c.6 1 4.5 1 4.5 1s3.9 0 4.5-1C18 5 14 4 12 9z" /></svg>
);
export const CashIcon = (p) => (
  <svg {...base} {...p}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 10v4M18 10v4" /></svg>
);
export const PlaneIcon = (p) => (
  <svg {...base} {...p}><path d="M2 14l8-2 4-8h2l-2 8 6 1 1-2h1.5l-1 4 1 4H21l-1-2-6 1 2 8h-2l-4-8-8-2z" /></svg>
);
