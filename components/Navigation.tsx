import React from 'react';
import { cn } from '../utils';

interface SidebarProps {
    className?: string;
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
    return (
        <aside className={cn("w-64 bg-bio-white border-r border-bio-black flex flex-col h-full", className)}>
            {children}
        </aside>
    );
};

export const SidebarHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-4 border-b border-bio-black">
        {children}
    </div>
);

export const SidebarContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
        {children}
    </div>
);

export const SidebarFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-4 border-t border-bio-black bg-bio-gray/30">
        {children}
    </div>
);

interface SidebarItemProps {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    badge?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, badge }) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between p-3 font-mono text-xs uppercase tracking-wide transition-all border border-transparent hover:border-bio-black group rounded-none",
            active ? "bg-bio-black text-bio-white" : "text-bio-black hover:bg-bio-gray/50"
        )}
    >
        <div className="flex items-center gap-3">
            {icon && <span className={cn("transition-colors", active ? "text-bio-green" : "text-bio-black group-hover:text-bio-red")}>{icon}</span>}
            <span>{label}</span>
        </div>
        {badge && (
            <span className={cn("text-[9px] px-1.5 py-0.5 border", active ? "border-bio-green text-bio-green" : "border-bio-black text-bio-black")}>
                {badge}
            </span>
        )}
    </button>
);

// --- NEW COMPONENTS ---

export const Breadcrumb: React.FC<{ items: {label: string, href?: string}[], className?: string }> = ({ items, className }) => (
    <nav className={cn("flex items-center font-mono text-xs uppercase tracking-tight", className)} aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap">
            {items.map((item, index) => (
                <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-bio-black/30">/</span>}
                    {item.href ? (
                        <a href={item.href} className="text-bio-black/60 hover:text-bio-red hover:underline decoration-1 underline-offset-2 transition-colors">
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-bio-black font-bold" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);