function createAccount(pin, amount=0) {
    return {
        checkBalance (input) {
            if (input == pin) {
                return `$${amount}`;
            } else {
                return 'Invalid PIN.';
            }
        }, 
        deposit(input, add) {
            if (input === pin) {
                amount += add;
                return `Succesfully deposited $${add}. Current balance: $${amount}.`;
            } else {
                return `Invalid PIN.`;
            }
        },
        withdraw(input, sub) {
            if (sub > amount) {
                return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            } else if (input === pin) {
                amount -= sub;
                return `Succesfully withdrew $${sub}. Current balance: $${amount}.`;
            } else {
                return `Invalid PIN.`;
            }
        },
        changePin(input, newPin) {
            if (input === pin) {
                pin = newPin;
                return 'PIN successfully changed!'
            } else {
                return 'Invalid PIN.';
            }
        }
    }
}

module.exports = { createAccount };
