import { scentOf } from '@/lib/scents';

export function Notes({ notes }) {
  const n = notes || {};
  if (!n.top && !n.heart && !n.base) return null;
  return (
    <div className="notes-tiers">
      {n.top && <div><b>Top</b><span>{n.top}</span></div>}
      {n.heart && <div><b>Heart</b><span>{n.heart}</span></div>}
      {n.base && <div><b>Base</b><span>{n.base}</span></div>}
    </div>
  );
}

export function ProfileBars({ product }) {
  const p = scentOf(product).profile;
  const rows = [['Intensity', p.intensity], ['Longevity', p.longevity], ['Projection', p.sillage]];
  return (
    <div className="profile">
      {rows.map(([label, v]) => (
        <div className="profile-row" key={label}>
          <span>{label}</span>
          <div className="bar" aria-label={`${label} ${v} of 5`}>
            {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= v ? 'on' : ''} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Mood({ product }) {
  return (
    <div className="chips">
      {scentOf(product).mood.map((m) => <span className="chip" key={m}>{m}</span>)}
    </div>
  );
}
