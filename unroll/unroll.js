function unroll(squareArray) {
    
    function getSquare(size, iter) {
        if (size === 2) {
            arr.push(squareArray[iter][iter]);
            arr.push(squareArray[iter][iter+1]);
            arr.push(squareArray[iter+1][iter+1]);
            arr.push(squareArray[iter+1][iter]);
        }
        else if (size === 1) {
            arr.push(squareArray[iter][iter]);
        } else {
            //get top
            for (let i = 0; i < size; i++) {
                arr.push(squareArray[iter][iter+i]);
            }
            //get right
            for (let i = 1; i < size -1; i++){
                arr.push(squareArray[iter+i][size+iter-1])
            } 
            //get bottom
            for (let i = size + iter - 1; i >= iter; i--){
                arr.push(squareArray[iter+size-1][i]);
            } 
            //get left
            for (let i = iter+size-2; i > iter; i--) {
                arr.push(squareArray[i][iter]);
            }
        }
    }

    let size = squareArray[0].length;
    let iter = 0;
    let arr = [];
    while (size > 0) {
        getSquare(size, iter);
        iter++;
        size -= 2;
    }
    return arr;
}

module.exports = unroll;
