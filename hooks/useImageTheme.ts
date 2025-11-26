import { useTheme } from '../contexts/ThemeContext';
import { useCallback } from 'react';

/**
 * Hook to easily extract colors from an image and apply them as theme
 * Usage: const { extractTheme, isLoading } = useImageTheme();
 *        await extractTheme('path/to/image.jpg');
 */
export const useImageTheme = () => {
    const { extractThemeFromImage } = useTheme();

    const extractTheme = useCallback(async (imageUrl: string) => {
        try {
            await extractThemeFromImage(imageUrl);
            return { success: true };
        } catch (error) {
            console.error('Failed to extract theme from image:', error);
            return { success: false, error };
        }
    }, [extractThemeFromImage]);

    return { extractTheme };
};

/**
 * Utility to manually set theme colors
 * Usage:
 *   const { setColors } = useTheme();
 *   setColors({ primary: '#ff0000', secondary: '#00ff00' });
 */
export const useColorTheme = () => {
    const { setCustomColor } = useTheme();

    const setColors = useCallback((colors: Partial<Record<string, string>>) => {
        Object.entries(colors).forEach(([key, value]) => {
            if (value) {
                setCustomColor(key as any, value);
            }
        });
    }, [setCustomColor]);

    return { setColors };
};
