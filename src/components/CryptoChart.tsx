"use client";

import { connectBinanceWebSocket } from '@/api/binanceWebSocket';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

interface CryptoChartProps {
    symbol: string; // Binance symbol, e.g., 'btcusdt'
}

const CryptoChart: React.FC<CryptoChartProps> = ({ symbol }) => {
    const [prices, setPrices] = useState<number[]>([]);
    const [timestamps, setTimestamps] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = connectBinanceWebSocket(symbol, (data) => {
            setPrices((prev) => [...prev.slice(-20), parseFloat(data.c)]);
            setTimestamps((prev) => [...prev.slice(-20), new Date().toLocaleTimeString()]);
        });

        return () => unsubscribe();
    }, [symbol]);

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: `${symbol.toUpperCase()} Price`,
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={data} />;
};

export default CryptoChart;
