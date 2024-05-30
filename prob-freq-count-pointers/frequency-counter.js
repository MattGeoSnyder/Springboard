function makeFrequencyCounter(arr) {
    let counter = new Map()

    for (let el of arr) {
        let val = counter.get(el);
        counter.set(el, (val + 1) || 1);
    }

    return counter;
}

module.exports = makeFrequencyCounter;