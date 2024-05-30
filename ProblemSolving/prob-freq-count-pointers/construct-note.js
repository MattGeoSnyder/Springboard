let freq = require('./frequency-counter');
// add whatever parameters you deem necessary
function constructNote(message, letters) {
    let messageCount = freq(message);
    let lettersCount = freq(letters);

    for (let [key, value] of messageCount) {
        if (!lettersCount.has(key)) return false;
        if (lettersCount.get(key) < value) return false;
    }

    return true;
}

module.exports = constructNote;