import pandas as pd

def rolling_correlation(series1, series2, window=50):
    """
    Compute rolling Pearson correlation between two price series.

    Parameters:
    - series1: pd.Series
    - series2: pd.Series
    - window: int

    Returns:
    - pd.Series of rolling correlation values
    """

    if len(series1) < window or len(series2) < window:
        return pd.Series(dtype=float)

    return series1.rolling(window).corr(series2)
