'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    // በተኑ ሲነካ ሙሉ ገጹን በአንድ ጊዜ የሚቀይርበት ቀላሉ መንገድ (CSS Filter)
    const applyTheme = (isDark: boolean) => {
        if (typeof window !== 'undefined') {
            if (isDark) {
                document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
                // ፎቶዎች እንዳይገለበጡና መደበኛ ቀለማቸውን እንዲይዙ ማድረግ
                document.querySelectorAll('img, video, .no-invert').forEach((el) => {
                    (el as HTMLElement).style.filter = 'invert(1) hue-rotate(180deg)';
                });
            } else {
                document.documentElement.style.filter = 'none';
                document.querySelectorAll('img, video, .no-invert').forEach((el) => {
                    (el as HTMLElement).style.filter = 'none';
                });
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            applyTheme(true);
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            applyTheme(newMode);
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}