import { Metadata } from 'next';
import TermsClient from '@/components/TermsClient';

export const metadata: Metadata = {
  title: 'Terms and Conditions | GlobeWithLocals',
  description: 'GlobeWithLocals terms and conditions for using our platform and booking tours.',
  alternates: { canonical: 'https://globewithlocals.com/terms-and-conditions' },
};

export default function TermsPage() {
  return <TermsClient />;
}
