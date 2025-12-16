import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getPrices } from "../services/api";

export default function PriceChart({ symbol, timeframe }) {
  const [data, setData] = useState(null);

  const intervalMs =
    timeframe === "1s" ? 500 : timeframe === "1m" ? 60000 : 300000;

  const fetchPrices = async () => {
    try {
      const res = await getPrices(symbol, timeframe);
      if (res?.prices?.length) setData(res);
    } catch {}
  };

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, intervalMs);
    return () => clearInterval(id);
  }, [symbol, timeframe]);

  if (!data) return <p>Loading {symbol}…</p>;

  return (
    <Plot
      data={[
        {
          x: data.timestamps,
          y: data.prices,
          type: "scatter",
          mode: "lines",
          line: { width: 2 },
          name: symbol,
        },
      ]}
      layout={{
        height: 240,
        paper_bgcolor: "#020617",
        plot_bgcolor: "#020617",
        font: { color: "#e5e7eb" },
        margin: { t: 10 },

        // 🔥 TradingView-style crosshair
        xaxis: {
          showspikes: true,
          spikemode: "across",
          spikesnap: "cursor",
          showline: true,
        },
        yaxis: {
          showspikes: true,
          spikemode: "across",
          spikesnap: "cursor",
        },
      }}
      config={{ displayModeBar: false }}
    />
  );
}
