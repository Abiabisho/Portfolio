'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './context/cartcontext';
import { useTheme } from './context/ThemContext'; // 🆕 ቲሙን አመጣነው
export default function Navbar() {
    const { cart } = useCart();
    const { darkMode, toggleTheme } = useTheme();
    const pathname = usePathname();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: '🏠 Home', path: '/' },
        { name: '🛍️ Products', path: '/products' },
        { name: '💳 Checkout', path: '/checkout' },
        { name: '📞 Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-[#1F3864] text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 relative">

                    {/* 🏪 Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-black tracking-wider flex items-center gap-1.5">
                            <span className="bg-amber-500 text-[#1F3864] px-2.5 py-0.5 rounded-lg font-extrabold">Merkato</span>
                            <span className="text-white">Store</span>
                        </Link>
                    </div>

                    {/* 💻 Desktop Menu */}
                    <div className="hidden md:flex items-center ml-auto mr-6 space-x-4 font-medium text-sm">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-amber-500 text-[#1F3864] font-bold' : 'hover:bg-blue-900/60 text-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 🛒 Right Controls */}
                    <div className="flex items-center gap-2 ml-auto md:ml-0 z-50">

                        {/* Dark Mode */}
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full text-amber-300 text-lg focus:outline-none"
                            type="button"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Cart */}
                        <Link href="/checkout" className="relative p-3 hover:bg-blue-900 rounded-full">
                            <span className="text-xl">🛒</span>
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1F3864]">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* 📱 ትልቅ የንክኪ ቦታ ያለው የ CSS በተን (No JS!) */}
                        <label
                            htmlFor="menu-toggle"
                            className="block md:hidden p-4 text-3xl text-gray-200 cursor-pointer select-none active:bg-blue-900 rounded-lg"
                            style={{ minWidth: '48px', minHeight: '48px', display: 'inline-block' }}
                        >
                            ☰
                        </label>
                    </div>

                </div>
            </div>

            {/* 🛠️ Hidden Checkbox */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />

            {/* 📱 Dropdown Menu */}
            <div className="hidden peer-checked:block md:hidden bg-blue-950 border-t border-blue-900 px-4 pt-2 pb-4 space-y-1 shadow-inner w-full left-0 z-40">
                {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`block px-4 py-3.5 rounded-lg text-base font-semibold ${isActive ? 'bg-amber-500 text-[#1F3864]' : 'hover:bg-blue-900 text-gray-200'
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}