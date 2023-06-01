function curriedAdd(total) {
    let sum = 0;
    if (total) {
        sum += total;
        return function () {
            return sum;
        }
    } else {
        return sum;
    }
}

console.log(typeof curriedAdd(1));
console.log(typeof curriedAdd(1)(2));

module.exports = { curriedAdd };
