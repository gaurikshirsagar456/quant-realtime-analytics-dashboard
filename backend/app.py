from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

import threading
import io
import pandas as pd
import numpy as np

from websocket_ingest import start_ingestion
from database import SessionLocal, Tick
from analytics.regression import hedge_ratio
from analytics.stats import zscore
from analytics.stationarity import adf_test

# -----------------------------
# App
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Start ingestion
# -----------------------------
threading.Thread(target=start_ingestion, daemon=True).start()

# -----------------------------
# Helpers
# -----------------------------
def load_ticks():
    db = SessionLocal()
    df = pd.read_sql(db.query(Tick).statement, db.bind)
    db.close()

    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df = df.sort_values("timestamp")
    df = df.set_index("timestamp")

    return df


def resample_prices(df, timeframe):
    if timeframe == "1m":
        return df.resample("1T").last().dropna()
    elif timeframe == "5m":
        return df.resample("5T").last().dropna()
    return df  # 1s (tick-level)


# -----------------------------
# Prices API (1s / 1m / 5m)
# -----------------------------
@app.get("/prices")
def prices(symbol: str, timeframe: str = "1s", limit: int = 200):
    df = load_ticks()
    df = df[df.symbol == symbol.upper()]

    df = resample_prices(df, timeframe)
    df = df.dropna().tail(limit)

    return {
        "timestamps": df.index.astype(str).tolist(),
        "prices": df["price"].astype(float).tolist(),
    }

# -----------------------------
# Spread & Z-Score API
# -----------------------------
@app.get("/spread")
def spread(sym1: str, sym2: str, timeframe: str = "1s", window: int = 50):
    df = load_ticks()
    df = resample_prices(df, timeframe)

    prices = df.pivot_table(
        values="price",
        index=df.index,
        columns="symbol",
        aggfunc="last"
    ).dropna()

    if sym1 not in prices or sym2 not in prices:
        return {}

    p1 = prices[sym1].values[-window:]
    p2 = prices[sym2].values[-window:]

    beta = hedge_ratio(p1, p2)["beta"]
    spread_vals = p1 - beta * p2
    z_vals = zscore(pd.Series(spread_vals), min(20, len(spread_vals)))

    return {
        "spread": spread_vals.tolist(),
        "zscore": z_vals.fillna(0).tolist()
    }

# -----------------------------
# Analytics API (FAST + LIVE)
# -----------------------------
@app.get("/analytics")
def analytics(sym1: str, sym2: str, timeframe: str = "1s", window: int = 30):
    df = load_ticks()
    df = resample_prices(df, timeframe)

    prices = df.pivot_table(
        values="price",
        index=df.index,
        columns="symbol",
        aggfunc="last"
    ).dropna()

    if sym1 not in prices or sym2 not in prices:
        return {}

    p1 = prices[sym1].values[-window:]
    p2 = prices[sym2].values[-window:]

    if len(p1) < 10:
        return {}

    beta = hedge_ratio(p1, p2)["beta"]
    spread = p1 - beta * p2

    spread_series = pd.Series(spread)
    z = zscore(spread_series, min(20, len(spread_series))).iloc[-1]
    adf = adf_test(spread_series)

    signal = "NEUTRAL"
    if z > 2:
        signal = "SHORT"
    elif z < -2:
        signal = "LONG"

    return {
        "hedge_ratio": round(beta, 4),
        "zscore": round(float(z), 2),
        "adf_pvalue": round(adf["pvalue"], 4),
        "signal": signal
    }


# -----------------------------
# CSV Export
# -----------------------------
@app.get("/export")
def export_csv(symbol: str):
    df = load_ticks()
    df = df[df.symbol == symbol.upper()]

    buf = io.StringIO()
    df.to_csv(buf, index=False)
    buf.seek(0)

    return StreamingResponse(
        buf,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={symbol}.csv"},
    )
