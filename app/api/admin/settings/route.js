import { isAdmin, unauthorized } from '@/lib/auth';
import { saveSettings } from '@/lib/db';

export async function PUT(req) {
  if (!(await isAdmin())) return unauthorized();
  const b = await req.json();
  const settings = {
    currency: String(b.currency || 'Rs').slice(0, 8),
    deliveryFee: Math.max(0, Number(b.deliveryFee) || 0),
    freeDeliveryOver: Math.max(0, Number(b.freeDeliveryOver) || 0),
    whatsapp: String(b.whatsapp || '').slice(0, 30),
    announcement: String(b.announcement || '').slice(0, 200),
  };
  return Response.json(await saveSettings(settings));
}
