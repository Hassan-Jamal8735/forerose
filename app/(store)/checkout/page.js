import { getSettings } from '@/lib/db';
import CheckoutForm from './CheckoutForm';

export const metadata = { title: 'Checkout | Forerose' };

export default async function CheckoutPage() {
  const s = await getSettings();
  return <CheckoutForm currency={s.currency} deliveryFee={s.deliveryFee} freeDeliveryOver={s.freeDeliveryOver} />;
}
