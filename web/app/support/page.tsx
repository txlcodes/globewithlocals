import { Metadata } from 'next';
import SupportClient from '@/components/SupportClient';

export const metadata: Metadata = {
  title: 'Support | GlobeWithLocals',
  description: 'Get help and support for your GlobeWithLocals bookings and tours.',
  alternates: { canonical: 'https://globewithlocals.com/support' },
};

export default function SupportPage() {
  return <SupportClient />;
}
