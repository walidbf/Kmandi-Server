const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const categoryShema = new Schema({
    name:String
})

const Category = mongoose.model('Category',categoryShema);
module.exports = Category;