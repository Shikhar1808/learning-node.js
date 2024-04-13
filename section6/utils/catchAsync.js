module.exports = fn =>{
    return (req,res,next) =>{
        // fn(req,res,next).catch(err => next(err));
        fn(req,res,next).catch(next); //it is the same as above
        //it is used to get rid of try catch block
    }
}