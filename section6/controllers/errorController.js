const AppError = require('./../utils/appError');

const handleCastErrorDB = err =>{
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message,400);
}

const handleDuplicateFieldDB = err =>{
    const value = err.ermsg.match(/(["'])(\\?.)*?\1/)[0]; //first element of the output array.
    const message = `Duplicate field value: x, Please use another value!`;
    return new AppError(message,400);
}   

const handleValidationErrorDB = err =>{
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message,400);
}

const sendErrorDev = (err,res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}
const sendErrorProd = (err,res) =>{
    //Operational, trusted error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }

    //Programming or other unkown error: don't leak error details
    else{
        //1) Log the error
        console.log('Error',err);
        //2)Send a generic message

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        })
    }
}


module.exports = (err,req,res,next) =>{ //by passing 4 paramerters Express already knows this is a error handling middleware
    // console.log(err.stack) //stackTrack //It gives the error and were it happens
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    //We have to give a nice user-friendly and small message to the users but we have to get most data for development while getting an error.
    if(process.env.NODE_ENV === 'development'){
        // res.status(err.statusCode).json({
        //     status: err.status,
        //     error: err,
        //     message: err.message,
        //     stack: err.stack
        // })
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV === 'production'){
        // res.status(err.statusCode).json({
        //     status: err.status,
        //     message: err.message,
        // })
        let error = {...err}
        if(err.name === 'CastError'){ //here we handeled the error of wrong id and name of the tour
            error = handleCastErrorDB(error)
        }
        if(err.code = 11000){//here we handeled the error of duplicate id and name of the tour
            error = handleDuplicateFieldDB(error);
        }
        if(err.name === 'ValidationError'){
            error = handleValidationErrorDB(error);
        }
        sendErrorProd(error,res);
    }

    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message,
    // })

}