import React from 'react';
import { cn } from '../utils';
import Decorations, { Corner } from './decorations/Decorations';
import { Hexagon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  decorationSeed?: number | string;
  decorations?: Corner[];
}

export const BrutalCard: React.FC<CardProps> = ({ children, className = '', title, decorations = [], decorationSeed }) => {
  return (
    <div className={cn("border border-bio-black bg-bio-white p-4 relative group hover:shadow-[4px_4px_0px_0px_currentColor] transition-shadow duration-300 text-bio-black", className)}>
      {title && (
        <div className="absolute -top-3 left-4 bg-bio-white px-2 border border-bio-black text-xs font-mono uppercase z-10 text-bio-black">
          {title}
        </div>
      )}
      {
        decorations ? (
          <Decorations positions={decorations} seed={decorationSeed} className="absolute inset-0 pointer-events-none z-10" />
        ) : (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Hexagon className="w-4 h-4 text-bio-red" />
          </div>
        )
      }
      {children}
    </div>
  )
}
