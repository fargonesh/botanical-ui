
import React from 'react';
import { cn } from '../utils';

export const GridLineVertical = () => (
  <div className="absolute top-0 bottom-0 w-px bg-bio-black/10 pointer-events-none" />
);

export const GridLineHorizontal = () => (
  <div className="absolute left-0 right-0 h-px bg-bio-black/10 pointer-events-none" />
);

export const Separator: React.FC<{ orientation?: 'horizontal' | 'vertical', className?: string }> = ({ orientation = 'horizontal', className }) => (
    <div className={cn(
        "bg-bio-black/20",
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className || ""
    )} />
);

export const FloralDecoration: React.FC<{ type: 'thorns' | 'vines', position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', className?: string }> = ({ type, position, className }) => {
    
    // Rotation based on position
    const rotation = {
        'top-left': 'rotate(0deg)',
        'top-right': 'rotate(90deg)',
        'bottom-right': 'rotate(180deg)',
        'bottom-left': 'rotate(270deg)',
    };

    const containerStyle = {
        'top-left': { top: '-8px', left: '-8px' },
        'top-right': { top: '-8px', right: '-8px' },
        'bottom-right': { bottom: '-8px', right: '-8px' },
        'bottom-left': { bottom: '-8px', left: '-8px' },
    };

    return (
        <div 
            className={cn("absolute w-16 h-16 pointer-events-none z-20 text-bio-black opacity-80 hover:opacity-100 transition-opacity", className)}
            style={containerStyle[position]}
        >
            <svg 
                viewBox="0 0 50 50" 
                className="w-full h-full"
                style={{ transform: rotation[position] }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {type === 'thorns' ? (
                    <>
                        {/* Main curved stem */}
                        <path d="M 2 0 Q 8 12 12 24 Q 15 35 18 50" opacity="0.7" />
                        
                        {/* Left side thorns */}
                        <path d="M 8 4 L 2 8" />
                        <path d="M 10 10 L 3 15" />
                        <path d="M 12 18 L 4 24" />
                        <path d="M 13 28 L 5 36" />
                        
                        {/* Right side thorns */}
                        <path d="M 8 6 L 16 6" />
                        <path d="M 10 14 L 18 12" />
                        <path d="M 12 22 L 20 18" />
                        <path d="M 13 32 L 21 26" />
                        
                        {/* Decorative details */}
                        <circle cx="12" cy="24" r="2" fill="currentColor" opacity="0.6" />
                    </>
                ) : (
                    <>
                        {/* Curved vine stem */}
                        <path d="M 5 0 Q 15 8 20 18 Q 25 28 18 40 Q 12 48 5 50" />
                        
                        {/* Leaf clusters */}
                        <ellipse cx="12" cy="12" rx="3" ry="5" transform="rotate(-30 12 12)" />
                        <ellipse cx="28" cy="15" rx="3" ry="5" transform="rotate(30 28 15)" />
                        <ellipse cx="15" cy="28" rx="3" ry="5" transform="rotate(-45 15 28)" />
                        <ellipse cx="30" cy="32" rx="3" ry="5" transform="rotate(45 30 32)" />
                        
                        {/* Small tendrils */}
                        <path d="M 18 10 Q 25 12 28 8" opacity="0.6" />
                        <path d="M 20 25 Q 28 28 32 26" opacity="0.6" />
                    </>
                )}
            </svg>
        </div>
    );
};
