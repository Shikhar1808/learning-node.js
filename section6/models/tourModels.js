const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({  //Schema defines the structure and properties of the document in the MongoDB collection
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    discount: {
        type: Number
    },
    summary: {
        type: String,
        required: [true, "A tour must have a summary"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"],
        trim: true
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now(),
        select: false
    },
    startDate: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;


//The real problem lies here:



// createdAt: {
//     type: Date,
//     default: Date.now(),
//     select: false
//   },
  
  
//   Once our tourModel.js file runs and tourSchema gets created the Date.now() method runs and stores the current time as the default property. So every document that gets stored in the database will therefore have the same createdAt value.
  
//   Here's the proper way of doing this:
  
  
  
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     select: false
//   },
  
  
//   We don't want to execute Date.now ourselves, but let the Atlas Cloud do that for us once data arrives to their server. So this line will essentially become a "server timestamp" and even if we send all the documents at once, there will be at least 1 millisecond difference between these document writes, so all the dates will be "unique"...