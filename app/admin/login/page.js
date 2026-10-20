'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Header';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: new FormData(e.currentTarget).get('password') }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Wrong password');
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <Logo />
        <p className="eyebrow" style={{ marginBottom: '2rem' }}>Admin portal</p>
        <div className="field" style={{ textAlign: 'left' }}>
          <label>Password</label>
          <input name="password" type="password" required autoFocus />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn block" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
