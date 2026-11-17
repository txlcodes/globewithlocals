import { Metadata } from 'next';
import AboutUsClient from '@/components/AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | GlobeWithLocals',
  description: 'Learn about GlobeWithLocals - empowering local experts around the world to share their home cities directly with curious travelers.',
  alternates: { canonical: 'https://globewithlocals.com/about-us' },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
