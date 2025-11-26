
import React from 'react';
import { cn } from '../utils';

export const Heading: React.FC<{ level?: 1 | 2 | 3 | 4, children: React.ReactNode, className?: string, serif?: boolean }> = ({ level = 1, children, className, serif = true }) => {
    const Tag = `h${level}` as React.ElementType;
    const styles = {
        1: "text-4xl md:text-6xl font-bold leading-none tracking-tight",
        2: "text-3xl md:text-4xl font-bold leading-tight",
        3: "text-xl md:text-2xl font-bold",
        4: "text-lg font-bold uppercase tracking-wide"
    };
    return (
        <Tag className={cn(styles[level], serif ? "font-serif" : "font-sans", className || "")}>
            {children}
        </Tag>
    );
};

export const Text: React.FC<{ variant?: 'body' | 'mono' | 'caption', children: React.ReactNode, className?: string }> = ({ variant = 'body', children, className }) => {
    const styles = {
        body: "font-sans text-base leading-relaxed",
        mono: "font-mono text-sm leading-relaxed",
        caption: "font-mono text-xs uppercase tracking-wider opacity-70"
    };
    return <p className={cn(styles[variant], className || "")}>{children}</p>;
};
