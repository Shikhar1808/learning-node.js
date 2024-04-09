const fs = require('fs');
const server = require("http").createServer();
server.on('request', (req, res) => {
    //solution1
    // fs.readFile('./section4/test-file.txt',(err,data) =>{
    //     if(err){
    //         console.log(err);
    //     }
    //     res.end(data);
    // })


    //solution2: Streams
    // const readable = fs.createReadStream('./section4/test-file.txt');
    // readable.on('data',chunk =>{
    //     res.write(chunk);
    // });
    // readable.on('end',() =>{
    //     res.end(); //This is very important
    // })
    // readable.on('error', err =>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("file not found");
    // })
    //In soln2 there is a probem called backpressure, where the response can't send the data as fast as it is receiving it.


    //Solution2.5
    // const readable = fs.createReadStream("test-file.txt");
    // readable.on("data", chunk => {
    //     if (!res.write(chunk)) {
    //         console.log("backpressure");
    //         readable.pause();
    //     } else {
    //         res.write(chunk);
    //     }
    // });
    // readable.on("end", () => {
    //     res.end();
    // });
    // readable.on("error", err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found!");
    // });

    // res.on("drain", () => {
    //     console.log("drained");
    //     readable.resume();
    // });
    //!res.write(chunk)  returns true or false - if he can handle the data or not.
    //"drain" Event, when all chunks are processed


    //SOlution3: pipe operator
    const readable = fs.createReadStream('./section4/test-file.txt');
    readable.pipe(res); //readableSource.pipe(writeableDestination)
    //pipe operator automatically solves the backpressure of the stream
})
server.listen(8000, () => {
    console.log('Started....');
})