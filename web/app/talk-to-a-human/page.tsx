import { Metadata } from 'next';
import TalkToHumanClient from '@/components/TalkToHumanClient';

export const metadata: Metadata = {
  title: 'Talk to a Real Person Before You Book | GlobeWithLocals',
  description: 'Message a real person about any tour before you book. No chatbot, no obligation. Ask about dates, meeting points, languages and group size.',
  alternates: { canonical: 'https://globewithlocals.com/talk-to-a-human' },
};

export default function TalkToAHumanPage() {
  return <TalkToHumanClient />;
}
