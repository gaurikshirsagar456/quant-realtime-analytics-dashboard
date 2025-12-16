from pydantic import BaseModel
from typing import List

# -----------------------------
# Tick data schema
# -----------------------------
class TickModel(BaseModel):
    timestamp: int
    symbol: str
    price: float
    qty: float


# -----------------------------
# Analytics response schema
# -----------------------------
class AnalyticsResponse(BaseModel):
    hedge_ratio: float
    intercept: float
    r2: float
    zscore: float
    adf_pvalue: float
    stationary: bool
    signal: str


# -----------------------------
# Correlation response schema
# -----------------------------
class CorrelationResponse(BaseModel):
    rolling_correlation: List[float]
