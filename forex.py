from forex_python.converter import CurrencyRates, CurrencyCodes
from forex_python.converter import RatesNotAvailableError, DecimalFloatMismatchError
from datetime import datetime

c = CurrencyRates()
codes = CurrencyCodes()

def convert(curr1, curr2, amount):
    curr1 = curr1.upper()
    curr2 = curr2.upper()

    conversion = None
    status = None
    symbol = None
    try:
        conversion = c.convert(curr1, curr2, amount)
        symbol = codes.get_symbol(curr2)
        status = 'okay'
    except RatesNotAvailableError:
        status = "Invalid currency"
    except DecimalFloatMismatchError:
        status = "Try a different conversion"
    except ValueError:
        status = 'Invalid amount'

    return {"status": status, "conversion": conversion, "symbol": symbol}



