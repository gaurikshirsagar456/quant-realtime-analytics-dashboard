import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import PriceChart from "../components/PriceChart";
import SpreadChart from "../components/SpreadChart";
import AlertPanel from "../components/AlertPanel";
import ExportPanel from "../components/ExportPanel";
import { getAnalytics } from "../services/api";
import "../styles/theme.css";

export default function Dashboard() {
  const [primaryAsset, setPrimaryAsset] = useState("BTCUSDT");
  const [hedgeAsset, setHedgeAsset] = useState("ETHUSDT");
  const [timeframe, setTimeframe] = useState("1s");
  const [windowSize, setWindowSize] = useState(30);

  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const data = await getAnalytics(
          primaryAsset,
          hedgeAsset,
          timeframe,
          windowSize
        );

        setAnalytics(data);
        setError(null);
      } catch {
        setError("Waiting for live data…");
      }
    }, 500);

    return () => clearInterval(id);
  }, [primaryAsset, hedgeAsset, timeframe, windowSize]);

  return (
    <div className="app-container">
      <Sidebar
        primaryAsset={primaryAsset}
        hedgeAsset={hedgeAsset}
        timeframe={timeframe}
        windowSize={windowSize}
        setPrimaryAsset={setPrimaryAsset}
        setHedgeAsset={setHedgeAsset}
        setTimeframe={setTimeframe}
        setWindowSize={setWindowSize}
      />

      <main className="main-content">
        <div className="header">
          <h1>Quant Real-Time Analytics Dashboard</h1>
          <p>Live statistical arbitrage analytics</p>
        </div>

        {/* Metrics */}
        <div className="metrics-grid">
          <MetricCard
            label="Hedge Ratio (β)"
            value={analytics?.hedge_ratio ?? "—"}
          />

          <MetricCard
            label="Latest Z-Score"
            value={analytics?.zscore ?? "—"}
            highlight={analytics && Math.abs(analytics.zscore) > 2}
          />

          <MetricCard
            label="ADF p-value"
            value={analytics?.adf_pvalue ?? "—"}
          />

          <MetricCard
            label="Signal"
            value={analytics?.signal ?? "WAITING"}
            signal={analytics?.signal}
          />
        </div>

        {/* Prices */}
        <div className="panel">
          <h3>Prices ({timeframe})</h3>
          <PriceChart symbol={primaryAsset} timeframe={timeframe} />
          <PriceChart symbol={hedgeAsset} timeframe={timeframe} />
        </div>

        {/* Spread */}
        <div className="panel">
          <h3>Spread & Z-Score</h3>
          <SpreadChart
            a={primaryAsset}
            b={hedgeAsset}
            timeframe={timeframe}
            windowSize={windowSize}
          />
        </div>

        <div className="panel-grid">
          <AlertPanel zscore={analytics?.zscore} />
          <ExportPanel symbol={primaryAsset} />
        </div>

        {error && <div className="error">{error}</div>}
      </main>
    </div>
  );
}
