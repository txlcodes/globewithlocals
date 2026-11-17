import { Metadata } from 'next';
import ReviewClient from '@/components/ReviewClient';

export const metadata: Metadata = {
  title: 'Write a Review | GlobeWithLocals',
  robots: { index: false },
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function ReviewPage({ params }: Props) {
  const { token } = await params;
  return <ReviewClient token={token} />;
}
