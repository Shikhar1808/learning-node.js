// console.log(arguments);
// console.log(require('module').wrapper);

// const C1  =require('./section4/testModule1.js');
// const calc1 = new C1();
// console.log(calc1.add(2,5));

const {add,multiply,divide} = require("./section4/testModule2.js");
console.log(multiply(2,5));
