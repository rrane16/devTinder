const { sum, multiply } = require("./utils");

// In browser if we check normally this,self,frames,window all refer to window objkect

console.log("global", global);
console.log("this", this);
//console.log("self", self); //gives self npt defined error it works in browser
//console.log("frames", frames); //gives frames not defined error it works in browser
console.log("globalthis", globalThis);

var a = [4, 5, 6, 7, 8];
globalThis = a;
console.log("globalthis=--------------->>>", globalThis);
console.log("this", this);
console.log("module.exports", module.exports);
console.log("__dirname", __dirname);
console.log("__filename", __filename);

function abc() {
  console.log("this inside function", this); ///this inside a function refer to global object
  //const { sum, multiply } = require("./utils/sum.js"); we are allowed to write this ;ine inside function also
}

abc();
const result = sum(2, 4);
console.log("result", result);

mulResult = multiply(2, 10);
console.log("mulResult", mulResult);
