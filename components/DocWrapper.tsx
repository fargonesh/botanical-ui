import React, { useEffect } from 'react';
import { BrutalCard, Badge } from './_mod';
import { cn } from '../utils';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

// Register TypeScript language
hljs.registerLanguage('typescript', typescript);

interface DocWrapperProps {
    title: string;
    description?: string;
    code: string;
    children: React.ReactNode;
    className?: string;
}

export const DocWrapper: React.FC<DocWrapperProps> = ({ title, description, code, children, className }) => {
    const [copied, setCopied] = React.useState(false);
    const [highlightedCode, setHighlightedCode] = React.useState('');

    // Highlight code on mount and when code changes
    useEffect(() => {
        try {
            const highlighted = hljs.highlight(code.trim(), { language: 'typescript' }).value;
            setHighlightedCode(highlighted);
        } catch (err) {
            // Fallback if highlighting fails
            setHighlightedCode(code.trim());
        }
    }, [code]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id={title.toLowerCase().replace(/\s+/g, '-')} className="mb-16 scroll-mt-24 group">
            <div className="mb-6 border-b border-bio-black/10 pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-3xl text-bio-black">{title}</h3>
                    <div className="h-px bg-bio-black/20 flex-1" />
                </div>
                {description && <p className="font-mono text-sm opacity-70 max-w-2xl leading-relaxed">{description}</p>}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 border border-bio-black bg-bio-white">
                {/* Preview Area */}
                <div className={cn("p-8 md:p-12 flex items-center justify-center bg-bio-gray/5 border-b xl:border-b-0 xl:border-r border-bio-black min-h-[300px]", className)}>
                    <div className="w-full max-w-md mx-auto">
                        {children}
                    </div>
                </div>

                {/* Code Area */}
                <div className="relative bg-[#1a1a1a] text-bio-gray overflow-hidden flex flex-col min-h-[300px]">
                    <div className="flex justify-between items-center px-4 py-2 bg-black/40 border-b border-white/10">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-bio-green">TSX / Usage</span>
                        <button 
                            onClick={handleCopy}
                            className="font-mono text-[10px] uppercase hover:text-white transition-colors"
                        >
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                    <div className="flex-1 overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
                        <pre className="font-mono text-xs leading-relaxed language-typescript m-0">
                            <code 
                                className="hljs language-typescript"
                                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                            />
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};