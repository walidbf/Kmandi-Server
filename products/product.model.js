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
        default: 'uploads\\1637518712089-720371059-cappucin.jpg'
    },
    description: { type: String ,required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]  ,
    rating:Number,
});



const Product = mongoose.model('Product',productSchema);
module.exports = Product;