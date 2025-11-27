import React from 'react';
import { Heading, Text } from './Typography';
import { MoveUpRight } from 'lucide-react';

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