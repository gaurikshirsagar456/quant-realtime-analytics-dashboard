import pandas as pd
import numpy as np

def zscore(series, window=50):
    return (series - series.rolling(window).mean()) / series.rolling(window).std()
