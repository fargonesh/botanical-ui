
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Check, Search, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', icon, className = '', ...props }) => {
  const baseStyle = "font-mono uppercase tracking-wider transition-all duration-200 active:translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-bio-black focus:ring-offset-2";
  
  const variants = {
    primary: "bg-bio-black text-bio-white hover:bg-bio-red border border-bio-black hover:border-bio-red shadow-[2px_2px_0px_0px_rgba(var(--bio-ink-rgb),0.2)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
    outline: "bg-transparent border border-bio-black text-bio-black hover:bg-bio-black hover:text-bio-white",
    ghost: "bg-transparent text-bio-black hover:bg-bio-black/5 hover:underline",
    destructive: "bg-bio-red text-white border border-bio-red hover:bg-red-700"
  };

  const sizes = {
      sm: "text-[10px] px-3 py-1.5 h-8",
      md: "text-xs px-6 py-3 h-12",
      lg: "text-sm px-8 py-4 h-16"
  };

  return (
    <button className={cn(baseStyle, variants[variant], sizes[size], className)} {...props}>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
    return (
        <div className="relative group w-full">
            {/* Hard shadow instead of blur */}
            <div className="absolute top-1 left-1 w-full h-full bg-bio-black -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
            <input
                ref={ref}
                className={cn(
                    "w-full bg-bio-white border border-bio-black px-4 py-3 font-mono text-sm outline-none placeholder:text-bio-black/30 placeholder:uppercase transition-transform duration-200 group-focus-within:-translate-y-1 group-focus-within:-translate-x-1 text-bio-black disabled:opacity-50 focus:border-bio-red",
                    className
                )}
                {...props}
            />
        </div>
    );
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
    return (
        <div className="relative group w-full">
            <div className="absolute top-1 left-1 w-full h-full bg-bio-black -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
            <textarea
                ref={ref}
                className={cn(
                    "w-full bg-bio-white border border-bio-black px-4 py-3 font-mono text-sm outline-none placeholder:text-bio-black/30 placeholder:uppercase transition-transform duration-200 group-focus-within:-translate-y-1 group-focus-within:-translate-x-1 min-h-[100px] text-bio-black focus:border-bio-red",
                    className
                )}
                {...props}
            />
        </div>
    );
});

export const Checkbox: React.FC<{ checked?: boolean, onChange?: (checked: boolean) => void, label?: string }> = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
        <div className="relative w-5 h-5 border border-bio-black bg-bio-white flex items-center justify-center transition-all group-hover:shadow-[2px_2px_0px_0px_currentColor] group-focus-within:ring-2 group-focus-within:ring-bio-black/20">
             {checked && <div className="w-3 h-3 bg-bio-black" />}
            <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
        </div>
        {label && <span className="font-mono text-xs uppercase pt-0.5 text-bio-black">{label}</span>}
    </label>
);

export const Switch: React.FC<{ checked?: boolean, onChange?: (checked: boolean) => void, label?: string }> = ({ checked, onChange, label }) => (
    <div className="flex items-center gap-3">
        <button 
            onClick={() => onChange?.(!checked)}
            className={cn(
                "relative w-12 h-6 border border-bio-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bio-black/20",
                checked ? "bg-bio-green" : "bg-bio-gray"
            )}
            type="button"
        >
            <div className={cn(
                "absolute top-0.5 bottom-0.5 w-5 bg-bio-black transition-all duration-200",
                checked ? "right-0.5" : "left-0.5"
            )} />
        </button>
        {label && <span className="font-mono text-xs uppercase text-bio-black">{label}</span>}
    </div>
);

export const Slider: React.FC<{ value: number, min?: number, max?: number, onChange: (val: number) => void }> = ({ value, min = 0, max = 100, onChange }) => (
    <div className="w-full h-6 flex items-center gap-4">
        <input 
            type="range" 
            min={min} 
            max={max} 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-1 bg-bio-black/20 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-bio-black/20 rounded [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-bio-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-bio-black [&::-webkit-slider-thumb]:hover:bg-bio-red [&::-webkit-slider-thumb]:transition-colors"
        />
        <span className="font-mono text-xs w-8 text-right text-bio-black">{value}</span>
    </div>
);

export const Select: React.FC<{ options: {value: string, label: string}[], value?: string, onChange?: (val: string) => void, className?: string }> = ({ options, value, onChange, className }) => (
    <div className="relative group">
         <div className="absolute top-1 left-1 w-full h-full bg-bio-black -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
        <select 
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
                "w-full bg-bio-white border border-bio-black px-4 py-3 font-mono text-sm outline-none appearance-none cursor-pointer rounded-none uppercase transition-transform duration-200 group-focus-within:-translate-y-1 group-focus-within:-translate-x-1 text-bio-black focus:border-bio-red", 
                className
            )}
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-bio-black" />
    </div>
);

