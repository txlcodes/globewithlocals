'use client';
import { usePathname } from 'next/navigation';
import { waLink } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  const path = usePathname() || '/';
  if (/^\/(admin|gwl-admin-panel|supplier|booking|payment-callback)/.test(path)) return null;
  const msg = `Hi, I have a question about ${typeof window !== 'undefined' ? window.location.href : 'GlobeWithLocals'}`;
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg hover:brightness-95">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
