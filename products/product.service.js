const path = require('path')
const Product = require(path.join(__dirname,'product.model'));
const Review = require(path.join(__dirname,'../reviews/review.model'))
const { populate } = require(path.join(__dirname,'image.model'))

module.exports = {
    getAllProd,
    getProdById,
    AddProd,
    updateProd,
    delete: _deleteProd
};

//get list of all products
async function getAllProd() {
    return await Product.find().populate('category','name').populate('reviews');
}

//get a Product by id
async function getProdById(id) {
    return await Product.findById(id).populate('category','name').populate('reviews');
}

//add new Product to database
async function AddProd(ProductParam) {
    // validate
    if (await Product.findOne({ name: ProductParam.name })) {
        throw 'name "' + ProductParam.name + '" is already in use';
    }
    const product = new Product(ProductParam);
    // save Product
    await product.save();
}

//update Product 
async function updateProd(id, ProductParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.name !== ProductParam.name && await Product.findOne({ name: ProductParam.name })) {
        throw 'name "' + ProductParam.name + '" is already in use';
    }
    if(ProductParam.reviews != null)
    {
        product.reviews.push(ProductParam.reviews);
        console.log(ProductParam);
        console.log(product.reviews);
    }
    else{
        let reviews = [ProductParam.reviews];
        Object.assign(product, reviews);
    }
    // copy ProductParam properties to Product
    
    await product.save();
}
//add review to Product
// async function addReviewToProd(id, ReviewParam) {
//     const Product = await Product.findById(id);

//     // validate
//     if (!Product) throw 'Product not found';
//     array1.forEach(element => console.log(element));

//     Product.reviews.forEach(function (review) {
//         if(await Product.findOne({ User: ReviewParam.User })){
//             throw 'User "' + ReviewParam.name + '"  already have review';
//         }
//     });
        
//     }
//     if (Product.name !== ReviewParam.name && await Product.findOne({ name: ReviewParam.name })) {
//         throw 'name "' + ReviewParam.name + '" is already in use';
//     }
//     // copy ProductParam properties to Product
//     Object.assign(Product, ProductParam);

//     await Product.save();
// }

//delete Product
async function _deleteProd(id) {
    await Product.findByIdAndRemove(id);
}