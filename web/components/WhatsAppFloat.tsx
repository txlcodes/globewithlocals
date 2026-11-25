'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WA_NUMBER, waLink } from '@/lib/whatsapp';

// Pages where a "chat with us" button is noise (account, checkout, admin).
const HIDDEN = /^\/(admin|gwl-admin-panel|supplier|booking|payment-callback|verify-email|email-verification-waiting|review)/;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Floating WhatsApp button, mounted once in the root layout.
 *
 * The message carries the page title and URL so whoever answers knows which tour or city the
 * visitor asked about. The href is set after mount so server and browser render the same markup.
 * Each click is sent to GA4 as `whatsapp_click` so leads can be counted per page. On small
 * screens it sits above the "Book now" bar on tour pages.
 */
export default function WhatsAppFloat() {
  const path = usePathname() || '/';
  const [href, setHref] = useState(`https://wa.me/${WA_NUMBER}`);

  useEffect(() => {
    const title = document.title.replace(/\s*\|\s*GlobeWithLocals\s*$/i, '').trim();
    setHref(waLink(`Hi! I have a question about this page: ${title ? title + ' - ' : ''}${window.location.href}`));
  }, [path]);

  if (HIDDEN.test(path)) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => {
        try {
          window.gtag?.('event', 'whatsapp_click', { page_path: path });
        } catch {
          /* analytics must never block the chat */
        }
      }}
      className="fixed right-4 bottom-24 lg:bottom-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-colors hover:bg-[#1ebe5a]"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
      <span className="hidden text-sm font-bold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
