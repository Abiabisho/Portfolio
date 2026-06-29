'use context';
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. የጋሪውን አይተም መዋቅር መግለጽ
type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

// 2. የኮንቴክስቱን አጠቃላይ መዋቅር መግለጽ
type CartContextType = {
    cart: CartItem[];
    addToCart: (product: { id: number; name: string; price: number }) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // 📱 ስልክ ላይም ሆነ ኮምፒውተር ላይ መጀመሪያ ሲከፈት የተቀመጠ መረጃ ካለ ያነባል
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('merkato_cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Error reading cart from localStorage:", error);
        }
    }, []);

    // 💾 በጋሪው ላይ ለውጥ ሲኖር ወዲያውኑ ያስቀምጣል
    useEffect(() => {
        try {
            localStorage.setItem('merkato_cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart]);

    // 🛒 እቃ ወደ ጋሪ ለመጨመር (ይህ ስልክ ላይ 100% ይሰራል)
    const addToCart = (product: { id: number; name: string; price: number }) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // 🗑️ እቃ ከጋሪ ለመቀነስ
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // 🧼 ጋሪውን ባዶ ለማድረግ
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}