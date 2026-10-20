import Link from 'next/link';
import { CartProvider } from '@/components/CartProvider';
import Header, { Logo } from '@/components/Header';
import { getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function StoreLayout({ children }) {
  const settings = await getSettings();
  return (
    <CartProvider>
      {settings.announcement && <div className="announce">{settings.announcement}</div>}
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <div>
            <Logo />
            <p style={{ maxWidth: 340, marginTop: '1rem' }}>
              A note that you can feel. Premium perfume testers so you can find your signature scent.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <Link href="/#shop">All fragrances</Link>
            <Link href="/product/discovery-pack">Discovery Pack</Link>
            <Link href="/cart">Your bag</Link>
          </div>
          <div>
            <h4>Help</h4>
            <span style={{ display: 'block', marginBottom: '0.4rem' }}>Cash on Delivery</span>
            {settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}>WhatsApp us</a>}
            <span>www.forerose.com</span>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Forerose. All rights reserved.</div>
      </footer>
    </CartProvider>
  );
}
