// add whatever parameters you deem necessary
function longestFall(arr) {
    let best = 1;
    let i = 0;
    let j = 0;

    if (arr.length === 0) return 0;

    while (j < arr.length) {
        if (arr[j] >= arr[j-1]) {
            let count = j - i;
            if (count > best) best = count;
            i = j;
        }
        j++;
    }

    if ((j - i) > best) best = j - i;

    return best;
}

module.exports = longestFall;
