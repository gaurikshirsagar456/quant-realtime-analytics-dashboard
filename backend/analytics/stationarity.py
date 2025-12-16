from statsmodels.tsa.stattools import adfuller

def adf_test(series):
    result = adfuller(series.dropna())
    return {"pvalue": result[1], "stationary": result[1] < 0.05}
