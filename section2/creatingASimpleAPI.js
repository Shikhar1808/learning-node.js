//API is a service from which we can request some data

const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require('./modules/replaceTemplate');


const data = fs.readFileSync(`${__dirname}/nodeFarmData/data.json`,'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/14/templates/overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/14/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/14/templates/product.html`,'utf-8');
const dataObject = JSON.parse(data);


const server = http.createServer((req,res) =>{
    console.log(req.url);
    const {query,pathname} = url.parse(req.url,true);

    
    //Overview Page
    if(pathname === '/' || pathname ==='/overview'){
        res.writeHead(200,{'content-type': 'text/html',});

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);

        res.end(output);
    }
    //Product Name
    else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
          const product = dataObject[query.id];
          const output = replaceTemplate(tempProduct, product);
          res.end(output);
    }
    //API
    else if(pathname === '/api'){
        res.writeHead(200,{'content-type': 'application/json',});
        res.end(data);
    }
    //Not FOound
    else{
        res.writeHead(404,{
            'content-type': 'text/html',
            'my-own-header': 'hello-world', });
        res.end("<h1>page not found</h1>");}
        });
server.listen(8000,() =>{
    console.log("Server has started");
})