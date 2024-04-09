const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');

const DB = process.env.DATABASE;

mongoose.connect(DB,{  //,connetct() will return a promise and we will handel it using a .then()
    // useNewUrlParser: true,
    retryWrites: true, //ye rakhna important hai
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true//No longer needed
}).then(con =>{
    // console.log(con.connections);
    console.log('DB connected succesfull');

}).catch((err) =>{
    console.log('Database not connceted')
})

// const tourSchema = new mongoose.Schema({  //Schema defines the structure and properties of the document in the MongoDB collection
//     name: {
//         type: String,
//         required: [true, "A tour must have a name"],
//         unique: true
//     },
//     rating: {
//         type: Number,
//         default: 4.5
//     },
//     price: {
//         type: Number,
//         required: [true, 'A tour must have a price']
//     }
// });
// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//     name: "The Forest Hiker",
//     rating: 4.7,
//     price: 497
// })

// testTour.save().then(doc => { //to not get the duplicate key error, we have to delete the tours collection multiple times everytime we save the file and restart the server after that.
//     // the error is comming because we set the name to be unique
//     console.log(doc);
// }).catch(err =>{
//     console.log("ERROR",err)
// }) //it will save ti data in the database
// console.log(app.get('env'));
// console.log(process.env);



const port = process.env.port;
app.listen(port, () => {  //to start the server
    console.log(`App running on port ${port}....`);
});