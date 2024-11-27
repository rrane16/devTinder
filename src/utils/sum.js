function sum(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
console.log("this", this);

module.exports = { sum, multiply };
console.log("module.exports in sum.js", module.exports);

console.log("this", this); // thid thid why not showing module.exports value???
