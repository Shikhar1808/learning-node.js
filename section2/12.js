const http = require("http");
const url = require("url");
const server =  http.createServer((req,res) =>{
    console.log(req.method)
    res.end("Hello World");
})

server.listen(8000, () =>{
    console.log("Server has started");
})