// add whatever parameters you deem necessary
function countPairs(arr, target) {
    let count = 0;
    let targets = new Map();

    for (let num of arr) {  
        if (targets.has(num)) count++;
        else targets.set(target - num, 1)
    }

    return count;
}

module.exports = countPairs;
