const path = require('path')
const Category = require(path.join(__dirname,'../category/category.model'))


module.exports = {
    getAllCat,
    getCatById,
    AddCat,
    updateCat,
    delete: _deleteCat
};

//get list of all Categorys
async function getAllCat() {
    return await Category.find();
}

//get a Category by id
async function getCatById(id) {
    return await Category.findById(id);
}

//add new Category to database
async function AddCat(CategoryParam) {
    // validate
    if (await Category.findOne({ name: CategoryParam.name })) {
        throw 'name "' + CategoryParam.name + '" is already in use';
    }
    const category = new Category(CategoryParam);
    // save Category
    await category.save();
}

//update Category 
async function updateCat(id, CategoryParam) {
    const Category = await Category.findById(id);

    // validate
    if (!Category) throw 'Category not found';
    if (Category.name !== CategoryParam.name && await Category.findOne({ name: CategoryParam.name })) {
        throw 'name "' + CategoryParam.name + '" is already in use';
    }
    // copy CategoryParam properties to Category
    Object.assign(Category, CategoryParam);

    await Category.save();
}

//delete Category
async function _deleteCat(id) {
    await Category.findByIdAndRemove(id);
}