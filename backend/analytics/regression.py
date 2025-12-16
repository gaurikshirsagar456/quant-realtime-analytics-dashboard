import numpy as np
import statsmodels.api as sm

def hedge_ratio(x, y):
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)

    x = sm.add_constant(x)
    model = sm.OLS(y, x).fit()

    return {
        "beta": float(model.params[1]),
        "intercept": float(model.params[0]),
        "r2": float(model.rsquared)
    }
