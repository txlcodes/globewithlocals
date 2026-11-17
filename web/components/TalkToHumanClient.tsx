'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Mail, UserCheck, CalendarCheck, Users, MapPin, Languages, Accessibility, Clock3, ShieldCheck } from 'lucide-react';
import StaticPageHeader from './StaticPageHeader';

const WHATSAPP = 'https://wa.me/971521813249?text=' + encodeURIComponent('Hi, I have a question about a tour before I book.');

const QUESTIONS = [
  { icon: CalendarCheck, title: 'Is my date free?', text: 'Ask whether a tour runs on the day you want, and which start times are open.' },
  { icon: Users, title: 'Group size and kids', text: 'Tell us who is coming and we will tell you what fits, including private options for larger groups.' },
  { icon: MapPin, title: 'Meeting point and pickup', text: 'Ask where the tour starts, how to find the guide, and whether pickup is possible.' },
  { icon: Languages, title: 'Language', text: 'Check which languages a guide offers before you pick a date.' },
  { icon: Accessibility, title: 'Access and comfort', text: 'Walking distance, stairs, wheelchair or stroller access, food needs and anything else that matters to you.' },
  { icon: Clock3, title: 'Timing and plans', text: 'Arriving by train or ship, or short on time? Tell us and we will help you choose what fits.' },
];

export default function TalkToHumanClient() {
  return (
    <div className="min-h-screen bg-white">
      <StaticPageHeader />

      <section className="bg-[#001A33]">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <UserCheck className="text-[#10B981]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Talk to a real person, before you book</h1>
          <p className="text-gray-300 text-lg font-semibold max-w-2xl mx-auto">
            Every tour on GlobeWithLocals comes with a human you can message. No chatbot, no script, no need to book first. Ask anything about any tour and a person reads it and answers.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black rounded-full px-8 py-4 shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle size={20} />
              Message us on WhatsApp
            </a>
            <a
              href="mailto:support@globewithlocals.com"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black rounded-full px-8 py-4 border border-white/30 transition-all"
            >
              <Mail size={20} />
              Email support@globewithlocals.com
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-black text-[#001A33] mb-2">What you can ask</h2>
        <p className="text-gray-600 font-semibold mb-8">No question is too small. These are the things people ask most.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {QUESTIONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <Icon className="text-[#10B981]" size={20} />
                </div>
                <h3 className="font-black text-[#001A33] text-lg">{title}</h3>
              </div>
              <p className="text-gray-600 font-semibold">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-[#001A33] mt-14 mb-6">How it works</h2>
        <ol className="space-y-5">
          <li className="flex gap-4">
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#001A33] text-white font-black flex items-center justify-center">1</span>
            <p className="text-gray-700 font-semibold pt-1">Open any tour page and tap <strong>Ask a real person</strong>. Your message already names the tour, so you do not have to explain.</p>
          </li>
          <li className="flex gap-4">
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#001A33] text-white font-black flex items-center justify-center">2</span>
            <p className="text-gray-700 font-semibold pt-1">A person on our team reads it and replies on WhatsApp or by email. Please tell us your dates and group size if you have them.</p>
          </li>
          <li className="flex gap-4">
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#001A33] text-white font-black flex items-center justify-center">3</span>
            <p className="text-gray-700 font-semibold pt-1">Book when you are happy, or do not book at all. Asking costs nothing and does not oblige you to anything.</p>
          </li>
        </ol>

        <div className="mt-14 bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="text-[#10B981]" size={26} />
            <h2 className="text-2xl font-black text-[#001A33]">Our promise</h2>
          </div>
          <ul className="space-y-2 text-gray-700 font-semibold list-disc pl-6">
            <li>Your message is read and answered by a person, not an automated reply.</li>
            <li>We tell you plainly when a date is not available or a tour is not right for you.</li>
            <li>If you message outside local daytime hours, we reply as soon as we are back online.</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="inline-block bg-[#10B981] hover:bg-[#0E9F6E] text-white font-black rounded-full px-8 py-4 transition-all">
            Browse tours
          </Link>
          <p className="text-gray-500 font-semibold text-sm mt-4">
            Already booked? See <Link href="/support" className="text-[#10B981] hover:underline">Support</Link> for help with an existing booking.
          </p>
        </div>
      </div>
    </div>
  );
}
