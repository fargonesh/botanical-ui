import React, { useState } from 'react';
import { 
    SectionHeader, Button, BrutalCard, Terminal, Ticker, Badge, 
    Tabs, Input, Checkbox, Slider, Switch, Alert, Progress, 
    Chart, Table, Accordion, Heading, Text, AnalogueClock,
    Modal, Drawer, CommandPalette,
    Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem,
    Separator,
    RadioGroup, Combobox, Calendar, TimeInput, Breadcrumb, Kbd, ContextMenu, Avatar
} from '../components/_mod';
import { Search, Disc, Cpu, Sprout, CornerDownLeft, Activity, Layers, Database, Menu, Settings, Bell, PanelRight, Command, Layout, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ViewState } from '../types';

interface DashboardProps {
    onBack: () => void;
    onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [history, setHistory] = useState<string[]>([
        "Initializing Botanical Neural Network...",
        "Loading taxonomy database... [OK]",
        "System ready for input."
    ]);
    const [loading, setLoading] = useState(false);
    const [plantData, setPlantData] = useState<any>(null);

    // UX State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
    
    const { theme, toggleTheme } = useTheme();

    // Mock settings state
    const [settings, setSettings] = useState({
        notifications: true,
        highContrast: false,
        dataSaver: true,
        sensitivity: 75,
        zone: 'zone-a',
        department: 'botany'
    });

