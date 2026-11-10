import { Cormorant_Garamond, Montserrat, Great_Vibes } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-serif' });
const sans = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });
const script = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-script' });

export const metadata = {
  title: 'Forerose: Find Your Signature Scent',
  description: 'Premium perfume testers and the Forerose Discovery Pack. Cash on Delivery available.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Only hide scroll-reveal content when JavaScript is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
