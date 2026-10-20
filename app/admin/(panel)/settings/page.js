import { getSettings } from '@/lib/db';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
  return (
    <>
      <div className="admin-top"><h1>Store settings</h1></div>
      <SettingsForm initial={await getSettings()} />
    </>
  );
}
