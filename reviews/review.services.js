const path = require('path')
const Review = require(path.join(__dirname,'review.model'))

module.exports = {
    getAllReview,
    getReviewById,
    AddReview,
    updateReview,
    delete: _deleteReview
};

//get list of all reviews
async function getAllReview() {
    return await Review.find().populate('User','fullName,avatar');
}

//get a Review by id
async function getReviewById(id) {
    return await Review.findById(id).populate('User','fullName,avatar');
}

//add new Review to database
async function AddReview(ReviewParam,ProdId) {
    // validate
   
    const review = new Review(ReviewParam);
    // save Review
    await review.save();
    return review.toJSON();
}

//update Review 
async function updateReview(id, ReviewParam) {
    const Review = await Review.findById(id);

    // validate
    if (!Review) throw 'Review not found';
    if (Review.name !== ReviewParam.name && await Review.findOne({ name: ReviewParam.name })) {
        throw 'name "' + ReviewParam.name + '" is already in use';
    }
    // copy ReviewParam properties to Review
    Object.assign(Review, ReviewParam);

    await Review.save();
}

//delete Review
async function _deleteReview(id) {
    await Review.findByIdAndRemove(id);
}