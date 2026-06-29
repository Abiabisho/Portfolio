'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // መልዕክቱ በስኬት መላኩን ለማሳየት
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setSubmitted(false);
            alert('📩 መልዕክትዎ በስኬት ደርሶናል። በቅርቡ እናገኝዎታለን!');
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl transition-colors duration-300">
            <div className="text-center space-y-2 mb-12">
                <h2 className="text-3xl font-black text-[#1F3864] dark:text-amber-400">Contact Us</h2>
                <p className="text-sm text-gray-400">ማንኛውም ጥያቄ ወይም አስተያየት ካለዎት ይፃፉልን፤ እኛ ሁልጊዜ ዝግጁ ነን!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 1. የሱቁ አድራሻ እና መረጃዎች (Contact Info) */}
                <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">Our Store Info</h3>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl bg-blue-50 p-2.5 rounded-xl dark:bg-gray-700">📍</span>
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Address</p>
                                <p className="text-gray-400 text-xs">Addis Ababa, Ethiopia (Bole Road)</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl bg-amber-50 p-2.5 rounded-xl dark:bg-gray-700">📞</span>
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Phone Number</p>
                                <p className="text-gray-400 text-xs">+251 911 00 00 00 / +251 922 00 00 00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl bg-green-50 p-2.5 rounded-xl dark:bg-gray-700">✉️</span>
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Email Address</p>
                                <p className="text-gray-400 text-xs">support@merkatostore.com</p>
                            </div>
                        </div>
                    </div>

                    {/* 📱 ማህበራዊ ሚዲያ (Social Links) */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-750">
                        <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Follow Us / Telegram</h4>
                        <div className="flex gap-3 text-xs">
                            <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600 transition">
                                ✈️ Telegram Channel
                            </a>
                            <a href="#" className="bg-black text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-900 transition dark:bg-gray-700">
                                🎵 TikTok Shop
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. ፈጣን መልዕክት መላኪያ ፎርም (Contact Form) */}
                <div className="bg-white p-8 rounded-2xl border shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2 mb-4">Send Us a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Your Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="ስምዎን ያስገቡ"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="example@mail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Message / አስተያየት</label>
                            <textarea
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full border p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="የሚፈልጉትን ሃሳብ እዚህ ይፃፉልን..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitted}
                            className="w-full bg-[#1F3864] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-900 transition shadow-md"
                        >
                            {submitted ? '🔄 Sending Message...' : 'Send Message ✉️'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}