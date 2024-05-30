// add whatever parameters you deem necessary
function twoArrayObject(keys, vals) {
    let keyIdx = 0;
    let valIdx = 0;

    const obj = {};

    while (keyIdx < keys.length && valIdx < vals.length) {
        obj[keys[keyIdx]] = vals[valIdx];
        keyIdx++;
        valIdx++;
    }

    while (keyIdx < keys.length) {
        obj[keys[keyIdx]] = null;
        keyIdx++;
    }

    return obj;
}

module.exports = twoArrayObject;