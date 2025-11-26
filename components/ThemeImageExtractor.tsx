import React, { useState } from 'react';
import { useImageTheme } from '../hooks/useImageTheme';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Component to allow users to upload an image and extract theme colors from it
 * Usage: <ThemeImageExtractor />
 */
export const ThemeImageExtractor: React.FC = () => {
    const { extractTheme } = useImageTheme();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            setError(null);

            // Create a data URL from the file
            const reader = new FileReader();
            reader.onload = async (event) => {
                const dataUrl = event.target?.result as string;
                const result = await extractTheme(dataUrl);
                if (!result.success) {
                    setError('Failed to extract colors from image');
                }
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError('Error processing image');
            setLoading(false);
        }
    };

    const handleImageUrl = async () => {
        const url = prompt('Enter image URL:');
        if (!url) return;

        try {
            setLoading(true);
            setError(null);
            const result = await extractTheme(url);
            if (!result.success) {
                setError('Failed to extract colors from image URL');
            }
            setLoading(false);
        } catch (err) {
            setError('Error processing image URL');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 border border-bio-black">
            <h3 className="font-mono uppercase text-sm font-bold">Theme from Image</h3>
            
            <div className="flex gap-2 flex-wrap">
                <label className="inline-flex items-center px-4 py-2 border border-bio-black cursor-pointer hover:bg-bio-black/5 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={loading}
                        className="hidden"
                    />
                    <span className="font-mono text-xs uppercase">Upload Image</span>
                </label>

                <button
                    onClick={handleImageUrl}
                    disabled={loading}
                    className="px-4 py-2 border border-bio-black font-mono text-xs uppercase hover:bg-bio-black/5 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'From URL'}
                </button>
            </div>

            {error && (
                <div className="text-bio-primary text-sm font-mono">{error}</div>
            )}

            <div className="flex gap-2 text-xs">
                <div
                    className="w-8 h-8 border border-bio-black"
                    style={{ backgroundColor: colors.primary }}
                    title="Primary"
                />
                <div
                    className="w-8 h-8 border border-bio-black"
                    style={{ backgroundColor: colors.secondary }}
                    title="Secondary"
                />
                <div
                    className="w-8 h-8 border border-bio-black"
                    style={{ backgroundColor: colors.accent }}
                    title="Accent"
                />
            </div>
        </div>
    );
};
