// src/api/binanceWebSocket.ts
interface BinanceTicker {
    e: string;
    E: number;
    s: string;
    p: string;
    P: string;
    w: string;
    x: string;
    c: string;
    Q: string;
    b: string;
    B: string;
    a: string;
    A: string;
    o: string;
    h: string;
    l: string;
    v: string;
    q: string;
}

export const connectBinanceWebSocket = (symbol: string, callback: (data: BinanceTicker) => void) => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
    };

    return () => ws.close();
};
