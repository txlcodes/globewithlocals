import { Metadata } from 'next';
import SafetyClient from '@/components/SafetyClient';

export const metadata: Metadata = {
  title: 'Safety Guidelines | GlobeWithLocals',
  description: 'Safety guidelines for travelers booking tours with GlobeWithLocals.',
  alternates: { canonical: 'https://www.globewithlocals.com/safety-guidelines' },
};

export default function SafetyPage() {
  return <SafetyClient />;
}
