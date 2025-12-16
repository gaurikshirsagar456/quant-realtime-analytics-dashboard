import { useEffect, useState } from "react";

export default function AlertPanel({ zscore }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof zscore === "number" && Math.abs(zscore) > 2) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(t);
    }
  }, [zscore]);

  return (
    <div className="panel">
      <h3>Alerts</h3>
      <p>Alert when |Z| &gt; 2</p>

      {show && (
        <div className="alert-toast">
          🚨 Z-Score Threshold Hit: {zscore.toFixed(2)}
        </div>
      )}
    </div>
  );
}
