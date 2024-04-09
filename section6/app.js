const express = require('express');
const app = express();
const morgan = require('morgan');


//1) Middlewares
console.log(process.env.NODE_ENV);
if(process.env.NOSE_ENV === 'development'){
    app.use(morgan('dev'));
}
// app.use(morgan('dev'))
app.use(express.json()); //it is a middleware which modifies the given data
app.use(express.static(`${__dirname}/public`));

// app.get('/', (req,res) =>{
//     res.status(200).json({message: 'Hello from the server side', app: 'Project'});
// })
// app.post('/',(req,res) =>{
//     res.send("you can post to this endpoint....")
// })

app.use((req,res,next) =>{
    console.log('Hello from the middleware 1st');
    next(); //next or n or x(anything) is the third argument that describes it as a middleware. To call a muddle ware we just need to call the third parameter.
    //these simple middleware will be applied to all the single requests.
    // Our routehandles are some type of middleware that only applies to certain urls or routes.

    //We can have as a many middlware as we wnat.
    //Go to API calls for next info
})

//2) Route handlers
// const getAllTours = (req,res) =>{
//     res.status(200).json({
//         status: 'success', //JSEND data specification
//         results: tours.length,
//         data: {
//             tours: tours //isko sirf tours likh bhi chodh sakte the kyuki ES6 me key aur vlaue agr same name ke ho to ek baar hi likh sakte hai
//         }
//     })
// }

// const getTour = (req,res) =>{ //by using/:id we are making or using a variable
//     // if i want to make the variable r parameter optional then i will use    /:id?
//         console.log(req.params);//.params store all the parameters
//         const id = req.params.id*1 
//         //it is a trick in js where if you multiply a string which looks like a number with a number then the string will automatically gets converted into a integer
//         const tour = tours.find(el => el.id == id);
    
    
//         //it is done to check if the id is in the json or not
//         // if(id > tours.length) //check-soln1
//         if(!tour){ //check-soln2
//             return res.status(404).json({
//                 status: 'fail',
//                 message:'Invalid ID'
//             })
//         }
        
//         res.status(200).json({
//             status: 'success', //JSEND data specification
//             data:{
//                 tour
//             }
//         })
//     }

// const createTour = (req,res) =>{
//         // console.log(req.body);
//         const newId = tours[tours.length-1].id+1;
//         const newTour = Object.assign({id: newId}, req.body);
//         tours.push(newTour);
//         fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
//             res.status(201).json({
//                 status: 'Success',
//                 data:{
//                     tour: newTour
//                 }
//             })
//         })
//         // res.send('Done');
//         //we can't send to responses at the same time
//     }

// const updateTour =  (req,res) =>{
//     if(req.params.id*1 > tours.length){ //check-soln2
//         return res.status(404).json({
//             status: 'fail',
//             message:'Invalid ID'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<updated tour here...>'
//         }
//     })
// }

// const deleteTour =  (req,res) =>{
//     if(req.params.id*1 > tours.length){ //check-soln2
//         return res.status(404).json({
//             status: 'fail',
//             message:'Invalid ID'
//         })
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// }

// const getAllUsers = (req,res) =>{
//      res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//      })
// }
// const getUser = (req,res) =>{
//      res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//      })
// }
// const createUser = (req,res) =>{
//      res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//      })
// }
// const updateUser = (req,res) =>{
//      res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//      })
// }
// const deleteUser = (req,res) =>{
//      res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//      })
// }

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



//3) Routes
//method1
// app.get('/api/v1/tours', getAllTours)

// app.get('/api/v1/tours/:id', getTour)

// app.post('/api/v1/tours', createTour)

// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)



// const tourRouter = express.Router();
// const userRouter = express.Router();

//method2
// tourRouter.route('/')
// .get(getAllTours)
// .post(createTour);

// app.use((req,res,next) =>{
//     console.log('Hello from the middleware 2nd');
//     next();
//     //If we call the ablove middleware then it will not be in the output because the cycle ends with the above API call. eg if we use getALlTOurs then the cycle ends when the getAllTours cycle ends.
//     // So order really matters in express.
//     //If we call the bottom one then it will pe printed and work as usual as the above one as it is now the part if req-res cycle
// })


// tourRouter.route('/:id')
// .get(getTour)
// .patch(updateTour)
// .delete(deleteTour);

// userRouter.route('/')
// .get(getAllUsers)
// .post(createUser);

// userRouter.route('/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser)
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) Start server
// const port = 8000;
// app.listen(port, () =>{  //to start the server
//     console.log(`App running on port ${port}....`);
// });
module.exports = app;