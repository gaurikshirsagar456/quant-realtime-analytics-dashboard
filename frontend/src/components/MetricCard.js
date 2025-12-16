import { useEffect, useRef, useState } from "react";

export default function MetricCard({ label, value, highlight, signal }) {
  const prev = useRef(null);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (
      typeof value === "number" &&
      typeof prev.current === "number" &&
      value !== prev.current
    ) {
      setFlash(value > prev.current ? "flash-up" : "flash-down");
      setTimeout(() => setFlash(""), 600);
    }
    prev.current = value;
  }, [value]);

  return (
    <div className={`metric-card ${highlight ? "highlight" : ""}`}>
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${flash} ${signal || ""}`}>
        {typeof value === "number" ? value : value}
      </div>
    </div>
  );
}
