const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' };

// Forerose rose mark. Petal lines are cut out with a mask so it works on any background.
export const RoseIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <mask id="rose-cut">
      <rect width="24" height="24" fill="#fff" />
      <g fill="none" stroke="#000" strokeWidth=".75" strokeLinecap="round">
        <path d="M8.6 6.6c.7 2.2 1.9 3.3 3.4 3.3s2.7-1.1 3.4-3.3" />
        <path d="M12 3.9c-1.1.8-1.6 1.9-1.4 2.9.2.9 1.1 1.3 1.9.9.7-.4.8-1.3.3-1.9" />
      </g>
    </mask>
    <g mask="url(#rose-cut)">
      <path d="M12 1.6c-1.5 1.4-3.2 1.6-4.6 1.2.1 1.8.6 3.5 1.7 4.6C7.5 7.5 6.3 6.9 5.4 5.8c-.5 3.6 1.4 6.4 4.6 7.2.6.1 1.3.2 2 .2s1.4-.1 2-.2c3.2-.8 5.1-3.6 4.6-7.2-.9 1.1-2.1 1.7-3.7 1.6 1.1-1.1 1.6-2.8 1.7-4.6-1.4.4-3.1.2-4.6-1.2z" />
    </g>
    <path d="M11.4 13.1h1.2v9.3h-1.2z" />
    <path d="M11.6 18.6c-2.6.4-4.6-.6-5.6-2.6 2.5-.6 4.6.2 5.6 2.6z" />
    <path d="M12.4 16.4c2.4.4 4.3-.5 5.3-2.4-2.4-.6-4.4.2-5.3 2.4z" />
  </svg>
);
export const BagIcon = (p) => (
  <svg {...base} {...p}><path d="M5.5 8h13l-1 12.5h-11L5.5 8z" /><path d="M9 10V7a3 3 0 0 1 6 0v3" /></svg>
);
export const BottleIcon = (p) => (
  <svg {...base} {...p}><rect x="6" y="10" width="12" height="11" rx="3" /><path d="M9.5 10V7.5h5V10M10 7.5V4h4v3.5" /><path d="M9 14h6" /></svg>
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
export const TruckIcon = (p) => (
  <svg {...base} {...p}><path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const PhoneIcon = (p) => (
  <svg {...base} {...p}><path d="M5 3h4l1.5 5-2.5 1.5a11 11 0 0 0 6.5 6.5L16 13.5l5 1.5v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
);
export const ShieldIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3 4.5 6v6c0 4.5 3.2 8 7.5 9 4.3-1 7.5-4.5 7.5-9V6L12 3z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></svg>
);
export const SparkleIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3c.6 4.2 2.6 6.4 7 7-4.4.6-6.4 2.8-7 7-.6-4.2-2.6-6.4-7-7 4.4-.6 6.4-2.8 7-7zM19 16c.3 1.6 1 2.4 2.5 2.6-1.5.3-2.2 1-2.5 2.6-.3-1.6-1-2.3-2.5-2.6 1.5-.2 2.2-1 2.5-2.6z" /></svg>
);
export const ClockIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const SprayIcon = (p) => (
  <svg {...base} {...p}><rect x="7" y="10" width="10" height="11" rx="2.5" /><path d="M10 10V7h4v3M12 7V5M15 5h2M18.5 3.5l1.5-1M18.5 6.5l1.5 1M19 5h2" /></svg>
);
export const CheckIcon = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const MenuIcon = (p) => (
  <svg {...base} {...p}><path d="M4 8h16M4 16h11" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const ArrowIcon = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.6-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.4-.9 2.2.1 1 .5 1.9 1.1 2.7 1.1 1.6 2.5 2.9 4.2 3.7.5.2 1 .4 1.4.5.6.2 1.2.1 1.7-.1.5-.3.9-.7 1.1-1.2.1-.3.1-.7 0-.9l-.8-.5z" />
  </svg>
);
