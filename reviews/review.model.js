const mongoose= require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    User:{ type: Schema.Types.ObjectId, ref: 'User' },
    Rating: Number,
    Description:String,
    createdDate: { type: Date, default: Date.now },
})
const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;