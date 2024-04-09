// const fs = require('fs');
const APIFeatures = require('./../utils/APIFeatures');
const Tour = require('./../models/tourModels');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


// exports.checkID = (req,res,next,val) =>{
//     console.log(`Tour id is ${val}`); //val is the /val of id number
//     if(req.params.id*1){ //check-soln2
//         return res.status(404).json({
//             status: 'fail',
//             message:'Invalid ID'
//         })
//     }
//     next();
// }
//We are cleaning the code beacuse we are right now not dealing with the data in the JSON file but dealing with the data in MongoDB
//We no longer needed the above code because MongDb givs the unique ID so we dont need to check it. MongoDb automaticaly gives error for invalid ID

// exports.checkBody = (res,req,next) =>{
//     //Create a checkbody middleware
// //Check if body contains the name and price property
// //if, not, send back 400(bad request)
//     if(!res.body.name || !req.body.price){
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }
//     next();
// }




exports.getAllTours = async (req, res) => {
    try {
        // Queries

        // Filtering
        // const queryObj = {...req.query};
        // const excludefields = ['page','sort','limit','fields'];
        // excludefields.forEach(el => delete queryObj);

        // //Advance Filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));

        //Advance filtering is creating the issue here
        //Checking after completing Section-8

        // let query = Tour.find();

        //Sorting
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     console.log(sortBy)
        //     query = query.sort(sortBy);
        // }
        // else{
        //     query = query.sort('-createdAt');
        // }
        //This thing is creting the issue in Pagination
        //According to documentation at Mongo when using $skip with $sort it is advised to include _id or another unique identifier as any duplicates can cause errors (as we have seen).
        //Check tourModel.js for more instructions(point for me obv)

        //Field Limiting
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // }
        // else {
        //     query = query.select('-__v');
        // }

        //Pagination
        // const page = req.query.page * 1 || 1; //for settiing the default value
        // const limit = req.query.limit * 1 || 3;
        // const skip = (page - 1) * limit;
        // //query?page=2&limit=3 //each page will have 3 results and page no 2 will be diplayed
        // query = query.skip(skip).limit(limit) //three results will be skipped
        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) {
        //         throw new Error('This page does not exist');
        //     }
        // }

        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
        //Here, we are creating a new object in which we are passing a query object and the query string we get from Express
        //We use the 4 methods to manipulate the query and at last we await the result
        const tours = await features.query;
        //query.sort().select().limit()


        // .where('duration').equals(5)
        // .where('difficulty').equals("easy")
        //if we dont pass anything in there then it will return all the data in the database
        res.status(200).json({
            status: 'success', //JSEND data specification
            results: tours.length,
            data: {
                tours: tours //isko sirf tours likh bhi chodh sakte the kyuki ES6 me key aur vlaue agr same name ke ho to ek baar hi likh sakte hai
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getTour = async (req, res) => { //by using/:id we are making or using a variable
    // if i want to make the variable r parameter optional then i will use    /:id?
    // console.log(req.params);//.params store all the parameters
    // const id = req.params.id * 1
    //it is a trick in js where if you multiply a string which looks like a number with a number then the string will automatically gets converted into a integer
    // const tour = tours.find(el => el.id == id);


    //it is done to check if the id is in the json or not
    // if(id > tours.length) //check-soln1
    // if(!tour){ //check-soln2
    //     return res.status(404).json({
    //         status: 'fail',
    //         message:'Invalid ID'
    //     })
    // }

    // res.status(200).json({
    //     status: 'success', //JSEND data specification
    //     data:{
    //         tour
    //     }
    // })
    try {
        const tour = await Tour.findById(req.params.id);
        //Tour.findById(req.params.id) = Tour.findOne({_id: req,params.id})
        res.status(200).json({
            status: 'success', //JSEND data specification
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTour = async (req, res) => {
    try {
        // console.log(req.body);
        // const newId = tours[tours.length-1].id+1;
        // const newTour = Object.assign({id: newId}, req.body);
        // tours.push(newTour);
        // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        //     res.status(201).json({
        //         status: 'Success',
        //         data:{
        //             tour: newTour
        //         }
        //     })
        // })

        // const newTour = new Tour({});
        // newTour.save(); //In this version we called the method on the new Document

        const newTour = await Tour.create(req.body); //we basically called the function directly on the tour.
        //.save() nad .create() both return a promise

        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }


    // res.send('Done');
    //we can't send to responses at the same time
}

exports.updateTour = async (req, res) => {
    // if(req.params.id*1 > tours.length){ //check-soln2
    //     return res.status(404).json({
    //         status: 'fail',
    //         message:'Invalid ID'
    //     })
    // }
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    // if(req.params.id*1 > tours.length){ //check-soln2
    //     return res.status(404).json({
    //         status: 'fail',
    //         message:'Invalid ID'
    //     })
    // }

    try {
        await Tour.findByIdAndDelete(req.params.id) //there is a delete operation so we dont need to send anything to the client
        res.status(204).json({
            status: 'success',
            message: 'deleted'
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getTourStats = async (req,res) =>{
    try{
        const stats = await Tour.aggregate([
            {
                $match: {
                    ratingsAverage:{$gte:4.5}
                }
            },
            {
                $group:{
                    // _id: null,
                    _id: '$difficulty',
                    numTours:{
                        $sum:  1
                    },
                    numRatings:{
                        $sum: '$ratingsQuantity'
                    },
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'},
                }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })

    }
    catch{
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}