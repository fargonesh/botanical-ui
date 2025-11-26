import React, { useEffect, useState, useRef } from 'react';
import { X, Search, Command } from 'lucide-react';
import { cn } from '../utils';
import { Button } from './Forms';
import { ViewState } from '../types';

// --- MODAL ---

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bio-black/80 backdrop-blur-sm" onClick={onClose} />
            
            {/* Content */}
            <div className="relative bg-bio-white border-2 border-bio-black w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 flex justify-between items-center border-b-2 border-bio-black px-4 py-2 bg-bio-black text-bio-white">
                    <span className="font-mono text-xs uppercase tracking-wider">{title}</span>
                    <button onClick={onClose} className="hover:text-bio-red transition-colors">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6 text-bio-black">
                    {children}
                </div>
                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-bio-black" />
            </div>
        </div>
    );
};

// --- DRAWER ---

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, side = 'right' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
             <div className="absolute inset-0 bg-bio-black/50 backdrop-blur-[2px]" onClick={onClose} />
             <div className={cn(
                 "absolute top-0 bottom-0 w-80 bg-bio-white border-l-2 border-bio-black shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
                 side === 'right' ? "right-0" : "left-0 border-r-2 border-l-0",
             )}>
                <div className="p-4 border-b border-bio-black flex justify-between items-center bg-bio-gray text-bio-black">
                    <span className="font-mono text-xs uppercase">System Drawer</span>
                    <button onClick={onClose}><X size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 text-bio-black">
                    {children}
                </div>
                 {/* Decorative strip */}
                 <div className="h-2 bg-striped w-full border-t border-bio-black" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
             </div>
        </div>
    );
};

// --- COMMAND PALETTE ---

interface CommandPaletteProps {
    onNavigate?: (view: ViewState) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const commands = [
        { id: '1', label: 'Analyze Specimen', shortcut: 'S', action: () => { console.log('Analyze'); onNavigate?.(ViewState.DASHBOARD); } },
        { id: '2', label: 'Go to Dashboard', shortcut: 'D', action: () => onNavigate?.(ViewState.DASHBOARD) },
        { id: '3', label: 'System Settings', shortcut: '⌘,', action: () => console.log('Settings') },
        { id: '4', label: 'View Documentation', shortcut: '?', action: () => onNavigate?.(ViewState.DOCS) },
        { id: '5', label: 'Exit System', shortcut: 'Esc', action: () => onNavigate?.(ViewState.LANDING) },
    ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] px-4">
             <div className="absolute inset-0 bg-bio-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
             
             <div className="relative w-full max-w-2xl bg-bio-black border border-bio-white shadow-2xl text-bio-white overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center px-4 py-4 border-b border-bio-white/20">
                    <Command className="w-5 h-5 text-bio-green mr-3" />
                    <input 
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none outline-none text-lg font-mono placeholder:text-bio-white/30 text-bio-white"
                        placeholder="Type a command..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="text-[10px] bg-bio-white/10 px-2 py-1 rounded text-bio-white/50">ESC</div>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto py-2">
                    {commands.length === 0 ? (
                        <div className="px-4 py-8 text-center text-bio-white/40 font-mono text-sm">No results found.</div>
                    ) : (
                        commands.map(cmd => (
                            <button 
                                key={cmd.id}
                                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-bio-green hover:text-bio-black group transition-colors"
                                onClick={() => {
                                    cmd.action();
                                    setIsOpen(false);
                                }}
                            >
                                <span className="font-mono text-sm">{cmd.label}</span>
                                <span className="text-[10px] opacity-50 group-hover:opacity-100">{cmd.shortcut}</span>
                            </button>
                        ))
                    )}
                </div>
                <div className="bg-bio-white/5 px-4 py-1 text-[10px] text-bio-white/30 border-t border-bio-white/10 flex justify-between">
                    <span>BIO-OS V.2.0</span>
                    <span>READY</span>
                </div>
             </div>
        </div>
    );
};

// --- CONTEXT MENU ---

interface ContextMenuProps {
    items: { label: string; action: () => void; shortcut?: string; destructive?: boolean }[];
    children: React.ReactNode;
    className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, children, className }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setVisible(true);
        setPosition({ x: e.pageX, y: e.pageY });
    };

    useEffect(() => {
        const handleClick = () => setVisible(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div onContextMenu={handleContextMenu} className={cn("relative h-full", className)}>
            {children}
            {visible && (
                <div 
                    className="fixed z-[100] bg-bio-white border border-bio-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[160px] animate-in fade-in zoom-in-95 duration-100"
                    style={{ top: position.y, left: position.x }}
                >
                    <div className="flex flex-col py-1">
                        {items.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => { item.action(); setVisible(false); }}
                                className={cn(
                                    "px-4 py-2 text-left font-mono text-xs uppercase hover:bg-bio-black hover:text-bio-white flex justify-between items-center transition-colors",
                                    item.destructive && "text-bio-red hover:bg-bio-red hover:text-white"
                                )}
                            >
                                <span>{item.label}</span>
                                {item.shortcut && <span className="opacity-50 ml-4">{item.shortcut}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};