import { Metadata } from 'next';
import WhyGlobeWithLocalsClient from '@/components/WhyGlobeWithLocalsClient';

export const metadata: Metadata = {
  title: 'What We Do Best | GlobeWithLocals',
  description: 'The full range of tours across Europe, local operators who confirm your place, fair group pricing and a real person to talk to before you book.',
  alternates: { canonical: 'https://www.globewithlocals.com/what-we-do-best' },
};

export default function WhatWeDoBestPage() {
  return <WhyGlobeWithLocalsClient />;
}
