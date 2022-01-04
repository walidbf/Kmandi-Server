const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

//connect to mongodb cluster
mongoose.connect("mongodb+srv://walidos11:walid123@foodapp.gylcw.mongodb.net/FoodApp?retryWrites=true&w=majority",{ useNewUrlParser: true })
.then(()=>console.log('db connnected'))
.catch((err) => console.log(err));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model')
};
