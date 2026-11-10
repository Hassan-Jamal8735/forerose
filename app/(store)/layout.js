import Link from 'next/link';
import { CartProvider } from '@/components/CartProvider';
import Header, { Logo } from '@/components/Header';
import Reveal from '@/components/Reveal';
import { WhatsAppIcon } from '@/components/Icons';
import { getSettings } from '@/lib/db';
import { money } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function StoreLayout({ children }) {
  const settings = await getSettings();
  const wa = settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : '';
  const bits = (settings.announcement || '').split('•').map((s) => s.trim()).filter(Boolean);
  const ticker = [...bits, ...bits, ...bits, ...bits];

  return (
    <CartProvider currency={settings.currency} freeDeliveryOver={settings.freeDeliveryOver}>
      {bits.length > 0 && (
        <div className="announce" aria-label={settings.announcement}>
          <div className="announce-track" aria-hidden="true">
            {[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
      )}
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <p style={{ maxWidth: 340, marginTop: '1rem' }}>
                A note that you can feel. Five long-lasting eaux de parfum and a Discovery Pack to help you find your
                signature.
              </p>
              {wa && <a className="wa-btn" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon width={16} /> Chat on WhatsApp</a>}
            </div>
            <div>
              <h4>Shop</h4>
              <Link href="/#shop">All fragrances</Link>
              <Link href="/product/discovery-pack">Discovery Pack</Link>
              <Link href="/#finder">Scent finder</Link>
              <Link href="/cart">Your bag</Link>
            </div>
            <div>
              <h4>Help</h4>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#cod">How COD works</Link>
              <Link href="/checkout">Checkout</Link>
            </div>
            <div>
              <h4>Our promise</h4>
              <span className="fl">✦ Pay in cash at your door</span>
              {settings.freeDeliveryOver > 0 && (
                <span className="fl">✦ Free delivery over {money(settings.freeDeliveryOver, settings.currency)}</span>
              )}
              <span className="fl">✦ We call to confirm every order</span>
            </div>
          </div>
          <div className="footer-word" aria-hidden="true">forerose</div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Forerose. All rights reserved.</span>
            <span>www.forerose.com</span>
          </div>
        </div>
      </footer>
      {wa && (
        <a className="wa-float" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon /></a>
      )}
      <Reveal />
    </CartProvider>
  );
}