export const RadioGroup: React.FC<{ options: {value: string, label: string}[], value: string, onChange: (val: string) => void, name: string }> = ({ options, value, onChange, name }) => (
    <div className="flex flex-col gap-2">
        {options.map(opt => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group focus-within:ring-1 focus-within:ring-bio-black/20 p-1 -m-1 rounded-sm">
                 <div className={cn(
                     "w-5 h-5 border border-bio-black flex items-center justify-center transition-all group-hover:shadow-[2px_2px_0px_0px_currentColor]",
                     value === opt.value ? "bg-bio-black" : "bg-bio-white"
                 )}>
                    {value === opt.value && <div className="w-2 h-2 bg-bio-green" />}
                 </div>
                 <input 
                    type="radio" 
                    name={name} 
                    value={opt.value} 
                    checked={value === opt.value} 
                    onChange={() => onChange(opt.value)} 
                    className="sr-only"
                 />
                 <span className="font-mono text-xs uppercase pt-0.5 text-bio-black">{opt.label}</span>
            </label>
        ))}
    </div>
);

export const Combobox: React.FC<{ options: {value: string, label: string}[], value?: string, onChange: (val: string) => void, placeholder?: string }> = ({ options, value, onChange, placeholder = "Select..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()));
    const selectedLabel = options.find(opt => opt.value === value)?.label;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(i => (i + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(i => (i - 1 + filteredOptions.length) % filteredOptions.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    onChange(filteredOptions[highlightedIndex].value);
                    setIsOpen(false);
                    setSearch('');
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    return (
        <div className="relative group w-full" ref={wrapperRef}>
            <div className="absolute top-1 left-1 w-full h-full bg-bio-black -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
            
            <div 
                className={cn(
                    "w-full bg-bio-white border border-bio-black px-4 py-3 flex items-center justify-between cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bio-black/10", 
                    isOpen && "-translate-y-1 -translate-x-1"
                )}
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <span className={cn("font-mono text-sm uppercase", !selectedLabel && "text-bio-black/50")}>
                    {selectedLabel || placeholder}
                </span>
                <ChevronDown size={14} className="text-bio-black" />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-bio-white border border-bio-black z-50 shadow-[4px_4px_0px_0px_rgba(var(--bio-ink-rgb),1)]">
                    <div className="p-2 border-b border-bio-black flex items-center gap-2">
                        <Search size={14} className="text-bio-black/50" />
                        <input 
                            ref={inputRef}
                            className="w-full bg-transparent outline-none font-mono text-xs uppercase text-bio-black placeholder:text-bio-black/30"
                            placeholder="Filter..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setHighlightedIndex(0);
                            }}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto no-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, i) => (
                                <div 
                                    key={opt.value}
                                    className={cn(
                                        "px-4 py-2 cursor-pointer flex items-center justify-between font-mono text-xs uppercase transition-colors",
                                        i === highlightedIndex ? "bg-bio-black text-bio-white" : "hover:bg-bio-black hover:text-bio-white text-bio-black"
                                    )}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check size={12} />}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-bio-black/50 font-mono text-xs uppercase text-center">No results</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const Calendar: React.FC<{ selected?: Date, onSelect: (date: Date) => void }> = ({ selected, onSelect }) => {
    const [viewDate, setViewDate] = useState(selected || new Date());
    
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const padding = Array.from({ length: firstDay }, (_, i) => i);
    
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const changeMonth = (delta: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
    };

    const isSelected = (day: number) => {
        return selected && selected.getDate() === day && selected.getMonth() === viewDate.getMonth() && selected.getFullYear() === viewDate.getFullYear();
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === viewDate.getMonth() && today.getFullYear() === viewDate.getFullYear();
    };

    return (
        <div className="w-full max-w-xs border border-bio-black bg-bio-white p-4 select-none" role="application" aria-label="Calendar">
            <div className="flex justify-between items-center mb-4 border-b border-bio-black pb-2">
                <button 
                    onClick={() => changeMonth(-1)} 
                    className="hover:text-bio-red p-1 focus:outline-none focus:ring-2 focus:ring-bio-black"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={16} />
                </button>
                <div className="font-mono font-bold">
                    {months[viewDate.getMonth()]} <span className="text-bio-black/50">{viewDate.getFullYear()}</span>
                </div>
                <button 
                    onClick={() => changeMonth(1)} 
                    className="hover:text-bio-red p-1 focus:outline-none focus:ring-2 focus:ring-bio-black"
                    aria-label="Next month"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                    <div key={i} className="text-center font-mono text-[10px] text-bio-black/50">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {padding.map((_, i) => <div key={`pad-${i}`} />)}
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => onSelect(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                        className={cn(
                            "h-8 flex items-center justify-center font-mono text-sm border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-bio-black hover:border-bio-black",
                            isSelected(day) ? "bg-bio-black text-bio-white border-bio-black" : "bg-transparent text-bio-black",
                            isToday(day) && !isSelected(day) ? "text-bio-red font-bold" : ""
                        )}
                        aria-label={`Select ${day} ${months[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
                        aria-pressed={isSelected(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const TimeInput: React.FC<{ value?: string, onChange?: (val: string) => void }> = ({ value, onChange }) => (
    <div className="relative group w-full max-w-[150px]">
        <div className="absolute top-1 left-1 w-full h-full bg-bio-black -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
        <div className="relative">
            <input 
                type="time"
                value={value}
                onChange={e => onChange?.(e.target.value)}
                className="w-full bg-bio-white border border-bio-black px-4 py-3 font-mono text-sm outline-none uppercase transition-transform duration-200 group-focus-within:-translate-y-1 group-focus-within:-translate-x-1 text-bio-black appearance-none focus:border-bio-red"
            />
            <Clock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-bio-black/50" />
        </div>
    </div>
);
