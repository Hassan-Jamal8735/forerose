// Draws the Forerose bottle + tube box for every scent and saves product photos.
// Run: node scripts/render-bottles.mjs
import sharp from 'sharp';
import { SCENTS } from '../lib/scents.js';

const NAMES = { icone: 'Icone', desire: 'Desire', her: 'Her', 'soft-smoke': 'Soft Smoke', 'white-rose': 'White Rose' };
// Rose mark in a 24 × 24 box; `bg` colours the petal lines
const ROSE_FILL =
  '<path d="M12 1.6c-1.5 1.4-3.2 1.6-4.6 1.2.1 1.8.6 3.5 1.7 4.6C7.5 7.5 6.3 6.9 5.4 5.8c-.5 3.6 1.4 6.4 4.6 7.2.6.1 1.3.2 2 .2s1.4-.1 2-.2c3.2-.8 5.1-3.6 4.6-7.2-.9 1.1-2.1 1.7-3.7 1.6 1.1-1.1 1.6-2.8 1.7-4.6-1.4.4-3.1.2-4.6-1.2z"/><path d="M11.4 13.1h1.2v9.3h-1.2z"/><path d="M11.6 18.6c-2.6.4-4.6-.6-5.6-2.6 2.5-.6 4.6.2 5.6 2.6z"/><path d="M12.4 16.4c2.4.4 4.3-.5 5.3-2.4-2.4-.6-4.4.2-5.3 2.4z"/>';
