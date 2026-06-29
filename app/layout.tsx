import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { CartProvider } from '../components/context/cartcontext';
import { ThemeProvider } from '../components/context/ThemContext'; //🆕



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Merkato Store - Premium E-commerce',
  description: 'The modern digital marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 🆕 <body> ላይ 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100' ጨምረናል */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <CartProvider>

            <Navbar />

            <main className="flex-grow">
              {children}
            </main>

            <footer className="bg-gray-900 text-gray-400 py-6 text-center text-xs mt-12 border-t border-gray-800 dark:bg-black dark:border-gray-950">
              &copy; {new Date().getFullYear()} Merkato Store. All rights reserved.
            </footer>

          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}