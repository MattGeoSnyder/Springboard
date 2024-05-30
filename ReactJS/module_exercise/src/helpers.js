function choice(items) {
    let idx = Math.floor(Math.random()*items.length);
    return items[idx];
}

function remove(items, item) {
    let ret;
    items.forEach((i,idx) => {
        if (i === item) {
            ret = items.splice(idx,1)[0];
        }
    });
    return ret;
}

export {
    choice,
    remove
}