// add whatever parameters you deem necessary
function pivotIndex(arr, target) {
    let sum = arr.reduce((acc,val) => acc+=val, 0);

    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        if (total === sum - total - arr[i]) return i;
        total += arr[i];
    }

    return - 1;
}

module.exports = pivotIndex;
