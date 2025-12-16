import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getSpread } from "../services/api";

export default function SpreadChart({ a, b, timeframe, windowSize }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await getSpread(a, b, timeframe, windowSize);
        if (res?.spread?.length) setData(res);
      } catch {}
    }, 500);

    return () => clearInterval(id);
  }, [a, b, timeframe, windowSize]);

  if (!data) return <p>Waiting for spread data…</p>;

  return (
    <Plot
      data={[
        {
          y: data.spread,
          type: "scatter",
          mode: "lines",
          name: "Spread",
        },
        {
          y: data.zscore,
          type: "scatter",
          mode: "lines",
          yaxis: "y2",
          name: "Z-Score",
        },
      ]}
      layout={{
        height: 300,
        paper_bgcolor: "#020617",
        plot_bgcolor: "#020617",
        font: { color: "#e5e7eb" },
        yaxis2: { overlaying: "y", side: "right" },

        // Crosshair
        xaxis: {
          showspikes: true,
          spikemode: "across",
          spikesnap: "cursor",
        },
        yaxis: {
          showspikes: true,
          spikemode: "across",
          spikesnap: "cursor",
        },

        margin: { t: 10 },
      }}
      config={{ displayModeBar: false }}
    />
  );
}
