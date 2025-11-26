import React, { createContext, useContext, useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';

type Theme = 'light' | 'dark';

interface ThemeColors {
    ink: string;
    paper: string;
    primary: string;
    secondary: string;
    accent: string;
    gray: string;
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setCustomColor: (key: keyof ThemeColors, value: string) => void;
    extractThemeFromImage: (imageUrl: string) => Promise<void>;
    colors: ThemeColors;
}

const defaultColors: Record<Theme, ThemeColors> = {
    light: {
        ink: '#0a0a0a',
        paper: '#f4f1ea',
        primary: '#ff3300',
        secondary: '#ccff00',
        accent: '#ff6b6b',
        gray: '#e5e5e5'
    },
    dark: {
        ink: '#f4f1ea',
        paper: '#0a0a0a',
        primary: '#ff4d00',
        secondary: '#ccff00',
        accent: '#ff8800',
        gray: '#1a1a1a'
    }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to lighten/darken colors
const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
};

// Helper function to get contrasting color
const getContrastingColor = (hex: string): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const R = num >> 16;
    const G = (num >> 8) & 0x00FF;
    const B = num & 0x0000FF;
    const brightness = (R * 299 + G * 587 + B * 114) / 1000;
    return brightness > 128 ? '#0a0a0a' : '#f4f1ea';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode, colours?: Partial<ThemeColors>, image?: string }> = ({ children, colours, image }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [customColors, setCustomColors] = useState<Partial<ThemeColors>>(colours);

    // Extract theme from image on mount if provided
    useEffect(() => {
        if (image) {
            extractThemeFromImage(image);
        }
    }, [image]);

    useEffect(() => {
        const root = document.documentElement;
        const currentColors = { ...defaultColors[theme], ...customColors };

        root.style.setProperty('--bio-ink', currentColors.ink);
        root.style.setProperty('--bio-paper', currentColors.paper);
        root.style.setProperty('--bio-primary', currentColors.primary);
        root.style.setProperty('--bio-secondary', currentColors.secondary);
        root.style.setProperty('--bio-accent', currentColors.accent);
        root.style.setProperty('--bio-gray', currentColors.gray);
        
        // Keep legacy names for backwards compatibility
        root.style.setProperty('--bio-red', currentColors.primary);
        root.style.setProperty('--bio-green', currentColors.secondary);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

    }, [theme, customColors]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const setCustomColor = (key: keyof ThemeColors, value: string) => {
        setCustomColors(prev => ({ ...prev, [key]: value }));
    };

    const extractThemeFromImage = async (imageUrl: string) => {
        try {
            const fac = new FastAverageColor();
            const color = await fac.getColorAsync(imageUrl);
            const hex = color.hex;
            
            // Use dominant color as primary
            // Create complementary colors for secondary and accent
            const secondary = adjustColor(hex, 50); // Lighter variant
            const accent = adjustColor(hex, -30); // Darker variant
            
            setCustomColors(prev => ({
                ...prev,
                primary: hex,
                secondary: secondary,
                accent: accent
            }));
        } catch (error) {
            console.error('Failed to extract colors from image:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            toggleTheme, 
            setCustomColor,
            extractThemeFromImage,
            colors: { ...defaultColors[theme], ...customColors } 
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};