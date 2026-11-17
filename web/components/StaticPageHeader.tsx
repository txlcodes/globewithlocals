'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LanguageSwitcher, { useLanguage } from './LanguageSwitcher';

export default function StaticPageHeader() {
    const router = useRouter();
    const { t } = useLanguage();
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto h-24 sm:h-28 md:h-32 flex items-center justify-between px-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#001A33] font-semibold hover:text-[#10B981] transition-colors"
                >
                    <ArrowLeft size={18} />
                    {t.back}
                </button>
                <Link href="/" className="flex items-center h-full">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#001A33]">GlobeWithLocals</span>
                </Link>
                <LanguageSwitcher />
            </div>
        </header>
    );
}
