const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;


setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 Finished'));

fs.readFile('./test-file.txt', () => {
    console.log("I/O Finished");
    console.log("----------------------")
    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 Finished'));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now()-start,'password encrypted')
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now()-start,'password encrypted')
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now()-start,'password encrypted')
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now()-start,'password encrypted')
    } )
});

console.log("Hello from the top level code");


//Single Thread(Event LOOP)
//Initialize Program -> Execute "Top-Level" code -> Require Modules -> Register event callbacks -> Start Event Loop
//In the above program the oputop will be ->
//Hello from the top level code
//Timer 1 Finished
// I/o Finished
//----------------------
//Process.nextTick (netTick is the part of microtask queue which gets executed afer each phase, or just after one entire tick [Tick is actually a misleading loop])
// Immediate 1 finished
//Immediate 2 Finished
//Timer 2 finished
//Timer 3 finished