import React from 'react';

export const Ticker: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full overflow-hidden bg-bio-black text-bio-green py-1 border-y border-bio-black/20">
    <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em]">
      {text} +++ {text} +++ {text} +++ {text} +++
    </div>
  </div>
);