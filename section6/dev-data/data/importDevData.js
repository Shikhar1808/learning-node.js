const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require("./../../models/tourModels")

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

//Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//Import data in database
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data Succesfully loaded')
    }catch(err){
        console.log(err);
    }
    // process.exit();
}

//Delete all data from Db
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log('Data Succesfully deleted');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] == '--import'){
    importData();
}
else if(process.argv[2] == '--delete'){
    deleteData();
}

console.log(process.argv)