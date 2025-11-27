import { cn } from '@/utils';
import React, { useEffect, useState } from 'react';

export function AnalogueClock() {
    const [time, setTime] = useState(new Date());
    const [size, setSize] = useState(300);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const newSize = Math.min(containerWidth, containerHeight, 400) * 0.9;
                setSize(newSize);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secDeg = (seconds / 60) * 360;
    const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="aspect-square relative rounded-full border-4 border-black bg-white flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Markers */}
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const tickLength = i % 3 === 0 ? 12 : 6;
                const radius = size / 2 - 8;
                const x = radius * Math.sin(angle);
                const y = -radius * Math.cos(angle);

                return (
                    <div
                        key={i}
                        className={cn(
                            "absolute bg-black origin-center",
                            i % 3 === 0 ? "w-[2px]" : "w-[1px]"
                        )}
                        style={{
                            height: tickLength,
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${i * 30}deg)`
                        }}
                    />
                );
            })}

            {/* Center dot */}
            <div className="absolute w-3 h-3 bg-red-500 rounded-full z-20" />

            {/* Hour Hand */}
            <div
                className="absolute w-2 bg-black origin-bottom bottom-1/2 z-10 rounded-full"
                style={{ height: size * 0.25, transform: `rotate(${hourDeg}deg)` }}
            />

            {/* Minute Hand */}
            <div
                className="absolute w-[3px] bg-black origin-bottom bottom-1/2 z-10 rounded-full"
                style={{ height: size * 0.35, transform: `rotate(${minDeg}deg)` }}
            />

            {/* Second Hand */}
            <div
                className="absolute w-[2px] bg-red-500 origin-bottom bottom-1/2 z-10"
                style={{ height: size * 0.40, transform: `rotate(${secDeg}deg)` }}
            />

            {/* Decorative Label */}
            <div className="absolute top-[calc(50%_+_2rem)] font-mono text-xs tracking-widest text-black/50">BIO-CHRON</div>
        </div>
    );
}