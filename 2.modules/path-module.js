const path = require("path");
console.log(path.sep);// gives the platform specific seperator


const filePath = path.join("/1.modules","app.js");
console.log(filePath);


const base = path.basename(filePath);
console.log(base);


//path.resolve() returns the absolute path
//it accepts a sequence of paths and paths segments and resolves it into an absolute path
const absolute = path.resolve(__dirname,'1.modules','app.js');
console.log(absolute);
