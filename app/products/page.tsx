'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../../components/context/cartcontext';
import Image from 'next/image';

const initialProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 45.00,
        desc: '20-hour battery life, active noise cancellation, and premium sound.',
        img: '/head.jpg'
    },
    {
        id: 2,
        name: 'Cotton Summer Dress',
        category: 'Clothing',
        price: 28.00,
        desc: 'Lightweight and breathable hand-woven fabric, perfect for sunny days.',
        img: '/dress.jpg'
    },
    {
        id: 3,
        name: 'Ethiopian Organic Coffee (Yirgacheffe)',
        category: 'Food & Beverage',
        price: 18.50,
        desc: 'Premium single-origin medium roast coffee beans with floral notes.',
        img: '/cofee.jpg'
    },
    {
        id: 4,
        name: 'Core i7 High-Performance Laptop',
        category: 'Electronics',
        price: 850.00,
        desc: '16GB RAM, 512GB SSD, 15.6-inch display. Optimized for coding.',
        img: '/laptop.jpg'
    },
    {
        id: 5,
        name: 'Handwoven Habesha Kemis',
        category: 'Clothing',
        price: 120.00,
        desc: 'Elegant traditional Ethiopian dress made of 100% pure organic cotton.',
        img: '/kemis.jpg'
    },
    {
        id: 6,
        name: 'Traditional Jebena (Clay Coffee Pot)',
        category: 'Home & Living',
        price: 35.00,
        desc: 'Authentic handmade clay pot essential for the traditional Ethiopian coffee ceremony.',
        img: '/jebena.jpg'
    },
    {
        id: 7,
        name: 'Ethiopian Honey (100% Pure)',
        category: 'Food & Beverage',
        price: 22.00,
        desc: 'Rich and aromatic honey sourced from the highlands of Ethiopia.',
        img: '/honey.jpg'
    },
    {
        id: 8,
        name: 'smart phone with 128GB Storage',
        category: 'Electronics',
        price: 299.00,
        desc: '6.5-inch display, 48MP camera, and long-lasting battery life.',
        img: '/phone.jpg'
    },
    {
        id: 9,
        name: 'habesha kemis with handwoven scarf',
        category: 'Clothing',
        price: 150.00,
        desc: 'Elegant traditional Ethiopian dress paired with a beautifully handwoven scarf.',
        img: '/kemis2.jpg'
    },
    {
        id: 10,
        name: 'Organic Ethiopian Spiced Tea (Keremela)',
        category: 'Food & Beverage',
        price: 8.00,
        desc: 'A rich blend of black tea infused with authentic cinnamon, cardamom, and cloves.',
        img: '/tea.jpg'
    },
    {
        id: 11,
        name: 'Non-Alcoholic Traditional Tej Blend',
        category: 'Food & Beverage',
        price: 15.00,
        desc: 'Authentic honey wine flavor experience, crafted safely without alcohol using pure gesho.',
        img: '/tej2.jpg'
    },
    {
        id: 12,
        name: 'Ambo Mineral Water (Pack of 6)',
        category: 'Food & Beverage',
        price: 14.50,
        desc: 'Naturally sparkling rich mineral water sourced directly from Ambo, Ethiopia.',
        img: '/ambo.jpg'
    },
    {
        id: 13,
        name: 'Ethiopian messob (Traditional Woven Basket)',
        category: 'Home & Living',
        price: 45.00,
        desc: 'Handwoven basket crafted by skilled artisans using traditional techniques.',
        img: '/mesob.jpg'
    },
    {
        id: 14,
        name: 'Ethiopian Tej',
        category: 'Food & Beverage',
        price: 20.00,
        desc: 'Authentic honey wine flavor experience, crafted safely without alcohol using pure gesho.',
        img: '/tej.jpg'
    }
];

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [searchTerm, setSearchTerm] = useState('');
    const [mounted, setMounted] = useState(false);

    // 📱 በስልክ ላይ ጃቫስክሪፕቱ ሙሉ በሙሉ መጫኑን ማረጋገጫ (Hydration Fix)
    useEffect(() => {
        setMounted(true);
    }, []);

    // 🔍 እዚህ ጋር ማጣሪያው (Filter) በካቴጎሪው እና በፍለጋ ሳጥኑ መሰረት ይሰራል
    const filteredProducts = initialProducts.filter(product => {
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">

                {/* 🗂️ Sidebar Categories */}
                <aside className="w-full md:w-1/4 bg-white p-4 rounded-xl shadow-sm border h-fit">
                    <h3 className="font-bold text-lg text-[#1F3864] mb-4 border-b pb-2">Categories</h3>
                    <ul className="space-y-2">
                        {['All Products', 'Electronics', 'Clothing', 'Food & Beverage', 'Home & Living'].map((cat) => (
                            <li key={cat}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${selectedCategory === cat
                                        ? 'bg-[#1F3864] text-white font-bold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* 🔍 Main Product Area */}
                <main className="flex-1 space-y-6">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border p-3 rounded-full outline-none shadow-sm focus:ring-2 focus:ring-blue-400 text-sm"
                    />

                    {/* 🛍️ Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between p-4 hover:shadow-md transition">

                                <div>
                                    <div className="w-full h-44 relative mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                        {product.img.startsWith('/') ? (
                                            <Image
                                                src={product.img}
                                                alt={product.name}
                                                fill
                                                className="object-cover hover:scale-105 transition duration-300"
                                            />
                                        ) : (
                                            <span className="text-5xl">{product.img}</span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-base text-gray-800 line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-400 mb-1">Category: <span className="font-semibold text-gray-600">{product.category}</span></p>
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.desc}</p>
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-yellow-600 mb-3">${product.price.toFixed(2)}</p>

                                    {/* 🛒 በስልክ ላይ 100% ፈጣን ምላሽ እንዲሰጥ የተስተካከለው የ Add to Cart በተን */}
                                    <button
                                        type="button"
                                        onClick={() => mounted && addToCart({ id: product.id, name: product.name, price: product.price })}
                                        className={`w-full py-2.5 px-4 rounded-lg font-bold text-center transition-all select-none active:scale-95 ${mounted
                                            ? 'bg-[#1F3864] text-white hover:bg-blue-900 cursor-pointer'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        style={{ minHeight: '44px' }}
                                    >
                                        {mounted ? 'Add to Cart' : '⏳ Loading...'}
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-400 text-sm">
                            No products found in this category.
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}