const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: {
        type: Number,
        required: true
    },
    image: {
        type:String, 
        required: true
    },
    description: { type: String ,required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]  ,
    rating:Number,
});



const Product = mongoose.model('Product',productSchema);
module.exports = Product;