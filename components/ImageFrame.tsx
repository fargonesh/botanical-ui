import React from 'react';

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