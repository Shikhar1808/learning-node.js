//This is the synchronus approach.

const {readFileSync, writeFileSync} = require("fs");
const first = readFileSync('./textfiles/first.txt',"utf-8")//encoding = utf-8
const second = readFileSync('./textfiles/second.txt',"utf-8")//encoding = utf-8
// console.log(first,second);


writeFileSync(
    './textfiles/third.txt',
    `THE THIRD FILE!!!! \n${first}, \n${second} `,//is file is not present then node will re-write the file with the given values.
    {flag: 'a'}// this parameter helps in appending hte values in the specified file.
)
