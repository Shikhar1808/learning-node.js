const http = require("http");
const server =  http.createServer((req,res) =>{
    res.end("Hello World");
})//we created a server and passed a callback function that is executed each time a new request hits the server
server.listen(8000, () =>{ //then we started listing the incmoing reqests on local host
    console.log("Server has started");
})//we did the request by hitting the url
//server didn't closes atomatically

//Routing - differnt actions for differnt URLs