'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { RoseIcon, BagIcon, MenuIcon, CloseIcon } from './Icons';

export function Logo() {
  return (
    <span className="logo">
      <RoseIcon /> forerose
    </span>
  );
}

const LINKS = [
  ['/#shop', 'Shop'],
  ['/#finder', 'Scent finder'],
  ['/product/discovery-pack', 'Discovery Pack'],
  ['/#faq', 'Help'],
];

export default function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            {LINKS.slice(0, 2).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <button className="icon-btn menu-btn" onClick={() => setMenu(true)} aria-label="Open menu"><MenuIcon /></button>
          <Link href="/" className="logo-link" aria-label="Forerose home"><Logo /></Link>
          <div className="header-actions">
            <nav className="nav" style={{ marginRight: '1rem' }}>
              {LINKS.slice(2).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
            <button className="icon-btn" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
              <BagIcon />
              {count > 0 && <span className="cart-count" key={count}>{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-nav${menu ? ' open' : ''}`} aria-hidden={!menu}>
        <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Close menu"><CloseIcon /></button>
        {LINKS.map(([href, label]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}</Link>)}
        <Link href="/cart" onClick={() => setMenu(false)}>Your bag ({count})</Link>
        <span className="eyebrow">Cash on Delivery nationwide</span>
      </div>
    </>
  );
}
