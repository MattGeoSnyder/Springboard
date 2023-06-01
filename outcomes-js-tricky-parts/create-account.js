function createAccount(pin, amount=0) {
    let balance = amount;
    let PIN = pin;
    return {
        checkBalance (input) {
            if (input == PIN) {
                return `$${balance}`;
            } else {
                return 'Invalid PIN.';
            }
        }, 
        deposit(input, add) {
            if (input === PIN) {
                balance += add;
                return `Successfully deposited ${add} Current balance: ${balance}`;
            } else {
                return `Invalid PIN.`;
            }
        },
        withdrawal(input, sub) {
            if (input === PIN) {
                balance -= sub;
                return `Successfully withdrew ${sub}. Current balance: ${balance}`;
            } else {
                return `Invalid PIN.`;
            }
        },
        changePin(input, newPin) {
            if (input === PIN) {
                PIN = newPin;
                return 'PIN successfully changed!'
            } else {
                return 'Invalid PIN';
            }
        }
    }
}

module.exports = { createAccount };
