const express = require('express');
const router = express.Router();
const path = require('path')
const categoryService = require(path.join(__dirname,'category.services'));


// routes
router.post('/add', addCategory);
router.get('/', getAllCat);
router.get('/:id', getCatById);
router.put('/:id', updateCat);
router.delete('/:id', _deleteCat);

module.exports = router;

function addCategory(req, res, next) {
    categoryService.AddCat(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllCat(req, res, next) {
    categoryService.getAllCat()
        .then(categorys => res.json(categorys))
        .catch(err => next(err));
}


function getCatById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateCat(req, res, next) {
    categoryService.updateCat(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteCat(req, res, next) {
    categoryService.deleteCat(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}