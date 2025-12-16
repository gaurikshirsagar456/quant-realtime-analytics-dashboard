const API = "http://localhost:8000";

export const getAnalytics = (a, b, tf, w) =>
  fetch(
    `${API}/analytics?sym1=${a}&sym2=${b}&timeframe=${tf}&window=${w}`
  ).then((r) => r.json());

export const getPrices = (symbol, tf) =>
  fetch(
    `${API}/prices?symbol=${symbol}&timeframe=${tf}`
  ).then((r) => r.json());

export const getSpread = (a, b, tf, w) =>
  fetch(
    `${API}/spread?sym1=${a}&sym2=${b}&timeframe=${tf}&window=${w}`
  ).then((r) => r.json());

export const exportCSV = (symbol) => {
  window.open(`${API}/export?symbol=${symbol}`, "_blank");
};
