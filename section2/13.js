//implementaion of routing
const http = require("http");
const url = require("url");
const server = http.createServer((req,res) =>{
    console.log(req.url);
    const pathname = req.url;
    if(pathname === '/' || pathname ==='/overview'){
        res.end("This is an Overview page");
    }
    else if(pathname === '/product'){
        res.end("This is an Product page");
    }
    else if(pathname === '/api'){
        res.end("This is an API page");
    }
    else{
        res.writeHead(404,{
            'content-type': 'text/html', //now page is expecting some html code
            'my-own-header': 'hello-world',  //my own made-up header
        }); //the response headers and the status codes(404) always should pe placed before res.end(respond code)
        res.end("<h1>page not found</h1>");
    }
})
server.listen(8000,() =>{
    console.log("Server has started");
})