const rose = (x, y, scale, fill, bg) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><g fill="${fill}">${ROSE_FILL}</g><g fill="none" stroke="${bg}" stroke-width=".7" stroke-linecap="round"><path d="M8.6 6.6c.7 2.2 1.9 3.3 3.4 3.3s2.7-1.1 3.4-3.3"/><path d="M12 3.9c-1.1.8-1.6 1.9-1.4 2.9.2.9 1.1 1.3 1.9.9.7-.4.8-1.3.3-1.9"/></g></g>`;
const SERIF = "'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif";
const SANS = "'Montserrat', 'Segoe UI', Arial, sans-serif";

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// Bottle in a 300 × 430 box
function bottle(id, liquid) {
  const name = NAMES[id].toUpperCase();
  const size = Math.min(32, 230 / (name.length * 0.82));
  const k = id;
  return `
  <defs>
    <linearGradient id="cap-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="#050505"/><stop offset=".22" stop-color="#2c2c2c"/>
      <stop offset=".34" stop-color="#121212"/><stop offset=".78" stop-color="#0a0a0a"/>
      <stop offset=".9" stop-color="#2a2a2a"/><stop offset="1" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="metal-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="#7d7d7d"/><stop offset=".25" stop-color="#f2f2f2"/>
      <stop offset=".5" stop-color="#a4a4a4"/><stop offset=".75" stop-color="#e9e9e9"/><stop offset="1" stop-color="#6e6e6e"/>
    </linearGradient>
    <linearGradient id="liq-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="${shade(liquid, -0.28)}"/><stop offset=".18" stop-color="${shade(liquid, 0.25)}"/>
      <stop offset=".5" stop-color="${liquid}"/><stop offset=".85" stop-color="${shade(liquid, -0.12)}"/>
      <stop offset="1" stop-color="${shade(liquid, -0.35)}"/>
    </linearGradient>
    <linearGradient id="liqv-${k}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".12"/>
    </linearGradient>
    <linearGradient id="glass-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".1" stop-color="#fff" stop-opacity=".15"/>
      <stop offset=".9" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/>
    </linearGradient>
    <linearGradient id="hl-${k}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".25" stop-color="#fff" stop-opacity=".85"/>
      <stop offset=".8" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="inner-${k}">
      <path d="M44 232 Q44 180 90 175 L210 175 Q256 180 256 232 L256 392 Q256 400 248 400 L52 400 Q44 400 44 392 Z"/>
    </clipPath>
  </defs>
  <!-- body glass -->
  <path d="M30 215 Q30 163 82 158 L218 158 Q270 163 270 215 L270 402 Q270 430 242 430 L58 430 Q30 430 30 402 Z"
        fill="${shade(liquid, 0.55)}" fill-opacity=".45" stroke="#000" stroke-opacity=".14" stroke-width="1.5"/>
  <!-- liquid -->
  <g clip-path="url(#inner-${k})">
    <rect x="40" y="200" width="220" height="205" fill="url(#liq-${k})"/>
    <rect x="40" y="200" width="220" height="205" fill="url(#liqv-${k})"/>
    <ellipse cx="150" cy="200" rx="108" ry="4" fill="${shade(liquid, 0.45)}"/>
  </g>
  <!-- thick glass base -->
  <path d="M34 401 L266 401 L266 404 Q266 426 242 426 L58 426 Q34 426 34 404 Z" fill="${shade(liquid, 0.35)}" fill-opacity=".55"/>
  <path d="M44 401 L256 401" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
  <!-- dip tube -->
  <line x1="150" y1="158" x2="150" y2="396" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>
  <!-- glass sheen -->
  <path d="M30 215 Q30 163 82 158 L218 158 Q270 163 270 215 L270 402 Q270 430 242 430 L58 430 Q30 430 30 402 Z" fill="url(#glass-${k})"/>
  <rect x="47" y="196" width="13" height="196" rx="6.5" fill="url(#hl-${k})"/>
  <rect x="240" y="210" width="5" height="170" rx="2.5" fill="url(#hl-${k})" opacity=".6"/>
  <path d="M58 180 Q70 168 96 166" stroke="#fff" stroke-opacity=".8" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- neck + collar -->
  <rect x="104" y="138" width="92" height="22" fill="${shade(liquid, 0.6)}" fill-opacity=".6" stroke="#000" stroke-opacity=".1"/>
  <rect x="94" y="118" width="112" height="24" rx="2" fill="url(#metal-${k})"/>
  <rect x="94" y="118" width="112" height="3" fill="#fff" fill-opacity=".6"/>
  <!-- cap -->
  <rect x="80" y="0" width="140" height="122" rx="7" fill="url(#cap-${k})"/>
  <rect x="80" y="0" width="140" height="8" rx="4" fill="#3a3a3a"/>
  <rect x="104" y="10" width="7" height="104" rx="3.5" fill="#fff" fill-opacity=".14"/>
  ${rose(131, 36, 1.6, '#5a5a5a', '#111')}
  <!-- label printed on glass -->
  <text x="150" y="292" text-anchor="middle" font-family="${SERIF}" font-weight="600" font-size="${size.toFixed(1)}" letter-spacing="3" fill="#161412">${name}</text>
  <line x1="122" y1="306" x2="178" y2="306" stroke="#161412" stroke-opacity=".5" stroke-width="1"/>
  <text x="150" y="326" text-anchor="middle" font-family="${SANS}" font-weight="600" font-size="11" letter-spacing="6" fill="#2a2522" fill-opacity=".75">FOREROSE</text>
  <text x="150" y="344" text-anchor="middle" font-family="${SANS}" font-size="7.5" letter-spacing="3" fill="#2a2522" fill-opacity=".6">EAU DE PARFUM · 100 ML</text>`;
}

// Tube box in a 230 × 540 box
function box(id) {
  const name = NAMES[id].toUpperCase();
  const size = Math.min(24, 180 / (name.length * 0.8));
  const k = id;
  return `
  <defs>
    <linearGradient id="tube-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="#cfcac4"/><stop offset=".12" stop-color="#ebe8e4"/>
      <stop offset=".38" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1eeea"/><stop offset="1" stop-color="#bfb9b2"/>
    </linearGradient>
    <linearGradient id="ring-${k}" x1="0" x2="1">
      <stop offset="0" stop-color="#6f6f6f"/><stop offset=".3" stop-color="#e6e6e6"/>
      <stop offset=".6" stop-color="#9c9c9c"/><stop offset="1" stop-color="#5e5e5e"/>
    </linearGradient>
  </defs>
  <rect x="0" y="16" width="230" height="510" fill="url(#tube-${k})"/>
  <ellipse cx="115" cy="526" rx="115" ry="14" fill="url(#tube-${k})"/>
  <rect x="0" y="16" width="230" height="22" fill="url(#ring-${k})"/>
  <ellipse cx="115" cy="16" rx="115" ry="14" fill="#9a9a9a"/>
  <ellipse cx="115" cy="16" rx="108" ry="12" fill="#ededeb"/>
  <ellipse cx="115" cy="17" rx="70" ry="7.5" fill="none" stroke="#bdbdbd" stroke-width="1.5"/>
  <rect x="0" y="38" width="230" height="1.5" fill="#000" fill-opacity=".12"/>
  ${rose(89, 168, 2.2, '#151311', '#fbfaf8')}
  <text x="115" y="268" text-anchor="middle" font-family="${SANS}" font-weight="600" font-size="27" fill="#151311">forerose</text>
  <text x="115" y="330" text-anchor="middle" font-family="${SERIF}" font-weight="600" font-size="${size.toFixed(1)}" letter-spacing="3" fill="#151311">${name}</text>
  <text x="115" y="352" text-anchor="middle" font-family="${SANS}" font-size="8" letter-spacing="3.5" fill="#151311" fill-opacity=".6">EAU DE PARFUM</text>
  <text x="115" y="500" text-anchor="middle" font-family="${SANS}" font-size="7.5" letter-spacing="3" fill="#151311" fill-opacity=".45">100 ML · 3.4 FL.OZ</text>`;
}

const blur = (id, sd) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

function scene(id, { liquid, tint }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3eee8"/><stop offset="1" stop-color="${shade(tint, -0.04)}"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(tint, -0.05)}"/><stop offset="1" stop-color="${shade(tint, 0.25)}"/>
    </linearGradient>
    <radialGradient id="light" cx=".3" cy=".25" r=".6">
      <stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    ${blur('b40', 40)}${blur('b18', 18)}${blur('b8', 8)}${blur('b3', 3)}
  </defs>
  <rect width="1200" height="1200" fill="url(#wall)"/>
  <rect y="880" width="1200" height="320" fill="url(#floor)"/>
  <rect y="870" width="1200" height="24" fill="#fff" opacity=".35" filter="url(#b8)"/>
  <rect width="1200" height="1200" fill="url(#light)"/>
  <g opacity=".07" filter="url(#b18)" fill="#3b2a1c">
    <ellipse cx="1050" cy="160" rx="260" ry="34" transform="rotate(-28 1050 160)"/>
    <ellipse cx="980" cy="330" rx="200" ry="26" transform="rotate(-28 980 330)"/>
    <ellipse cx="160" cy="980" rx="280" ry="30" transform="rotate(-20 160 980)"/>
  </g>
  <ellipse cx="840" cy="1000" rx="190" ry="26" fill="#2b1d12" opacity=".28" filter="url(#b18)"/>
  <ellipse cx="490" cy="1018" rx="230" ry="30" fill="#2b1d12" opacity=".32" filter="url(#b18)"/>
  <ellipse cx="490" cy="1050" rx="200" ry="34" fill="${liquid}" opacity=".35" filter="url(#b40)"/>
  <g transform="translate(690 300) scale(1.3)">${box(id)}</g>
  <g transform="translate(295 440) scale(1.3)">${bottle(id, liquid)}</g>
</svg>`;
}

