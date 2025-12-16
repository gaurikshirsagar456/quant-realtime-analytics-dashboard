import json
import asyncio
import websockets
from database import SessionLocal, Tick

BINANCE_WS = "wss://stream.binance.com:9443/stream"

SYMBOLS = ["btcusdt", "ethusdt"]

async def ingest():
    streams = "/".join([f"{s}@trade" for s in SYMBOLS])
    url = f"{BINANCE_WS}?streams={streams}"

    async with websockets.connect(url) as ws:
        print("✅ Connected to Binance WebSocket")
        while True:
            msg = json.loads(await ws.recv())
            data = msg["data"]

            db = SessionLocal()
            tick = Tick(
                symbol=data["s"],          # BTCUSDT
                price=float(data["p"]),
                qty=float(data["q"]),
                timestamp=int(data["T"])
            )
            db.add(tick)
            db.commit()
            db.close()

def start_ingestion():
    asyncio.run(ingest())
