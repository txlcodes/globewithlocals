import { Metadata } from 'next';
import VerifyEmailClient from '@/components/VerifyEmailClient';

export const metadata: Metadata = {
  title: 'Verify Email | GlobeWithLocals',
  robots: { index: false },
};

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
