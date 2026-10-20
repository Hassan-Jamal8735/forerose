'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const empty = {
  name: '', tagline: '', description: '', category: 'Testers', size: '5 ml tester',
  price: 0, comparePrice: 0, stock: 0, image: '', gallery: [], notes: { top: '', heart: '', base: '' },
  featured: false, active: true,
};

export default function ProductForm({ product }) {
  const router = useRouter();
  const [p, setP] = useState(product || empty);
  const [gallery, setGallery] = useState((product?.gallery || []).join('\n'));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setP({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const setNote = (k) => (e) => setP({ ...p, notes: { ...p.notes, [k]: e.target.value } });

  async function upload(e, target) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) return setError(data.error || 'Upload failed');
    if (target === 'image') setP((cur) => ({ ...cur, image: data.url }));
    else setGallery((g) => (g ? g + '\n' : '') + data.url);
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch(product ? `/api/admin/products/${product.id}` : '/api/admin/products', {
      method: product ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, gallery }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setError(data.error || 'Could not save');
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="row2">
        <div className="field"><label>Name *</label><input value={p.name} onChange={set('name')} required /></div>
        <div className="field"><label>Tagline</label><input value={p.tagline} onChange={set('tagline')} /></div>
      </div>
      <div className="field"><label>Description</label><textarea rows={4} value={p.description} onChange={set('description')} /></div>
      <div className="row2">
        <div className="field">
          <label>Category</label>
          <input value={p.category} onChange={set('category')} list="cats" />
          <datalist id="cats"><option value="Testers" /><option value="Sets" /><option value="Full size" /></datalist>
        </div>
        <div className="field"><label>Size</label><input value={p.size} onChange={set('size')} /></div>
      </div>
      <div className="row2">
        <div className="field"><label>Price *</label><input type="number" min="0" value={p.price} onChange={set('price')} required /></div>
        <div className="field"><label>Compare-at price (shows as sale)</label><input type="number" min="0" value={p.comparePrice} onChange={set('comparePrice')} /></div>
      </div>
      <div className="row2">
        <div className="field"><label>Stock *</label><input type="number" min="0" value={p.stock} onChange={set('stock')} required /></div>
        <div />
      </div>

      <div className="field">
        <label>Main image</label>
        <input value={p.image} onChange={set('image')} placeholder="Image URL, or upload below" />
        <input type="file" accept="image/*" onChange={(e) => upload(e, 'image')} />
        {p.image && <img src={p.image} alt="" className="img-preview" />}
      </div>
      <div className="field">
        <label>Extra images (one URL per line)</label>
        <textarea rows={2} value={gallery} onChange={(e) => setGallery(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => upload(e, 'gallery')} />
      </div>
      {uploading && <p className="muted">Uploading…</p>}

      <h3 style={{ marginTop: '1rem' }}>Fragrance notes</h3>
      <div className="row2">
        <div className="field"><label>Top</label><input value={p.notes?.top || ''} onChange={setNote('top')} /></div>
        <div className="field"><label>Heart</label><input value={p.notes?.heart || ''} onChange={setNote('heart')} /></div>
      </div>
      <div className="field"><label>Base</label><input value={p.notes?.base || ''} onChange={setNote('base')} /></div>

      <div className="check-row">
        <label><input type="checkbox" checked={p.active} onChange={set('active')} /> Visible in store</label>
        <label><input type="checkbox" checked={p.featured} onChange={set('featured')} /> Featured</label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button className="btn" disabled={busy || uploading}>{busy ? 'Saving…' : product ? 'Save changes' : 'Create product'}</button>
        <button type="button" className="btn outline" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  );
}
