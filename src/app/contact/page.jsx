'use client'

import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
        alert("Thank you! Your message has been received.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-16 px-4">
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-5">
                
                {/* Contact Info (Left - 2 Columns) */}
                <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                            Get in Touch
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm leading-relaxed">
                            Have questions about a product, stock, or payments? Fill out the form and our help desk support team will reach out within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">
                                📍
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-neutral-400">Office Location</p>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Khulna, Bangladesh</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">
                                ✉️
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-neutral-400">Support Email</p>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">support@marketplace.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Card (Right - 3 Columns) */}
                <div className="md:col-span-3 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-yellow-400 dark:focus:border-yellow-500 outline-none transition duration-200 text-neutral-900 dark:text-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-yellow-400 dark:focus:border-yellow-500 outline-none transition duration-200 text-neutral-900 dark:text-white"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                                Message
                            </label>
                            <textarea
                                required
                                rows="4"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-yellow-400 dark:focus:border-yellow-500 outline-none transition duration-200 text-neutral-900 dark:text-white resize-none"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 font-bold text-black text-sm tracking-wide transition-colors duration-200 shadow-sm"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}