    // Calendar state
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setHistory(prev => [...prev, `Analyzing query: "${query}"...`]);
    };

    // --- SUB-VIEWS ---

    const AnalysisView = () => (
        <ContextMenu items={[
            { label: 'Copy Analysis', action: () => alert('Copied'), shortcut: '⌘C' },
            { label: 'Save to Archive', action: () => alert('Saved'), shortcut: '⌘S' },
            { label: 'Delete Log', action: () => alert('Deleted'), destructive: true }
        ]} className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                    <BrutalCard className="flex items-center p-0 border-0 bg-transparent shadow-none hover:shadow-none">
                        <form onSubmit={handleSearch} className="w-full flex gap-4">
                            <Input 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter botanical query or abstract concept..."
                                disabled={loading}
                            />
                            <Button type="submit" disabled={loading} icon={<Search size={16} />}>
                                {loading ? 'Thinking' : 'Scan'}
                            </Button>
                        </form>
                    </BrutalCard>
                    
                    <div className="flex-1 min-h-[400px]">
                        <Terminal lines={history} isLoading={loading} />
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    {plantData ? (
                        <BrutalCard className="h-full flex flex-col justify-between" title="Visual Matrix" decoration="vines">
                            <div className="relative border border-bio-black/20 p-2 mb-4 bg-bio-white">
                                    <img 
                                    src={`https://picsum.photos/seed/${plantData.name}/400/300`} 
                                    alt="Result" 
                                    className="w-full h-48 object-cover filter contrast-125 grayscale" 
                                />
                                <div className="absolute top-2 right-2 bg-bio-red text-white font-mono text-xs px-2 py-1">MATCH FOUND</div>
                            </div>
                            <div className="space-y-4 font-mono text-xs">
                                <div className="flex justify-between border-b border-dashed border-bio-black/30 pb-1">
                                    <span className="opacity-50">LATIN NAME</span>
                                    <span className="uppercase font-bold">{plantData.scientificName}</span>
                                </div>
                                    <div className="flex justify-between border-b border-dashed border-bio-black/30 pb-1">
                                    <span className="opacity-50">ORIGIN</span>
                                    <span className="uppercase">{plantData.origin}</span>
                                </div>
                                <div>
                                    <span className="opacity-50 block mb-1">PROPERTIES</span>
                                    <div className="flex flex-wrap gap-2">
                                        {plantData.properties.map((prop: string, i: number) => (
                                            <Badge key={i} variant="outline" className="bg-bio-white">{prop}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </BrutalCard>
                    ) : (
                        <BrutalCard className="h-full flex items-center justify-center bg-transparent border-dashed min-h-[300px]" title="Status">
                            <div className="text-center opacity-40">
                                <Sprout size={48} className="mx-auto mb-4" />
                                <p className="font-mono text-sm uppercase">Waiting for input stream...</p>
                            </div>
                        </BrutalCard>
                    )}
                </div>
            </div>
        </ContextMenu>
    );

    const MonitorView = () => (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <BrutalCard title="CPU Cycles" decoration="thorns">
                    <div className="mb-4">
                        <Heading level={3}>Processing Load</Heading>
                        <Text variant="caption">Real-time neural activity</Text>
                    </div>
                    <Chart 
                        type="line" 
                        labels={['00s', '10s', '20s', '30s', '40s', '50s', '60s']} 
                        data={[12, 19, 3, 5, 2, 3, 15]} 
                        label="Operations"
                        color="#ff3300"
                    />
                </BrutalCard>
                <BrutalCard title="Memory Allocation">
                    <div className="mb-4">
                        <Heading level={3}>RAM Distribution</Heading>
                        <Text variant="caption">Botanical Database Indexing</Text>
                    </div>
                    <Chart 
                        type="bar" 
                        labels={['Taxonomy', 'Images', 'Cache', 'User', 'Sys']} 
                        data={[65, 40, 25, 80, 20]} 
                        label="Usage (MB)"
                        color={theme === 'dark' ? '#f4f1ea' : '#0a0a0a'}
                    />
                </BrutalCard>
                <BrutalCard title="System Health" className="md:col-span-2">
                    <div className="grid grid-cols-3 gap-8 p-4">
                        <div className="text-center">
                            <div className="text-4xl font-mono font-bold mb-2">98.2%</div>
                            <Badge variant="success">Uptime</Badge>
                        </div>
                        <div className="text-center border-l border-bio-black/10">
                            <div className="text-4xl font-mono font-bold mb-2">42ms</div>
                            <Badge variant="outline">Latency</Badge>
                        </div>
                        <div className="text-center border-l border-bio-black/10">
                            <div className="text-4xl font-mono font-bold mb-2 text-bio-red">12</div>
                            <Badge variant="destructive">Threats</Badge>
                        </div>
                    </div>
                </BrutalCard>
            </div>
            
            <div className="md:col-span-4 flex flex-col gap-6">
                <BrutalCard title="Local Time" className="flex items-center justify-center py-12" decoration="vines">
                    <AnalogueClock />
                </BrutalCard>
                
                <BrutalCard title="Field Operations">
                     <div className="space-y-4">
                         <div className="flex justify-between items-center border-b border-bio-black/10 pb-2">
                             <span className="font-mono text-xs">IRRIGATION_SYS</span>
                             <Badge variant="success">ON</Badge>
                         </div>
                          <div className="flex justify-between items-center border-b border-bio-black/10 pb-2">
                             <span className="font-mono text-xs">DRONE_DEPLOY</span>
                             <Badge variant="outline">SB</Badge>
                         </div>
                          <div className="flex justify-between items-center border-b border-bio-black/10 pb-2">
                             <span className="font-mono text-xs">UV_FILTER</span>
                             <Badge variant="destructive">ERR</Badge>
                         </div>
                     </div>
                </BrutalCard>
            </div>
        </div>
    );

    const LibraryView = () => (
        <div className="space-y-12">
            <div>
                <Breadcrumb items={[
                    { label: 'System', href: '#' },
                    { label: 'Library', href: '#' },
                    { label: 'Components' }
                ]} className="mb-6" />
                
                <Heading level={3} className="mb-6">Interactive Overlays</Heading>
                <div className="flex gap-4">
                    <Button onClick={() => setIsSettingsOpen(true)} icon={<Settings size={16} />}>
                        Open Settings Modal
                    </Button>
                    <Button onClick={() => setIsDrawerOpen(true)} variant="outline" icon={<PanelRight size={16} />}>
                        Open System Drawer
                    </Button>
                     <Button onClick={() => onNavigate(ViewState.DOCS)} variant="primary" icon={<Layout size={16} />}>
                        View Documentation
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs Column */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Heading level={4}>Advanced Inputs</Heading>
                        <Combobox 
                            placeholder="Select Department..."
                            options={[
                                { value: 'botany', label: 'Botany' },
                                { value: 'genetics', label: 'Genetics' },
                                { value: 'robotics', label: 'Robotics' },
                                { value: 'security', label: 'Security' }
                            ]}
                            value={settings.department}
                            onChange={(val) => setSettings(s => ({...s, department: val}))}
                        />
                        <RadioGroup 
                            name="zone"
                            options={[
                                { value: 'zone-a', label: 'Zone A (Safe)' },
                                { value: 'zone-b', label: 'Zone B (Hazard)' },
                                { value: 'zone-c', label: 'Zone C (Quarantine)' }
                            ]}
                            value={settings.zone}
                            onChange={(val) => setSettings(s => ({...s, zone: val}))}
                        />
                         <div className="flex gap-4 items-end">
                             <div className="flex-1">
                                <label className="font-mono text-xs uppercase mb-1 block">Scheduled Scan</label>
                                <TimeInput />
                             </div>
                             <div className="flex-1">
                                <label className="font-mono text-xs uppercase mb-1 block">Iterations</label>
                                <Input type="number" defaultValue={100} />
                             </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <Heading level={4}>Switches & Sliders</Heading>
                        <div className="flex gap-4">
                            <Checkbox 
                                label="Notifications" 
                                checked={settings.notifications} 
                                onChange={(c) => setSettings(s => ({...s, notifications: c}))} 
                            />
                            <Switch 
                                label="High Contrast" 
                                checked={settings.highContrast} 
                                onChange={(c) => setSettings(s => ({...s, highContrast: c}))} 
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="font-mono text-xs uppercase">Sensitivity</label>
                                <span className="font-mono text-xs">{settings.sensitivity}%</span>
                            </div>
                            <Slider 
                                value={settings.sensitivity} 
                                onChange={(v) => setSettings(s => ({...s, sensitivity: v}))} 
                            />
                        </div>
                    </div>
                </div>

                {/* Feedback & Display Column */}
                <div className="space-y-8">
                    <div className="space-y-4">
                         <Heading level={4}>Feedback</Heading>
                        <Alert title="System Warning" variant="warning">
                            Unauthorized access attempt detected in Sector 7G.
                        </Alert>
                        <div className="flex gap-2 items-center">
                            <Badge variant="success">Online</Badge>
                            <Badge variant="destructive">Error</Badge>
                            <Badge variant="outline">Pending</Badge>
                        </div>
                         <div className="flex gap-4 items-center">
                            <Avatar fallback="AU" />
                            <Avatar src="https://picsum.photos/seed/user1/100/100" fallback="JD" size="lg" />
                            <div className="text-xs font-mono">
                                <div className="font-bold">USER_ID_004</div>
                                <div className="opacity-50">Authorized Personnel</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                         <Heading level={4}>Scheduling</Heading>
                         <div className="flex gap-4">
                             <Calendar selected={selectedDate} onSelect={setSelectedDate} />
                             <div className="flex-1 space-y-2">
                                 <BrutalCard title="Shortcuts" className="h-full" decoration="thorns">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span>Search</span>
                                            <div className="flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
                                        </div>
                                        <div className="flex justify-between text-xs font-mono">
                                            <span>Save</span>
                                            <div className="flex gap-1"><Kbd>⌘</Kbd><Kbd>S</Kbd></div>
                                        </div>
                                         <div className="flex justify-between text-xs font-mono">
                                            <span>Close</span>
                                            <Kbd>ESC</Kbd>
                                        </div>
                                    </div>
                                 </BrutalCard>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            
            <Separator />

            <Heading level={4} className="mb-4">Data Structures</Heading>
            <Accordion 
                items={[
                    { title: "Project Phoenix", content: "A resurrection of extinct plant species using generative DNA sequencing." },
                    { title: "Operation Green", content: "Urban reclamation initiatives utilizing aggressive moss variants." },
                    { title: "Protocol 9", content: "Classified." }
                ]}
            />

            <Table 
                headers={['ID', 'Status', 'Zone', 'Timestamp']}
                data={[
                    ['#8821', 'ACTIVE', 'NE-1', '12:00:01'],
                    ['#8822', 'DORMANT', 'SW-4', '12:05:43'],
                    ['#8823', 'ERROR', 'NW-2', '12:15:22'],
                ]}
            />
        </div>
    );

    return (
        <div className="h-screen bg-bio-gray relative flex flex-col overflow-hidden">
            {/* Command Palette available globally */}
            <CommandPalette onNavigate={onNavigate} />
            
            <Ticker text="SYSTEM ONLINE // BOTANICAL DATABASE ACCESS // RESTRICTED AREA // PRESS CTRL+K FOR COMMANDS" />

            <div className="flex-1 flex overflow-hidden">
                
                {/* Sidebar - Fixed to ensure it stretches */}
                <Sidebar className="hidden lg:flex shrink-0 h-full">
                    <SidebarHeader>
                        <div className="flex items-center gap-2">
                            <Cpu className="text-bio-red" />
                            <span className="font-serif font-bold text-lg">BIO-OS</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarItem 
                            label="Dashboard" 
                            icon={<Layout size={16} />} 
                            active={activeSidebarItem === 'dashboard'} 
                            onClick={() => setActiveSidebarItem('dashboard')}
                        />
                         <SidebarItem 
                            label="Analysis" 
                            icon={<Search size={16} />} 
                            active={activeSidebarItem === 'analysis'} 
                            onClick={() => setActiveSidebarItem('analysis')}
                        />
                        <SidebarItem 
                            label="Database" 
                            icon={<Database size={16} />} 
                            active={activeSidebarItem === 'database'} 
                            onClick={() => setActiveSidebarItem('database')}
                            badge="12K"
                        />
                         <SidebarItem 
                            label="System Health" 
                            icon={<Activity size={16} />} 
                            active={activeSidebarItem === 'health'} 
                            onClick={() => setActiveSidebarItem('health')}
                        />
                         <SidebarItem 
                            label="Library" 
                            icon={<Layers size={16} />} 
                            active={activeSidebarItem === 'library'} 
                            onClick={() => setActiveSidebarItem('library')}
                        />
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarItem 
                            label="Exit System" 
                            icon={<CornerDownLeft size={16} />} 
                            onClick={onBack}
                        />
                        <SidebarItem 
                            label="Docs" 
                            icon={<Menu size={16} />} 
                            onClick={() => onNavigate(ViewState.DOCS)}
                        />
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-bio-gray/10">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <span className="font-serif font-bold text-xl">BIO-OS</span>
                        <Button size="sm" variant="outline" onClick={() => setIsDrawerOpen(true)}>
                            <Menu size={16} />
                        </Button>
                    </div>

                    <SectionHeader title="Dashboard" subtitle="Neural Interface V.2.1" index="002" />

                    <div className="mb-8">
                         <div className="flex items-center gap-2 text-[10px] font-mono opacity-50 mb-2">
                            <Command size={12} />
                            <span>TIP: PRESS CTRL+K TO OPEN COMMAND PALETTE</span>
                        </div>
                    </div>

                    <Tabs 
                        tabs={[
                            { label: "Specimen Analysis", content: <AnalysisView /> },
                            { label: "System Monitor", content: <MonitorView /> },
                            { label: "Component Library", content: <LibraryView /> }
                        ]}
                    />
                </main>
            </div>

            {/* Modal for Settings */}
            <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="System Configuration">
                <div className="space-y-6">
                    <p className="font-mono text-sm opacity-70">Configure your local neural link parameters.</p>
                    
                    <div className="p-4 border border-bio-black bg-bio-gray/20">
                        <Heading level={4} className="mb-2">Appearance</Heading>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs uppercase">Interface Theme</span>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={toggleTheme}
                                icon={theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                            >
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </Button>
                        </div>
                    </div>

                    <Input placeholder="API Endpoint Node" defaultValue="https://api.bio-os.net/v1/uplink" />
                    <div className="space-y-3">
                         <Checkbox label="Allow Biometric Data Collection" checked={true} />
                         <Checkbox label="Enable Haptic Feedback" checked={false} />
                         <Checkbox label="Auto-Archive Specimens" checked={true} />
                    </div>
                    <div className="flex justify-end pt-4 border-t border-bio-black/10">
                        <Button onClick={() => setIsSettingsOpen(false)}>Save Changes</Button>
                    </div>
                </div>
            </Modal>

            {/* Drawer for Mobile Menu / Extras */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} side="right">
                <div className="space-y-6">
                    <Heading level={3}>Quick Access</Heading>
                    <div className="space-y-2">
                         <Button variant="ghost" className="w-full justify-start" icon={<Activity size={16} />}>System Status</Button>
                         <Button variant="ghost" className="w-full justify-start" icon={<Bell size={16} />}>Notifications (3)</Button>
                         <Button variant="ghost" className="w-full justify-start" onClick={() => setIsSettingsOpen(true)} icon={<Settings size={16} />}>Preferences</Button>
                         <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate(ViewState.DOCS)} icon={<Layout size={16} />}>Documentation</Button>
                    </div>
                    <Separator />
                    <div className="p-4 bg-bio-black text-bio-white">
                        <div className="font-mono text-xs uppercase mb-2">User Profile</div>
                        <div className="flex items-center gap-4">
                             <Avatar fallback="AV" size="sm" className="bg-bio-white text-bio-black border-none" />
                             <div>
                                <div className="font-serif text-lg">Dr. A. Vance</div>
                                <div className="font-mono text-[10px] opacity-60">Level 5 Clearance</div>
                             </div>
                        </div>
                    </div>
                    <Button variant="destructive" className="w-full" onClick={onBack}>Terminate Session</Button>
                </div>
            </Drawer>
        </div>
    );
};

export default Dashboard;