'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="btn small outline"
      style={{ color: 'var(--stone)', borderColor: '#555' }}
      onClick={async () => {
        await fetch('/api/admin/login', { method: 'DELETE' });
        router.push('/admin/login');
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
