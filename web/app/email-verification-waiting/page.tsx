import { Metadata } from 'next';
import EmailWaitingClient from '@/components/EmailWaitingClient';

export const metadata: Metadata = {
  title: 'Email Verification | GlobeWithLocals',
  robots: { index: false },
};

export default function EmailWaitingPage() {
  return <EmailWaitingClient />;
}
