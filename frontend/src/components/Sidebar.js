import React from "react";

export default function Sidebar({
  primaryAsset,
  hedgeAsset,
  timeframe,
  windowSize,
  setPrimaryAsset,
  setHedgeAsset,
  setTimeframe,
  setWindowSize,
}) {
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

  return (
    <aside className="sidebar">
      <h3>Strategy Controls</h3>

      <label>Primary Asset</label>
      <select value={primaryAsset} onChange={e => setPrimaryAsset(e.target.value)}>
        {symbols.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label>Hedge Asset</label>
      <select value={hedgeAsset} onChange={e => setHedgeAsset(e.target.value)}>
        {symbols.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label>Timeframe</label>
      <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
        <option value="1s">1s</option>
        <option value="1m">1m</option>
        <option value="5m">5m</option>
      </select>

      {/* ROLLING WINDOW CONTROL (MANDATORY) */}
      <label>Rolling Window</label>
      <input
        type="range"
        min="10"
        max="100"
        step="5"
        value={windowSize}
        onChange={e => setWindowSize(Number(e.target.value))}
      />
      <div className="window-value">
        {windowSize} points
      </div>

      <p className="hint">
        OLS Hedge · Rolling Z-Score · ADF
      </p>
    </aside>
  );
}
