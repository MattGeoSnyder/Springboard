function curriedAdd(total) {
    if (total === undefined) return 0;
    return function add(num) {
        if (num === undefined) return total;
        total += num;
        return add;
    }
}

console.log(typeof curriedAdd(1));
console.log(typeof curriedAdd(1)(2));

module.exports = { curriedAdd };