function solo(id, { liquid, tint }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <radialGradient id="bg" cx=".5" cy=".4" r=".75">
      <stop offset="0" stop-color="${shade(tint, 0.45)}"/><stop offset="1" stop-color="${shade(tint, -0.06)}"/>
    </radialGradient>
    ${blur('b40', 40)}${blur('b18', 18)}
  </defs>
  <rect width="1200" height="1200" fill="url(#bg)"/>
  <ellipse cx="600" cy="1000" rx="270" ry="32" fill="#2b1d12" opacity=".3" filter="url(#b18)"/>
  <ellipse cx="600" cy="1030" rx="250" ry="40" fill="${liquid}" opacity=".45" filter="url(#b40)"/>
  <g transform="translate(345 262) scale(1.7)">${bottle(id, liquid)}</g>
</svg>`;
}

const cut = (id, { liquid }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="900" viewBox="0 0 640 900">
  <g transform="translate(20 0) scale(2)">${bottle(id, liquid)}</g></svg>`;

for (const id of Object.keys(NAMES)) {
  const s = SCENTS[id];
  await sharp(Buffer.from(scene(id, s))).jpeg({ quality: 90, mozjpeg: true }).toFile(`public/products/${id}-edp.jpg`);
  await sharp(Buffer.from(solo(id, s))).jpeg({ quality: 90, mozjpeg: true }).toFile(`public/products/${id}-bottle.jpg`);
  await sharp(Buffer.from(cut(id, s))).png({ compressionLevel: 9 }).toFile(`public/products/${id}-cut.png`);
  console.log('rendered', id);
}
