
import React, { useEffect, useState } from 'react';
import { MoveUpRight, Hexagon, Terminal as TerminalIcon } from 'lucide-react';
import { Heading, Text } from './Typography';
import { cn } from '../utils';
import { FloralDecoration } from './Layout';

export const SectionHeader: React.FC<{ title: string, subtitle: string, index: string }> = ({ title, subtitle, index }) => (
  <div className="flex flex-col border-b border-bio-black pb-4 mb-8">
    <div className="flex justify-between items-baseline mb-2">
      <Heading level={2} className="text-bio-black">{title}</Heading>
      <span className="font-mono text-xs md:text-sm text-bio-black/60">[ REF-{index} ]</span>
    </div>
    <div className="flex justify-between items-end">
      <Text variant="mono" className="max-w-md uppercase tracking-wide opacity-70 text-xs">{subtitle}</Text>
      <MoveUpRight className="w-6 h-6 text-bio-black" />
    </div>
  </div>
);

export const Ticker: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full overflow-hidden bg-bio-black text-bio-green py-1 border-y border-bio-black/20">
    <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em]">
      {text} +++ {text} +++ {text} +++ {text} +++
    </div>
  </div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  decoration?: 'thorns' | 'vines' | 'none';
}

export const BrutalCard: React.FC<CardProps> = ({ children, className = '', title, decoration = 'none' }) => (
  <div className={cn("border border-bio-black bg-bio-white p-4 relative group hover:shadow-[4px_4px_0px_0px_currentColor] transition-shadow duration-300 text-bio-black", className)}>
    {title && (
      <div className="absolute -top-3 left-4 bg-bio-white px-2 border border-bio-black text-xs font-mono uppercase z-10 text-bio-black">
        {title}
      </div>
    )}
    
    {/* Decoration Overlays */}
    {decoration === 'thorns' && (
      <>
        <FloralDecoration type="thorns" position="top-right" />
        <FloralDecoration type="thorns" position="bottom-left" />
      </>
    )}
    {decoration === 'vines' && (
      <>
        <FloralDecoration type="vines" position="top-left" />
        <FloralDecoration type="vines" position="bottom-right" />
      </>
    )}

    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Hexagon className="w-4 h-4 text-bio-red" />
    </div>
    {children}
  </div>
);

export const ImageFrame: React.FC<{ src: string, caption?: string }> = ({ src, caption }) => (
  <div className="relative border border-bio-black p-2 bg-bio-white">
    <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
      <img src={src} alt="Visual" className="w-full h-full object-cover aspect-[4/5] opacity-90 contrast-125 hover:scale-105 transition-transform duration-700 ease-in-out" />
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
    </div>
    {caption && (
      <div className="mt-2 flex justify-between items-center border-t border-bio-black/20 pt-2 text-bio-black">
        <span className="font-mono text-[10px] uppercase">{caption}</span>
        <span className="font-mono text-[10px]">{new Date().getFullYear()}</span>
      </div>
    )}
  </div>
);

export const Barcode = () => (
  <div className="flex h-8 w-24 gap-0.5 overflow-hidden opacity-80 mix-blend-multiply dark:mix-blend-screen">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="bg-bio-black h-full" 
        style={{ width: Math.random() > 0.5 ? '4px' : '1px' }} 
      />
    ))}
  </div>
);

export const Terminal: React.FC<{ lines: string[], isLoading?: boolean }> = ({ lines, isLoading }) => {
    return (
        <div className="w-full bg-bio-black text-bio-white p-6 font-mono text-sm border-l-4 border-bio-red shadow-2xl min-h-[300px] flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 border-b border-bio-white/20 pb-2">
                <span className="text-bio-red flex items-center gap-2"><TerminalIcon size={14} /> SYS.ROOT.ACCESS</span>
                <span className="text-[10px] opacity-50">V.2.0.4</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs md:text-sm no-scrollbar">
                {lines.map((line, i) => (
                    <div key={i} className="break-words">
                        <span className="text-bio-green mr-2">{'>'}</span>
                        <span dangerouslySetInnerHTML={{__html: line}} />
                    </div>
                ))}
                {isLoading && (
                    <div className="animate-pulse text-bio-red">Processing botanical data...</div>
                )}
            </div>
        </div>
    );
}

export const AnalogueClock: React.FC<{ className?: string, size?: number }> = ({ className, size = 200 }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secDeg = (seconds / 60) * 360;
    const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className={cn("relative rounded-full border border-bio-black bg-bio-white flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Markers */}
            {[...Array(12)].map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "absolute w-[1px] bg-bio-black h-2 top-0 origin-bottom",
                        i % 3 === 0 ? "h-4 w-[2px]" : ""
                    )}
                    style={{ 
                        transform: `rotate(${i * 30}deg) translateY(${size/2 - 10}px)`
                    }} 
                />
            ))}
            
            {/* Center dot */}
            <div className="absolute w-2 h-2 bg-bio-red rounded-full z-20" />

            {/* Hour Hand */}
            <div 
                className="absolute w-1 bg-bio-black origin-bottom bottom-1/2 z-10"
                style={{ height: size * 0.25, transform: `rotate(${hourDeg}deg)` }}
            />
            {/* Minute Hand */}
            <div 
                className="absolute w-[2px] bg-bio-black origin-bottom bottom-1/2 z-10"
                style={{ height: size * 0.35, transform: `rotate(${minDeg}deg)` }}
            />
            {/* Second Hand */}
            <div 
                className="absolute w-[1px] bg-bio-red origin-bottom bottom-1/2 z-10"
                style={{ height: size * 0.40, transform: `rotate(${secDeg}deg)` }}
            />

             {/* Decorative Label */}
             <div className="absolute bottom-[20%] font-mono text-[10px] tracking-widest text-bio-black/50">BIO-CHRON</div>
        </div>
    );
};
