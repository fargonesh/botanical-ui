import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

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
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        ))}
        {isLoading && (
          <div className="animate-pulse text-bio-red">Processing botanical data...</div>
        )}
      </div>
    </div>
  );
}
