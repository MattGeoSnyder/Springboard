const freq = require('./frequency-counter');

// add whatever parameters you deem necessary
function sameFrequency(a, b) {
    const arr1 = a.toString().split("");
    const arr2 = b.toString().split("");

    const countA = freq(arr1);
    const countB = freq(arr2);
    for (let [digit, count] of countA) {
        if (countB.get(digit) !== count) return false;
    }

    return true;
}

module.exports = sameFrequency;
