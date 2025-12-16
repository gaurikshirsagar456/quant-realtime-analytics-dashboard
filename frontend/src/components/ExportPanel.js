import { exportCSV } from "../services/api";

export default function ExportPanel({ symbol }) {
  return (
    <div className="panel">
      <h3>Data Export</h3>

    <button
  onClick={() =>
    window.open(
      `http://localhost:8000/export?symbol=${symbol}`,
      "_blank"
    )
  }
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",

    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#ffffff",

    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",

    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.3px",

    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
    transition: "all 0.25s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(37, 99, 235, 0.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 4px 14px rgba(37, 99, 235, 0.35)";
  }}
>
  <span style={{ fontSize: "16px" }}>⬇</span>
  <span>Download {symbol} CSV</span>
</button>

      <p className="hint">
        Includes full tick history for selected symbol
      </p>
    </div>
  );
}
