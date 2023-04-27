function addCommas(num) {
    let numStr = String(num).split();
    let startIdx = numStr.indexOf('.');
    let end = numStr.splice(startIdx);
    startIdx--;
    let idx = startIdx;
    while (idx > 0) {
        if (idx % 3 === 0 && idx < startIdx) {
            numStr.splice(idx, 0, ','); 
        }
        idx--;
    }
    let ret = numStr.concat(end);
    return ret.join()
}

console.log(addCommas(1234));
console.log(addCommas(1000000));
console.log(addCommas(9876543210));
console.log(addCommas(6));
console.log(addCommas(-10));
console.log(addCommas(-5678));
console.log(addCommas(12345.678));
console.log(addCommas(31414592.65));
