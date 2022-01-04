const Order = require('../orders/order.model');

module.exports = {
    getAllOrders,
    getorderById,
    Addorder,
    updateorder,
    delete: _deleteorder
};

//get list of all orders
async function getAllOrders() {
    return await Order.find().populate('products').populate('user');
}

//get a Order by id
async function getorderById(id) {
    return await Order.findById(id).populate('products').populate('user');
}

//add new Order to database
async function Addorder(OrderParam) {
    const order = new Order(OrderParam);
    // save Order
    await order.save();
}

//update Order 
async function updateorder(id, OrderParam) {
    const order = await Order.findById(id);

    // validate
    if (!order) throw 'Order not found';
    
    Object.assign(order, OrderParam);
    // copy OrderParam properties to Order
    
    await order.save();
}

//delete Order
async function _deleteorder(id) {
    await Order.findByIdAndRemove(id);
}