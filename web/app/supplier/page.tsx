import { Metadata } from 'next';
import { Suspense } from 'react';
import SupplierClient from '@/components/SupplierClient';

export const metadata: Metadata = {
  title: 'Become a Supplier | GlobeWithLocals',
  description: 'Join GlobeWithLocals as a tour supplier. Share your local expertise with travelers from around the world.',
  alternates: { canonical: 'https://www.globewithlocals.com/supplier' },
};

export default function SupplierPage() {
  return (
    <Suspense>
      <SupplierClient />
    </Suspense>
  );
}
