'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { RoseIcon, BagIcon } from './Icons';

export function Logo() {
  return (
    <span className="logo">
      <RoseIcon /> forerose
    </span>
  );
}

export default function Header() {
  const { count } = useCart();
  return (
    <header className="header">
      <div className="container">
        <Link href="/"><Logo /></Link>
        <nav className="nav">
          <Link href="/#shop">Shop</Link>
          <Link href="/product/discovery-pack" className="hide-sm">Discovery Pack</Link>
          <Link href="/cart" className="cart-link" aria-label="Cart">
            <BagIcon />
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
