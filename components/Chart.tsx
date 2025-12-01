
import React, { useRef, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    type: 'line' | 'bar';
    data: number[];
    labels: string[];
    label: string;
    color?: string;
    height?: number;
}

export const Chart: React.FC<ChartProps> = ({ type, data, labels, label, color = '#0a0a0a', height = 200 }) => {
    const chartRef = useRef<any>(null);

    useEffect(() => {
        // Cleanup chart instance on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);
    // Brutalist Chart Config
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#0a0a0a',
                titleFont: { family: 'Space Mono', size: 10 },
                bodyFont: { family: 'Space Mono', size: 12 },
                cornerRadius: 0,
                padding: 10,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { family: 'Space Mono', size: 10 },
                    color: '#0a0a0a'
                },
                border: { display: true, color: '#0a0a0a' }
            },
            y: {
                grid: { 
                    color: 'rgba(10,10,10,0.1)',
                    drawBorder: false,
                },
                ticks: {
                    font: { family: 'Space Mono', size: 10 },
                    color: '#0a0a0a'
                },
                border: { display: true, color: '#0a0a0a' }
            }
        },
        elements: {
            line: {
                tension: 0, // No curves, sharp lines
                borderWidth: 2
            },
            point: {
                radius: 3,
                hoverRadius: 5,
                backgroundColor: '#f4f1ea',
                borderColor: color,
                borderWidth: 2
            },
            bar: {
                borderRadius: 0,
                borderWidth: 1,
                borderColor: '#0a0a0a',
                backgroundColor: color
            }
        }
    };

    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                borderColor: color,
                backgroundColor: type === 'line' ? 'transparent' : color,
            }
        ]
    };

    return (
        <div style={{ height }}>
            {type === 'line' ? (
                <Line ref={chartRef} options={options} data={chartData} />
            ) : (
                <Bar ref={chartRef} options={options} data={chartData} />
            )}
        </div>
    );
};
