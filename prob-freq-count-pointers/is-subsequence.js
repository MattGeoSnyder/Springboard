// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
    let i = 0;
    let j = 0;

    if (str1.length > str2.length) return false;

    while (j < str2.length) {
        if (str1[i] === str2[j]) i++;
        j++;
    }

    return i === str1.length;
}

module.exports = isSubsequence;
