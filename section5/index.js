const server = require('http');
const fs = require('fs');
const superagent = require('superagent');
const { resolve } = require('path');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject('I could not find the file');
            }
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) {
                reject('I could not write the file');
            }
            resolve('success');
        });
    });
};


//method1
// readFilePro('./dog.txt').then(data =>{
//     console.log(`Breed: ${data}`);
//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`) //.get always return a promise
//     .then(res => {//.thne() performs something if the promise is fullfilled but will not do anything for rejected promise
//         if(err){
//             return console.log(err.message);//error handling if there is an error in the promise
//         }//will not do anything under .then() if there is an error in the promise
//         console.log(res.body.message);
//         fs.writeFile('dog-img.txt',res.body.message, err =>{
//             if(err){
//                 return console.log(err.message);
//             }
//             console.log('random image saved')
//         })
//     })
//     .catch(err =>{
//         console.log(err.message);//.catch() i sused for error and handling or running another chunk of code is the promise is not fullfilled
//     })
// })
//promise befroe getting data is called pending promise
//promise after getting data is called resolved promise




//method 2
// readFilePro(`${__dirname}/dog.txt`) //this piece of code returna promise so we can use .then() funvtion on it
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent
//             .get(`https://dog.ceo/api/breed/${data}/images/random`); ////this piece of code returna promise so we can use .then() funvtion on it
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message) ////this piece of code returna promise so we can use .then() funvtion on it
//     })
//     .then(() => {
//         console.log('Random image saved');
//     })
//     .catch(err => {
//         console.log(err); //for all of this we need only one error handler
//     })


//method 3
const getDogPic = async() =>{ 
    
    //async is a special function that is asynchrnous, it will also automatically return a Promise
    //inside  async function we can have one or more await function

    try{ 
        
        //we use try and catch for error handling
    const data = await readFilePro(`${__dirname}/dog.txt`);
    
    // the await will stop this peice of code until the above promise is resolved, if the promise is resolved then its value changes to the resolved vvalue of the Promise
    
    console.log(`Breed: ${data}`);
    const res01 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res02 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res03 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        //this is done to show how to handle multiple promises at the same time

    const all = await Promise.all([res01,res02,res03]);
    const images = all.map(el => el.body.message)
    console.log(images);

    // console.log(res.body.message);

    await writeFilePro('dog-img.txt', images.join('\n')); 
    
    //this piece of code does not return anything so it is meaningless to its data in any variable; We just want to stop the code just here until it writes the file
    
    console.log('Random image saved');
    }
    
    catch(err){
        console.log(err);
        throw(err);
    }

    return "2: Ready";
}
console.log("1: Will get the dog pics");
getDogPic()
.then(x =>{
    console.log(x);
    console.log("3: Done getting the dogs pics");
})
.catch(err =>{
    console.log("error");
})