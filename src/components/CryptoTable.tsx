"use client";

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCoinMarketData } from '../api/cryptoApi';

interface Coin {
    id: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    // circulating_supply: number;
    image: string;
}

const CryptoTable: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCoinMarketData();
            setCoins(data);
        };
        fetchData();
        const interval = setInterval(fetchData, 10000); // Cập nhật mỗi 10 giây
        return () => clearInterval(interval);
    }, []);

    return (
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Price (USD)</TableCell>
                <TableCell>24h Change (%)</TableCell>
                <TableCell>Market Cap (USD)</TableCell>
                <TableCell>Volume (24h)</TableCell>
                {/* <TableCell>Circulating Supply</TableCell> */}
            </TableRow>
        </TableHead>
        <TableBody>
            {coins.map((coin) => (
                <TableRow key={coin.id}>
                    <TableCell>
                        <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, marginRight: 8 }} />
                        {coin.name}
                    </TableCell>
                    <TableCell>${coin.current_price.toFixed(2)}</TableCell>
                    <TableCell style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                    <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
                    {/* <TableCell>{coin.circulating_supply.toLocaleString()}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    </Table>
    );
};

export default CryptoTable;
