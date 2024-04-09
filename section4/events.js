const EventEmitter = require("events");
const http = require('http');
// const myEmitter = new EventEmitter();

// myEmitter.on('newSale',() =>{
//     console.log("There is a new sale");
// });
// myEmitter.on('newSale',() =>{
//     console.log('Costumer name: Shikhar');
// });
// myEmitter.on('newSale', stock => {
//     console.log(`There are now ${stock} items left in stock`);
// });
// myEmitter.emit('newSale',9);

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}
const myEmitter = new Sales();
myEmitter.on('newSale', () => {
    console.log("There is a new sale");
});
myEmitter.on('newSale', () => {
    console.log('Costumer name: Shikhar');
});
myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`);
});
myEmitter.emit('newSale', 9);


const server = http.createServer();
server.on('request',(req,res) =>{
    console.log("request recieved");
    console.log(req.url);
    res.end("Request Recieved");
})
server.on('request',(req,res) =>{ //Remember Jonas has already mentioned that only one response can be sent from the server for a particular request.
    // console.log("request recieved");
    // res.end("Another Recieved");
})
server.on('close', () =>{
    console.log("server closed");
})
server.listen(8000,() =>{
    console.log('Waiting for request.......');
})
//the server is emitting the signal twice
//1. for root url  2.favicon.ico