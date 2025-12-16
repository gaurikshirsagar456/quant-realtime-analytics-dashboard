# 📊 Quant Real-Time Analytics Dashboard

A **full-stack real-time quantitative analytics system** that ingests
live Binance tick data, performs rolling statistical arbitrage
analytics, and visualizes results in an interactive trading-style
dashboard.

This project demonstrates **end-to-end quant engineering**: - Real-time
WebSocket ingestion - Time-series storage - Rolling quantitative
analytics - Fast REST APIs - Live frontend updates with professional
trading UI

------------------------------------------------------------------------

## 🚀 Features

### 🔹 Data Ingestion

-   Live **Binance WebSocket** tick stream\
-   Tick data format:

``` json
{ "timestamp": "...", "symbol": "BTCUSDT", "price": 43210.5, "qty": 0.01 }
```

-   Background ingestion thread
-   Stored in **SQLite** (pluggable to PostgreSQL / Redis)

### 🔹 Sampling & Timeframes

-   **1s (tick-level)**
-   **1m resampled**
-   **5m resampled**

### 🔹 Quant Analytics (Rolling Window)

-   OLS **Hedge Ratio (β)**
-   **Spread** calculation
-   **Z-Score** (rolling)
-   **ADF stationarity test**
-   **Trading signal logic**
    -   `LONG` → Z \< -2
    -   `SHORT` → Z \> 2
    -   `NEUTRAL` otherwise

### 🔹 Live Frontend Dashboard

-   Live price charts (TradingView-style)
-   Live spread & z-score chart
-   Animated metrics (flash on change)
-   Rolling window controls
-   Timeframe selector (1s / 1m / 5m)
-   Alerts for Z-Score thresholds
-   CSV export

### 🔹 Performance-Aware Updates

  Component           Update Frequency
  ------------------- ------------------------
  Tick Prices         500ms -- 1s
  Spread & Z-Score    500ms
  Analytics Metrics   500ms
  1m / 5m Charts      On interval completion

------------------------------------------------------------------------

## 🧠 System Architecture

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/fd2bf10e-11fc-45da-a4de-66b93d84094b" />

------------------------------------------------------------------------

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f85f605b-759e-4c26-9a2e-3168fe770a55" />

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Python 3.10+
-   FastAPI
-   SQLAlchemy
-   Pandas / NumPy
-   Statsmodels
-   Binance WebSocket
-   SQLite

### Frontend

-   React
-   Plotly.js
-   REST API polling
-   Custom Trading UI (Dark Theme)

------------------------------------------------------------------------

## 📁 Project Structure

    quant-realtime-dashboard/
    │
    ├── backend/
    │   ├── app.py
    │   ├── database.py
    │   ├── websocket_ingest.py
    │   ├── analytics/
    │   │   ├── regression.py
    │   │   ├── stats.py
    │   │   └── stationarity.py
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── styles/
    │   └── package.json
    │
    └── README.md

------------------------------------------------------------------------

## ▶️ How to Run the Project

### 1️⃣ Backend Setup

``` bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
```

``` bash
pip install -r requirements.txt
```

``` bash
python -m uvicorn app:app --reload
```

Backend runs at:

    http://localhost:8000

------------------------------------------------------------------------

### 2️⃣ Frontend Setup

``` bash
cd frontend
npm install
npm start
```

Frontend runs at:

    http://localhost:3000

------------------------------------------------------------------------

## 📤 CSV Export

-   Download tick data per symbol
-   API:

```{=html}
<!-- -->
```
    /export?symbol=BTCUSDT

------------------------------------------------------------------------

## 🚨 Alerts

-   Alert triggers when:

```{=html}
<!-- -->
```
    |Z-Score| > 2

------------------------------------------------------------------------

## 👤 Author

**Gauri Kshirsagar**\
B.Tech Computer Engineering\
Quant / Software Developemt / Full-Stack / Data Engineering Enthusiast
