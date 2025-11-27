
import React from 'react';
import { cn } from '../utils';

export const GridLineVertical = () => (
  <div className="absolute top-0 bottom-0 w-px bg-bio-black/10 pointer-events-none" />
);

export const GridLineHorizontal = () => (
  <div className="absolute left-0 right-0 h-px bg-bio-black/10 pointer-events-none" />
);

export const Separator: React.FC<{ orientation?: 'horizontal' | 'vertical', className?: string }> = ({ orientation = 'horizontal', className }) => (
    <div className={cn(
        "bg-bio-black/20",
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className || ""
    )} />
);
