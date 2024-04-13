class AppError extends Error{
    constructor(message,statusCode){
        super(message); //this is basically like calling an error
        //this.message = message is not used because above we called the parent class and we set the message to our incoming message

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor);
    }
}
//We will be using AppError class for creating all the errors in our application

module.exports = AppError;
