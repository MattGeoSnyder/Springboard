const unroll = require("./unroll");

describe("#unroll", function () {

  const nums = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
  const letters = [["a", "b", "c"],["d", "e", "f"], ["g", "h", "i"]];
  const five = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]];

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it('works for 3x3', function() {
    expect(unroll(letters)).toEqual(["a","b","c","f","i","h","g","d","e"]);
  });

  it('works for 4x4', function () {
    expect(unroll(nums)).toEqual([1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]);
  });

  it('works for 5x5', function() {
    expect(unroll(five)).toEqual([1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]);
  });

});
