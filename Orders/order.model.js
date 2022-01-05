const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    products: String ,
    isDelivery: {type: Boolean, default: false},
    isCompleted : {type: Boolean, default: false},
    address: String,
    table: String,
});



const Order = mongoose.model('Order',orderSchema);
module.exports = Order;