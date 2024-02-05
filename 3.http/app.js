const http = require('http');//http module
const server = http.createServer((req,res) =>{
    //first parameter reqresents incoming requests, 
    // console.log(req);
    if(req.url === '/'){
        //Send request to different origin servers based on the URL path.
        res.end('Dynamaxed Hiha')
    }
    if(req.url === '/about'){
        res.end('\nHere is our short history')
    }
    res.end(`
    <h1>OOPS!!</h1>`);
})
server.listen(5000) //this is the post that our server willbe listing to.5000 is a random number