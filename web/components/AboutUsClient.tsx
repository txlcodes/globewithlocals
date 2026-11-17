'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Heart, Users, Code, Award, ShieldCheck, XCircle, CheckCircle } from 'lucide-react';
import StaticPageHeader from './StaticPageHeader';

export default function AboutUsClient() {
    return (
        <div className="min-h-screen bg-white">
            <StaticPageHeader />
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                            <Globe className="text-[#10B981]" size={32} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-[#001A33] mb-3">About GlobeWithLocals</h1>
                </div>

                <section className="mb-16">
                    <div className="bg-[#001A33] rounded-xl p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="text-[#10B981]" size={24} />
                            <h2 className="text-2xl font-black">Our Mission</h2>
                        </div>
                        <p className="text-lg font-semibold text-gray-100 leading-relaxed">To provide excellent experiences and local guides all over the world.</p>
                        <p className="text-base font-semibold text-gray-200 leading-relaxed mt-4">We curate bespoke travel experiences around the world, designed for discerning travelers who value comfort, culture, and genuine human connection. Our purpose is to offer premium, private, and culturally immersive tours, hosted by the finest local guides and storytellers.</p>
                    </div>
                </section>


                <section className="mb-16">
                    <div className="bg-gradient-to-br from-[#10B981]/5 to-[#059669]/10 rounded-xl p-8 border border-[#10B981]/20">
                        <h2 className="text-2xl font-black text-[#001A33] mb-6 text-center">Book With Confidence</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-14 h-14 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <XCircle className="text-[#10B981]" size={28} />
                                </div>
                                <h3 className="font-black text-[#001A33] mb-2">Free Cancellation</h3>
                                <p className="text-gray-600 font-semibold text-sm">Cancel up to 24 hours before your tour for a full refund. No questions asked.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-14 h-14 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ShieldCheck className="text-[#10B981]" size={28} />
                                </div>
                                <h3 className="font-black text-[#001A33] mb-2">Trusted & Verified</h3>
                                <p className="text-gray-600 font-semibold text-sm">All our local partners are personally vetted. Your safety is our priority.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-14 h-14 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle className="text-[#10B981]" size={28} />
                                </div>
                                <h3 className="font-black text-[#001A33] mb-2">Secure Payments</h3>
                                <p className="text-gray-600 font-semibold text-sm">100% secure checkout with encrypted transactions. Pay with confidence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl p-8 text-white">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div><div className="text-3xl font-black mb-1">18+</div><div className="text-sm font-semibold text-gray-100">Years</div></div>
                            <div><div className="text-3xl font-black mb-1">50+</div><div className="text-sm font-semibold text-gray-100">Employees</div></div>
                            <div><div className="text-3xl font-black mb-1">200+</div><div className="text-sm font-semibold text-gray-100">Cities</div></div>
                            <div><div className="text-3xl font-black mb-1">1000+</div><div className="text-sm font-semibold text-gray-100">Experiences</div></div>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-black text-[#001A33] mb-6">Our Team</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3"><Users className="text-[#10B981]" size={24} /><h3 className="text-lg font-black text-[#001A33]">50+ Employees</h3></div>
                            <p className="text-gray-700 font-semibold text-sm">Tour guides, customer service, operations, and support staff dedicated to exceptional travel experiences.</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3"><Code className="text-[#10B981]" size={24} /><h3 className="text-lg font-black text-[#001A33]">IT Engineers</h3></div>
                            <p className="text-gray-700 font-semibold text-sm">In-house team enhancing our platform with seamless booking, secure transactions, and innovative features.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-black text-[#001A33] mb-6">Why Choose Us</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4"><Heart className="text-[#10B981] flex-shrink-0 mt-1" size={20} /><div><h3 className="font-black text-[#001A33] mb-1">Premium Private Tours</h3><p className="text-gray-700 font-semibold text-sm">Culturally immersive experiences with personalized attention.</p></div></div>
                    </div>
                </section>

                <section className="mb-16">
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                        <h2 className="text-xl font-black text-[#001A33] mb-6 text-center">Contact Us</h2>
                        <div className="text-center mb-6">
                            <div><span className="text-3xl font-black text-[#10B981]">GlobeWithLocals</span></div>
                            <p className="text-gray-600 font-semibold mt-2">a unit of TajTourGuide</p>
                            <p className="text-gray-500 text-sm font-semibold mt-1">GSTIN: 09BPLPK5079QIZU</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 font-semibold">Registered Office: 118 Rani Bagh, Indirapuram, Agra, Uttar Pradesh, India</p>
                            <p className="text-gray-600 font-semibold mt-3">Phone / WhatsApp: +971521813249</p>
                            <p className="text-gray-600 font-semibold mt-3">Email: info@globewithlocals.com</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-[#001A33] rounded-xl p-8 text-white text-center">
                        <h2 className="text-2xl font-black mb-4">Join Our Community</h2>
                        <p className="text-gray-200 font-semibold mb-6">Whether you&apos;re a traveler or a guide, we&apos;d love to have you join GlobeWithLocals.</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/supplier" className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-6 py-2 rounded-lg transition-colors">Become a Guide</Link>
                            <Link href="/" className="bg-white/10 hover:bg-white/20 text-white font-black px-6 py-2 rounded-lg border border-white/20 transition-colors">Explore Tours</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
