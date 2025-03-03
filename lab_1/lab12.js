var z = 10, x = 3, y = 5;
var sum = 0;

for (i = 1; i < z; i++) {
  if (i % x == 0 || i % y == 0) {
    sum += i;
  }
}

console.log(sum)
