import CryptoChart from "@/components/CryptoChart";
import CryptoTable from "@/components/CryptoTable";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ padding: 20 }}>
          <h1>Crypto Trace Real-Time</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <CryptoTable />
            </div>
            <div style={{ flex: 1, marginLeft: 10 }}>
              <h2>BTC/USDT Real-Time Price</h2>
              <CryptoChart symbol="btcusdt" />
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <p>&copy; 2024 @kaidev99. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
