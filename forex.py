from forex_python.converter import CurrencyRates, CurrencyCodes
from forex_python.converter import RatesNotAvailableError, DecimalFloatMismatchError
from datetime import datetime

# Initialize objects from Forex module
c = CurrencyRates()
codes = CurrencyCodes()

def convert(curr1, curr2, amount):
    """
        Args: str:curr1, str:curr2, num:amount

        Takes two currencies and converts the amount of curr1 into curr2.

        Return: 
            Dict: {
                'status': str: description of error type if any, else 'okay',
                'conversion': num: amount of curr2 given amount of curr1,
                'symbol': str: currency symbol of curr2
            }


    """

    # Input handling. Inputs must be in all upper case.
    curr1 = curr1.upper()
    curr2 = curr2.upper()

    # Initialize variables for return dictionary, since they are set in try
    # block
    conversion = None
    status = None
    symbol = None

    # Try block handling various errors from module.
    try:
        # gets conversion amount, currency symbol and sets status to okay
        conversion = c.convert(curr1, curr2, amount)
        symbol = codes.get_symbol(curr2)
        status = 'okay'
    except RatesNotAvailableError:
        # Forex error. Comes from unrecognized input
        status = "Invalid currency"
    except DecimalFloatMismatchError:
        # Forex error. Conversion error between two currencies. Developer 
        # of module is working to fix.
        status = "Try a different conversion"
    except ValueError:
        # Amount input is not a number. Occurs if amount field is left blank.
        status = 'Invalid amount'

    return {"status": status, "conversion": conversion, "symbol": symbol}



