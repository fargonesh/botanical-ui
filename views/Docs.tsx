import React, { useState } from 'react';
import { 
    Button, Input, Textarea, Checkbox, Switch, Slider, Select, RadioGroup, Combobox,
    Calendar, TimeInput, Badge, Alert, Progress, Skeleton, Avatar, Kbd,
    Accordion, Tabs, Table, Chart, Heading, Text, BrutalCard, ImageFrame,
    Barcode, Terminal, AnalogueClock, Modal, Drawer, CommandPalette, ContextMenu,
    SectionHeader, Separator, Sidebar, SidebarHeader, SidebarContent, SidebarItem
} from '../components/_mod';
import { DocWrapper } from '../components/DocWrapper';
import { ArrowLeft, Box, Layout, Type, MousePointer, Activity } from 'lucide-react';

interface DocsProps {
    onBack: () => void;
}

const Docs: React.FC<DocsProps> = ({ onBack }) => {
    const [activeSection, setActiveSection] = useState('typography');

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex h-screen bg-bio-white overflow-hidden">
            <Sidebar className="w-64 hidden lg:flex shrink-0">
                <SidebarHeader>
                     <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={onBack} className="px-2">
                            <ArrowLeft size={16} />
                        </Button>
                        <span className="font-serif font-bold">Documentation</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <div className="mb-4">
                        <p className="px-3 py-2 font-mono text-[10px] uppercase opacity-50">Foundation</p>
                        <SidebarItem label="Typography" icon={<Type size={14}/>} active={activeSection === 'typography'} onClick={() => scrollToSection('typography')} />
                        <SidebarItem label="Layout & Cards" icon={<Layout size={14}/>} active={activeSection === 'layout'} onClick={() => scrollToSection('layout')} />
                    </div>
                     <div className="mb-4">
                        <p className="px-3 py-2 font-mono text-[10px] uppercase opacity-50">Components</p>
                        <SidebarItem label="Forms & Inputs" icon={<Box size={14}/>} active={activeSection === 'forms'} onClick={() => scrollToSection('forms')} />
                        <SidebarItem label="Feedback" icon={<Activity size={14}/>} active={activeSection === 'feedback'} onClick={() => scrollToSection('feedback')} />
                        <SidebarItem label="Data Display" icon={<Layout size={14}/>} active={activeSection === 'data'} onClick={() => scrollToSection('data')} />
                        <SidebarItem label="Overlays" icon={<MousePointer size={14}/>} active={activeSection === 'overlays'} onClick={() => scrollToSection('overlays')} />
                    </div>
                </SidebarContent>
            </Sidebar>

            <main className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
                <div className="max-w-5xl mx-auto pb-32">
                    <div className="mb-16">
                        <h1 className="font-serif text-5xl md:text-7xl mb-4 text-bio-black">Library</h1>
                        <p className="font-mono text-sm max-w-2xl leading-relaxed opacity-70">
                            A complete reference for the Neo-Brutalist botanical interface system. 
                            These components are designed to be stark, high-contrast, and machine-readable.
                        </p>
                    </div>

                    <div id="typography" className="space-y-12">
                         <div className="flex items-center gap-2 mb-8">
                            <Type className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Typography</h2>
                        </div>
                        
                        <DocWrapper 
                            title="Headings" 
                            description="Serif display typography for high impact titles."
                            code={`<Heading level={1}>Heading 1</Heading>\n<Heading level={2}>Heading 2</Heading>\n<Heading level={3}>Heading 3</Heading>`}
                        >
                            <div className="space-y-4">
                                <Heading level={1}>Heading 1</Heading>
                                <Heading level={2}>Heading 2</Heading>
                                <Heading level={3}>Heading 3</Heading>
                            </div>
                        </DocWrapper>

                        <DocWrapper 
                            title="Text Bodies" 
                            description="Standard sans-serif for readability and monospace for technical data."
                            code={`<Text variant="body">Standard body text for long form content.</Text>\n<Text variant="mono">Monospace text for technical data.</Text>\n<Text variant="caption">Caption text for labels.</Text>`}
                        >
                             <div className="space-y-4">
                                <Text variant="body">Standard body text for long form content and descriptions.</Text>
                                <Text variant="mono">Monospace text for technical data, logs, and code.</Text>
                                <Text variant="caption">Caption text for labels and metadata.</Text>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    <div id="forms" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Box className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Forms & Inputs</h2>
                        </div>

                         <DocWrapper 
                            title="Buttons" 
                            description="High contrast interaction points with hard shadows."
                            code={`<Button variant="primary">Primary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="ghost">Ghost</Button>`}
                        >
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>
                        </DocWrapper>

                         <DocWrapper 
                            title="Inputs" 
                            description="Standard text inputs with focus animations."
                            code={`<Input placeholder="Enter data..." />\n<Input disabled placeholder="Disabled" />`}
                        >
                            <div className="space-y-4 max-w-sm w-full">
                                <Input placeholder="Enter data..." />
                                <Input disabled placeholder="Disabled input" />
                            </div>
                        </DocWrapper>

                        <DocWrapper 
                            title="Controls" 
                            description="Selection controls for booleans and options."
                            code={`<Checkbox label="Confirm Protocol" checked={true} />\n<Switch label="System Power" checked={true} />\n<Slider value={50} min={0} max={100} />`}
                        >
                            <div className="space-y-6 max-w-sm w-full">
                                <Checkbox label="Confirm Protocol" checked={true} />
                                <Switch label="System Power" checked={true} />
                                <Slider value={50} min={0} max={100} onChange={()=>{}} />
                            </div>
                        </DocWrapper>

                         <DocWrapper 
                            title="Advanced Selectors" 
                            description="Complex inputs for specific data types."
                            code={`<Combobox options={[{value:'a', label:'Option A'}]} />\n<Calendar />\n<TimeInput />`}
                        >
                            <div className="space-y-6 max-w-sm w-full">
                                <Combobox 
                                    placeholder="Select Item..."
                                    options={[
                                        { value: 'opt1', label: 'Option 1' },
                                        { value: 'opt2', label: 'Option 2' },
                                        { value: 'opt3', label: 'Option 3' }
                                    ]}
                                    onChange={()=>{}}
                                />
                                <div className="flex gap-4">
                                    <TimeInput />
                                    <div className="bg-bio-white border border-bio-black p-2">
                                        <Calendar onSelect={() => {}} />
                                    </div>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    <div id="layout" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Layout className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Layout & Cards</h2>
                        </div>

                        <DocWrapper 
                            title="Brutal Card" 
                            description="The fundamental container unit. Supports decorative elements."
                            code={`<BrutalCard title="Basic Card">\n  Content goes here...\n</BrutalCard>\n\n<BrutalCard title="Decorated" decoration="thorns">\n  With floral decoration\n</BrutalCard>`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                <BrutalCard title="Basic Card" className="min-h-[150px]">
                                    <p className="font-mono text-xs p-4">Standard container unit.</p>
                                </BrutalCard>
                                <BrutalCard title="Decorated" decoration="thorns" className="min-h-[150px]">
                                    <p className="font-mono text-xs p-4">Features SVG thorn decorations in corners.</p>
                                </BrutalCard>
                            </div>
                        </DocWrapper>

                         <DocWrapper 
                            title="Aesthetic Elements" 
                            description="Visual fluff to enhance the brutalist machine vibe."
                            code={`<Barcode />\n<ImageFrame src="..." caption="Figure 1" />`}
                        >
                            <div className="space-y-8 w-full max-w-xs">
                                <Barcode />
                                <ImageFrame src="https://picsum.photos/seed/doc/400/300" caption="Figure 1.1: Visual Data" />
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                     <div id="feedback" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Feedback & Status</h2>
                        </div>

                         <DocWrapper 
                            title="Alerts & Badges" 
                            description="System status indicators."
                            code={`<Alert variant="warning" title="Warning">System unstable.</Alert>\n<Badge variant="success">Active</Badge>`}
                        >
                            <div className="space-y-4 w-full">
                                <Alert variant="info" title="Note">System operating normally.</Alert>
                                <Alert variant="error" title="Critical">Breach detected.</Alert>
                                <div className="flex gap-2">
                                    <Badge variant="default">Default</Badge>
                                    <Badge variant="outline">Outline</Badge>
                                    <Badge variant="success">Success</Badge>
                                    <Badge variant="destructive">Destructive</Badge>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Docs;