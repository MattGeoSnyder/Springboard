function addCommas(num) {
    let numStr = String(num).split("");
    let idx = numStr.indexOf('.');
    let end;

    if (idx > 0) {
        end = numStr.splice(idx)
    } else {
        idx = numStr.length;
    }

    idx--;
    let count = 1;
    while (idx > 0) {
        if (numStr[idx-1] === '-'){
            break;
        }

        if (count === 3) {
            numStr.splice(idx, 0, ',');
            count = 0;
        }
        idx--;
        count++;
    }
    let ret = numStr.concat(end);
    return ret.join('')
}

module.exports = addCommas;
