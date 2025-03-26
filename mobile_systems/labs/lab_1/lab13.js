function min(...values) {
  var min = values[0];
  values.forEach((val) => {
    val < min ? min = val : {};
  });
  return min;
}

function max(...values) {
  var max = values[0];
  values.forEach((val) => {
    val > max ? max = val : {};
  })
  return max;
}

console.log(min(4, 8, 1, 3));
console.log(max(4, 6, 5, 3, 2));
