import React from 'react';
import { SectionHeader, Button, BrutalCard, ImageFrame, GridLineVertical, Barcode } from '../components/_mod';
import { ArrowRight, Globe, Leaf, Book } from 'lucide-react';

interface LandingProps {
    onEnter: () => void;
    onDocs: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter, onDocs }) => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
        <GridLineVertical /> <GridLineVertical /> <GridLineVertical /> 
        <GridLineVertical /> <GridLineVertical /> <GridLineVertical />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-12 md:pt-24 pb-12 flex flex-col min-h-screen">
        
        {/* Hero Section */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24 items-end">
            <div className="col-span-1 md:col-span-8">
                <div className="mb-4 flex items-center gap-4">
                    <Barcode />
                    <span className="font-mono text-xs bg-bio-red text-white px-1">EST. 2024</span>
                </div>
                <h1 className="font-serif text-6xl md:text-9xl leading-[0.85] text-bio-black tracking-tighter">
                    NATURE <br/>
                    <span className="font-sans font-light italic text-5xl md:text-7xl ml-12">meets</span> <br/>
                    MACHINE
                </h1>
            </div>
            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                <p className="font-mono text-xs md:text-sm leading-relaxed border-l border-bio-black pl-4 text-justify">
                    A digital herbarium constructed from the raw data of the physical world. 
                    We archive the ephemeral beauty of flora through the brutalist lens of the machine.
                </p>
                <div className="flex flex-col gap-2 w-full md:w-auto self-start">
                    <Button onClick={onEnter} className="w-full">
                        Enter System <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button onClick={onDocs} variant="outline" className="w-full" icon={<Book className="w-4 h-4" />}>
                        Documentation
                    </Button>
                </div>
            </div>
        </header>

        {/* Gallery / Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <BrutalCard title="Specimen 01" className="bg-transparent md:col-span-1">
                 <ImageFrame src="https://picsum.photos/seed/flower1/600/800" caption="Rosa Damascena" />
                 <div className="mt-4 font-mono text-xs">
                    <p className="mb-2">// MORPHOLOGY</p>
                    <p className="opacity-60">Deciduous shrub, thorny stems, pinnate leaves.</p>
                 </div>
            </BrutalCard>
            
            <div className="md:col-span-2 flex flex-col justify-between">
                <SectionHeader title="The Archive" subtitle="Cataloging organic matter via neural networks" index="001" />
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-bio-black p-6 hover:bg-bio-black hover:text-white transition-colors group cursor-pointer">
                        <Leaf className="mb-4 w-8 h-8 text-bio-black group-hover:text-bio-green" />
                        <h3 className="font-serif text-2xl mb-2">Identification</h3>
                        <p className="font-mono text-xs opacity-70">AI-driven analysis of plant structures.</p>
                    </div>
                    <div className="border border-bio-black p-6 hover:bg-bio-black hover:text-white transition-colors group cursor-pointer">
                        <Globe className="mb-4 w-8 h-8 text-bio-black group-hover:text-bio-green" />
                        <h3 className="font-serif text-2xl mb-2">Distribution</h3>
                        <p className="font-mono text-xs opacity-70">Global mapping of native flora.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer aesthetic */}
        <footer className="mt-auto border-t border-bio-black pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-serif text-2xl">LAB_004</div>
            <div className="font-mono text-[10px] uppercase flex gap-4">
                <button className="hover:underline" onClick={onDocs}>Documentation Library</button>
                <span>/</span>
                <span>Terms of Service</span>
            </div>
            <div className="font-mono text-[10px]">
                SYSTEM_STATUS: <span className="text-green-600">ONLINE</span>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default Landing;