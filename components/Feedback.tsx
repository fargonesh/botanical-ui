import React from 'react';
import { Info, X, AlertTriangle } from 'lucide-react';
import { cn } from '../utils';

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'default' | 'outline' | 'destructive' | 'success', className?: string }> = ({ children, variant = 'default', className }) => {
    const variants = {
        default: "bg-bio-black text-bio-white",
        outline: "border border-bio-black text-bio-black bg-transparent",
        destructive: "bg-bio-primary text-white",
        success: "bg-bio-secondary text-bio-black border border-bio-black"
    };
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest", variants[variant], className)}>
            {children}
        </span>
    );
};

export const Alert: React.FC<{ title: string, children: React.ReactNode, variant?: 'info' | 'error' | 'warning' }> = ({ title, children, variant = 'info' }) => {
    const icons = { info: Info, error: X, warning: AlertTriangle };
    const Icon = icons[variant];
    const styles = {
        info: "bg-bio-white border-bio-black text-bio-black",
        error: "bg-red-50 border-bio-primary text-bio-primary",
        warning: "bg-yellow-50 border-yellow-600 text-yellow-800"
    };

    return (
        <div className={cn("border p-4 flex gap-4 relative", styles[variant])}>
            <div className="absolute top-0 right-0 p-1 border-l border-b border-inherit bg-inherit">
                 <Icon size={14} />
            </div>
            <div className="flex-1">
                <h5 className="font-mono text-xs uppercase font-bold mb-1 tracking-wider">{title}</h5>
                <p className="font-sans text-sm opacity-90">{children}</p>
            </div>
        </div>
    );
};

export const Progress: React.FC<{ value: number, max?: number, className?: string }> = ({ value, max = 100, className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className={cn("w-full h-4 border border-bio-black bg-bio-white relative p-0.5", className)}>
            <div 
                className="h-full bg-bio-black transition-all duration-300" 
                style={{ width: `${percentage}%` }}
            />
             {/* Striped overlay pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:10px_10px] opacity-20 pointer-events-none" />
        </div>
    );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn("animate-pulse bg-bio-black/10", className)} />
);

export const Avatar: React.FC<{ src?: string, fallback: string, size?: 'sm' | 'md' | 'lg', className?: string }> = ({ src, fallback, size = 'md', className }) => {
    const sizes = { sm: "w-8 h-8 text-[10px]", md: "w-12 h-12 text-xs", lg: "w-16 h-16 text-sm" };
    return (
        <div className={cn("border border-bio-black overflow-hidden bg-bio-white text-bio-black flex items-center justify-center font-mono relative", sizes[size], className)}>
            {src ? (
                <img src={src} alt={fallback} className="w-full h-full object-cover filter grayscale" />
            ) : (
                <span>{fallback}</span>
            )}
            <div className="absolute inset-0 border-[0.5px] border-black/10 rounded-full mix-blend-overlay"></div>
        </div>
    );
};

export const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <kbd className="inline-flex items-center justify-center h-5 min-w-[20px] px-1 font-mono text-[10px] bg-bio-white border border-bio-black/50 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] rounded-[2px] mx-0.5 text-bio-black">
        {children}
    </kbd>
);