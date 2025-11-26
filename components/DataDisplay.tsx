import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

export const Accordion: React.FC<{ items: {title: string, content: React.ReactNode}[], className?: string }> = ({ items, className }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={cn("border-t border-bio-black", className)}>
            {items.map((item, idx) => (
                <div key={idx} className="border-b border-bio-black">
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex justify-between items-center py-4 px-2 hover:bg-bio-black/5 transition-colors text-left text-bio-black"
                    >
                        <span className="font-serif text-lg">{item.title}</span>
                        <div className="border border-bio-black p-1">
                             {openIndex === idx ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                    </button>
                    {openIndex === idx && (
                        <div className="p-4 bg-bio-white border-t border-dashed border-bio-black/30 font-sans text-sm animate-in slide-in-from-top-2 duration-200 text-bio-black">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const Tabs: React.FC<{ tabs: {label: string, content: React.ReactNode}[], defaultTab?: number }> = ({ tabs, defaultTab = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div className="w-full">
            <div className="flex border-b border-bio-black overflow-x-auto no-scrollbar">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                            "px-6 py-3 font-mono text-xs uppercase tracking-wider border-r border-bio-black transition-all whitespace-nowrap",
                            activeTab === idx 
                                ? "bg-bio-black text-bio-white" 
                                : "bg-transparent text-bio-black hover:bg-bio-black/5"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
                {/* Filler to extend border if needed */}
                <div className="flex-1 border-b border-bio-black -mb-px"></div>
            </div>
            <div className="p-6 bg-bio-white border-x border-b border-bio-black min-h-[200px]">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export const Table: React.FC<{ headers: string[], data: string[][], className?: string }> = ({ headers, data, className }) => (
    <div className={cn("w-full overflow-x-auto border border-bio-black bg-bio-white", className)}>
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-bio-black text-bio-white">
                    {headers.map((h, i) => (
                        <th key={i} className="p-3 font-mono text-xs uppercase tracking-wider font-normal border-r border-bio-white/20 last:border-r-0">{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-b border-bio-black/10 last:border-b-0 hover:bg-bio-gray/30 transition-colors">
                        {row.map((cell, j) => (
                            <td key={j} className="p-3 font-mono text-xs border-r border-bio-black/10 last:border-r-0 text-bio-black">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);