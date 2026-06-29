'use client';
import Link from 'next/link';
import { useCart } from './context/cartcontext';

export default function Header() {
    const { cart } = useCart();
    const cartCount = cart?.length ?? 0;

    return (
        <header className="bg-[#1F3864] text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40">
            <div>
                <h1 className="text-2xl font-bold">Merkato Store By Abi</h1>
                <p className="text-xs text-gray-300">Shop Smart. Shop Africa.</p>
            </div>
            <nav className="flex items-center gap-6">
                <ul className="flex space-x-6 font-medium">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/products" className="hover:underline">Products</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                </ul>
                {/* 🟡 Clickable Gold Cart Badge linked to checkout */}
                <Link href="/checkout" className="relative bg-yellow-500 text-gray-900 px-3 py-1.5 rounded-full font-bold text-sm shadow-sm flex items-center gap-1 hover:bg-yellow-400 transition">
                    🛒 <span>{cartCount}</span>
                </Link>
            </nav>
        </header>
    );
}