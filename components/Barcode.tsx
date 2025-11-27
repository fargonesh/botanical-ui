import React from 'react';

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