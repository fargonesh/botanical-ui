import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button, Input, Textarea, Checkbox, Switch, Slider, Select, RadioGroup, Combobox,
    Calendar, TimeInput, Badge, Alert, Progress, Skeleton, Avatar, Kbd,
    Accordion, Tabs, Table, Chart, Heading, Text, BrutalCard, ImageFrame,
    Barcode, Terminal, AnalogueClock, Modal, Drawer, CommandPalette, ContextMenu,
    SectionHeader, Separator, Sidebar, SidebarHeader, SidebarContent, SidebarItem,
    SidebarFooter, Breadcrumb
} from '../components/_mod';
import { DocWrapper } from '../components/DocWrapper';
import { ArrowLeft, Box, Layout, Type, MousePointer, Activity } from 'lucide-react';
import Decorations from '../components/decorations/Decorations';
import { Ticker } from '../components/Complex';

interface DocsProps {
    onBack: () => void;
}

const Docs: React.FC<DocsProps> = ({ onBack }) => {
    const [activeSection, setActiveSection] = useState('typography');
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [contextOpen, setContextOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{
                backgroundImage: `url('/images/gradient.webp')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
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
                        <SidebarItem label="Typography" icon={<Type size={14} />} active={window.location.hash === '#typography'} onClick={() => { window.location.hash = '#typography'; setActiveSection('typography'); document.getElementById('typography')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Layout & Cards" icon={<Layout size={14} />} active={window.location.hash === '#layout'} onClick={() => { window.location.hash = '#layout'; setActiveSection('layout'); document.getElementById('layout')?.scrollIntoView({ behavior: 'smooth' }); }} />
                    </div>
                    <div className="mb-4">
                        <p className="px-3 py-2 font-mono text-[10px] uppercase opacity-50">Components</p>
                        <SidebarItem label="Section Header" icon={<Type size={14} />} active={window.location.hash === '#sectionheader'} onClick={() => { window.location.hash = '#sectionheader'; setActiveSection('sectionheader'); document.getElementById('sectionheader')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Ticker" icon={<Activity size={14} />} active={window.location.hash === '#ticker'} onClick={() => { window.location.hash = '#ticker'; setActiveSection('ticker'); document.getElementById('ticker')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Brutal Card" icon={<Layout size={14} />} active={window.location.hash === '#brutalcard'} onClick={() => { window.location.hash = '#brutalcard'; setActiveSection('brutalcard'); document.getElementById('brutalcard')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Image Frame" icon={<Layout size={14} />} active={window.location.hash === '#imageframe'} onClick={() => { window.location.hash = '#imageframe'; setActiveSection('imageframe'); document.getElementById('imageframe')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Barcode" icon={<Activity size={14} />} active={window.location.hash === '#barcode'} onClick={() => { window.location.hash = '#barcode'; setActiveSection('barcode'); document.getElementById('barcode')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Terminal" icon={<MousePointer size={14} />} active={window.location.hash === '#terminal'} onClick={() => { window.location.hash = '#terminal'; setActiveSection('terminal'); document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Analogue Clock" icon={<Activity size={14} />} active={window.location.hash === '#analogueclock'} onClick={() => { window.location.hash = '#analogueclock'; setActiveSection('analogueclock'); document.getElementById('analogueclock')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Forms & Inputs" icon={<Box size={14} />} active={window.location.hash === '#forms'} onClick={() => { window.location.hash = '#forms'; setActiveSection('forms'); document.getElementById('forms')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Feedback" icon={<Activity size={14} />} active={window.location.hash === '#feedback'} onClick={() => { window.location.hash = '#feedback'; setActiveSection('feedback'); document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Data Display" icon={<Layout size={14} />} active={window.location.hash === '#data'} onClick={() => { window.location.hash = '#data'; setActiveSection('data'); document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Overlays" icon={<MousePointer size={14} />} active={window.location.hash === '#overlays'} onClick={() => { window.location.hash = '#overlays'; setActiveSection('overlays'); document.getElementById('overlays')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Accordion" icon={<Box size={14} />} active={window.location.hash === '#accordion'} onClick={() => { window.location.hash = '#accordion'; setActiveSection('accordion'); document.getElementById('accordion')?.scrollIntoView({ behavior: 'smooth' }); }} />
                        <SidebarItem label="Tabs" icon={<Layout size={14} />} active={window.location.hash === '#tabs'} onClick={() => { window.location.hash = '#tabs'; setActiveSection('tabs'); document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth' }); }} />
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
                    </div>

                    <Separator className="my-16" />

                    {/* Barcode section */}
                    <div id="barcode" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Barcode</h2>
                        </div>
                        <DocWrapper
                            title="Barcode"
                            description="Visual fluff to enhance the brutalist machine vibe."
                            code={`<Barcode />`}
                        >
                            <div className="space-y-8 w-full max-w-xs">
                                <Barcode />
                                <Separator className="my-16" />

                                {/* SectionHeader section */}
                                <div id="sectionheader" className="space-y-12">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Type className="w-6 h-6 text-bio-red" />
                                        <h2 className="font-mono text-xl uppercase tracking-widest">Section Header</h2>
                                    </div>
                                    <DocWrapper
                                        title="Section Header"
                                        description="Displays a section title, subtitle, and index for documentation or UI grouping."
                                        code={`<SectionHeader title="Section Title" subtitle="Section subtitle goes here" index="01" />`}
                                    >
                                        <SectionHeader title="Section Title" subtitle="Section subtitle goes here" index="01" />
                                    </DocWrapper>
                                </div>

                                <Separator className="my-16" />

                                {/* Ticker section */}
                                <div id="ticker" className="space-y-12">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Activity className="w-6 h-6 text-bio-red" />
                                        <h2 className="font-mono text-xl uppercase tracking-widest">Ticker</h2>
                                    </div>
                                    <DocWrapper
                                        title="Ticker"
                                        description="Animated horizontal ticker for status, headlines, or alerts."
                                        code={`<Ticker text="System Online" />`}
                                    >
                                        <Ticker text="System Online" />
                                    </DocWrapper>
                                </div>

                                <Separator className="my-16" />

                                {/* Text section */}
                                <div id="text" className="space-y-12">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Type className="w-6 h-6 text-bio-red" />
                                        <h2 className="font-mono text-xl uppercase tracking-widest">Text</h2>
                                    </div>
                                    <DocWrapper
                                        title="Text"
                                        description="Text component for body, mono, and caption styles."
                                        code={`<Text variant="body">Body text</Text>\n<Text variant="mono">Mono text</Text>\n<Text variant="caption">Caption text</Text>`}
                                    >
                                        <div className="space-y-2">
                                            <Text variant="body">Body text: The quick brown fox jumps over the lazy dog.</Text>
                                            <Text variant="mono">Mono text: 0123456789 ABC xyz</Text>
                                            <Text variant="caption">Caption text: SYSTEM STATUS</Text>
                                        </div>
                                    </DocWrapper>
                                </div>

                                <Separator className="my-16" />

                                {/* Select section */}
                                <div id="select" className="space-y-12">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Box className="w-6 h-6 text-bio-red" />
                                        <h2 className="font-mono text-xl uppercase tracking-widest">Select</h2>
                                    </div>
                                    <DocWrapper
                                        title="Select"
                                        description="Dropdown select input for options."
                                        code={`<Select options={[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]} value="a" onChange={fn} />`}
                                    >
                                        <Select options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C' }]} value="a" onChange={() => { }} />
                                    </DocWrapper>
                                </div>

                                <Separator className="my-16" />

                                {/* RadioGroup section */}
                                <div id="radiogroup" className="space-y-12">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Box className="w-6 h-6 text-bio-red" />
                                        <h2 className="font-mono text-xl uppercase tracking-widest">Radio Group</h2>
                                    </div>
                                    <DocWrapper
                                        title="Radio Group"
                                        description="Radio button group for exclusive selection."
                                        code={`<RadioGroup options={[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]} value="a" onChange={fn} name="example" />`}
                                    >
                                        <RadioGroup options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C' }]} value="a" onChange={() => { }} name="example" />
                                    </DocWrapper>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Terminal section */}
                    <div id="terminal" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <MousePointer className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Terminal</h2>
                        </div>
                        <DocWrapper
                            title="Terminal"
                            description="Live or simulated readouts like terminals."
                            code={`<Terminal lines={["Initializing...","Ready"]} />`}
                        >
                            <Terminal lines={["Boot sequence", "Diagnostics OK"]} />
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Analogue Clock section */}
                    <div id="analogueclock" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Analogue Clock</h2>
                        </div>
                        <DocWrapper
                            title="Analogue Clock"
                            description="Live or simulated readouts like clocks."
                            code={`<AnalogueClock size={120} />`}
                        >
                            <div className="flex items-center justify-center p-4 border border-bio-black bg-bio-white">
                                <AnalogueClock size={120} />
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Overlays section */}
                    <div id="overlays" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <MousePointer className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Overlays</h2>
                        </div>

                        <DocWrapper
                            title="Modal Dialog"
                            description="Modal overlays for focus or confirmation dialogs."
                            code={`<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Modal Title">Modal content</Modal>`}
                        >
                            <Button onClick={() => setModalOpen(true)} variant="primary">Open Modal</Button>
                            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
                                <div className="p-4">This is a modal dialog for important messages or confirmations.</div>
                            </Modal>
                        </DocWrapper>

                        <DocWrapper
                            title="Drawer Side Panel"
                            description="Drawer slides in from the side for menus or quick actions."
                            code={`<Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">Drawer content</Drawer>`}
                        >
                            <Button onClick={() => setDrawerOpen(true)} variant="primary">Open Drawer</Button>
                            <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
                                <div className="p-4">This is a right-side drawer for mobile menus or quick actions.</div>
                            </Drawer>
                        </DocWrapper>

                        <DocWrapper
                            title="Command Palette"
                            description="Global command launcher for quick navigation and actions."
                            code={`<CommandPalette onNavigate={() => {}} /> // Press Ctrl+K to open`}
                        >
                            <div className="p-4 border border-bio-black bg-bio-white">
                                <span className="font-mono text-xs mb-2 block">Press Ctrl+K to open the palette.</span>
                                <CommandPalette onNavigate={() => { }} />
                            </div>
                        </DocWrapper>

                        <DocWrapper
                            title="Context Menu"
                            description="Right-click or custom menu for actions."
                            code={`<ContextMenu items={[{label:'Copy',action:()=>{}}]}>Right-click here</ContextMenu>`}
                        >
                            <ContextMenu items={[{ label: 'Copy', action: () => alert('Copied'), shortcut: '⌘C' }, { label: 'Delete', action: () => alert('Deleted'), destructive: true }]}>
                                <div className="p-4 border border-bio-black bg-bio-white">Right-click or tap for menu.</div>
                            </ContextMenu>
                        </DocWrapper>

                        <DocWrapper
                            title="Sidebar Footer"
                            description="Footer area for sidebar actions."
                            code={`<SidebarFooter><SidebarItem label="Exit" /></SidebarFooter>`}
                        >
                            <Sidebar className="w-64">
                                <SidebarFooter>
                                    <SidebarItem label="Exit" icon={<ArrowLeft size={16} />} />
                                </SidebarFooter>
                            </Sidebar>
                        </DocWrapper>

                        <DocWrapper
                            title="Breadcrumb Navigation"
                            description="Show navigation hierarchy."
                            code={`<Breadcrumb items={[{label:'Home',href:'/'},{label:'Docs'}]} />`}
                        >
                            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs' }]} className="mb-4" />
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Data Display section */}
                    <div id="data" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Layout className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Data Display</h2>
                        </div>

                        <DocWrapper
                            title="Charts & Tables"
                            description="Render numeric and time-series data with Chart and Table components."
                            code={`<Chart type="line" data={data} />\n<Table columns={cols} data={rows} />`}
                        >
                            <div className="space-y-6">
                                <p className="font-mono text-xs opacity-70">Example chart and table (data mocked in examples).</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 border border-bio-black bg-bio-white">
                                        <Chart type="line" data={{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Series', data: [10, 20, 15] }] }} />
                                    </div>
                                    <div className="p-4 border border-bio-black bg-bio-white">
                                        <Table
                                            headers={['Key', 'Value']}
                                            data={[
                                                ['A', 'Alpha'],
                                                ['B', 'Beta'],
                                                ['C', 'Gamma']
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Forms & Inputs section */}
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
                                <Slider value={50} min={0} max={100} onChange={() => { }} />
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
                                    onChange={() => { }}
                                />
                                <div className="flex gap-4">
                                    <TimeInput />
                                    <div className="bg-bio-white border border-bio-black p-2">
                                        <Calendar onSelect={() => { }} />
                                    </div>
                                </div>
                            </div>
                        </DocWrapper>

                        <DocWrapper
                            title="Validation Patterns"
                            description="Common validation patterns and example usage for Inputs and Forms."
                            code={`<Input placeholder="Enter email" />\n// show errors with helper text or Alert components`}
                        >
                            <div className="space-y-4 max-w-md">
                                <Input placeholder="Email address" />
                                <div className="text-[12px] font-mono text-bio-red">Example helper/error text</div>
                                <Textarea placeholder="Notes / description" />
                                <div className="flex gap-2">
                                    <Button variant="primary">Submit</Button>
                                    <Button variant="ghost">Reset</Button>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Layout & Cards section */}
                    <div id="layout" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Layout className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Layout & Cards</h2>
                        </div>

                        <DocWrapper
                            title="Brutal Card"
                            description="The fundamental container unit. Supports decorative elements and decorationSeed for deterministic variants."
                            code={`<BrutalCard title="Basic Card">\n  Content goes here...\n</BrutalCard>\n\n<BrutalCard title="Decorated" decoration={["tl", "br"]} decorationSeed={42}>\n  With floral decoration\n</BrutalCard>\n\n// Props:\n// decoration: 'thorns' | 'vines' | 'none'\n// decorationSeed: number | string\n// title: string\n// className: string`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                <BrutalCard title="Basic Card" className="min-h-[150px]">
                                    <p className="font-mono text-xs p-4">Standard container unit.</p>
                                </BrutalCard>
                                <BrutalCard title="Decorated" decorations={['tl', 'br']} decorationSeed={42} className="min-h-[150px]">
                                    <p className="font-mono text-xs p-4">Features SVG thorn decorations in corners. Seed 42 selects a deterministic variant.</p>
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

                        <DocWrapper
                            title="Decorations"
                            description="Use the `Decorations` utility to place corner and side accents. Props: positions, sizeScale, seed. Seed selects deterministic variant."
                            code={`<Decorations positions={["tl","br"]} sizeScale={1.2} seed={"session-1"} className=\"absolute inset-0 pointer-events-none z-10\" />\n\n// Props:\n// positions: Array<'tl'|'tr'|'bl'|'br'>\n// sizeScale: number\n// seed: number | string\n// className: string`}
                        >
                            <div className="space-y-4">
                                <p className="font-mono text-xs opacity-70">Decorations support per-corner variants, size scaling, and an optional seed for deterministic randomness.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="relative min-h-[150px] border border-bio-black bg-bio-white">
                                        <Decorations positions={["tl", "br"]} sizeScale={1.2} seed="demo-2" className="absolute inset-0 pointer-events-none z-10" />
                                        <div className="p-4 font-mono text-xs">Only TL and BR corners are shown (positions={["tl", "br"]}).</div>
                                    </div>
                                    <BrutalCard title="Decorated (seed=99)" decoration="thorns" decorationSeed={99} className="min-h-[150px]">
                                        <p className="font-mono text-xs p-4">Seed 99 selects a deterministic variant for decorations.</p>
                                    </BrutalCard>
                                </div>
                            </div>
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Accordion section */}
                    <div id="accordion" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Box className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Accordion</h2>
                        </div>
                        <DocWrapper
                            title="Accordion"
                            description="Expandable/collapsible sections for grouped content."
                            code={`<Accordion items={[{title:'Section 1',content:'Content 1'},{title:'Section 2',content:'Content 2'}]} />`}
                        >
                            <Accordion
                                items={[
                                    { title: "Section 1", content: "Content for section 1." },
                                    { title: "Section 2", content: "Content for section 2." },
                                    { title: "Section 3", content: "Content for section 3." }
                                ]}
                            />
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Tabs section */}
                    <div id="tabs" className="space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Layout className="w-6 h-6 text-bio-red" />
                            <h2 className="font-mono text-xl uppercase tracking-widest">Tabs</h2>
                        </div>
                        <DocWrapper
                            title="Tabs"
                            description="Switch between multiple views or content panels."
                            code={`<Tabs tabs={[{label:'Tab 1',content:'Content 1'},{label:'Tab 2',content:'Content 2'}]} />`}
                        >
                            <Tabs
                                tabs={[
                                    { label: "Tab 1", content: <div className="p-4">Content for Tab 1</div> },
                                    { label: "Tab 2", content: <div className="p-4">Content for Tab 2</div> },
                                    { label: "Tab 3", content: <div className="p-4">Content for Tab 3</div> }
                                ]}
                            />
                        </DocWrapper>
                    </div>

                    <Separator className="my-16" />

                    {/* Feedback & Status section */}
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

                        <DocWrapper
                            title="Progress, Skeleton & Avatars"
                            description="Loading states and compact avatars for identity and status displays."
                            code={`<Progress value={60} />\n<Skeleton className=\"w-48 h-6\" />\n<Avatar src=\"...\" />`}
                        >
                            <div className="space-y-4 w-full">
                                <div className="p-4 border border-bio-black bg-bio-white">
                                    <Progress value={65} />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Skeleton className="w-24 h-6" />
                                    <Avatar src="https://picsum.photos/seed/avatar/40/40" />
                                    <Kbd>Esc</Kbd>
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