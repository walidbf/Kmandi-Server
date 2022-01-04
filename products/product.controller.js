const express = require('express');
const router = express.Router();
const productService = require('./product.service');
const upload = require('../middelware/multerconfig');
const Product = require('./product.model');

// routes
router.post('/add', addProduct);
router.get('/', getAllProd);
router.get('/:id', getProdById);
router.put('/:id', updateProd);
router.delete('/:id', _deleteProd);
module.exports = router;

function addProduct(req, res, next) {
    productService.AddProd(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllProd(req, res, next) {
    productService.getAllProd()
        .then(products => res.json(products))
        .catch(err => next(err));
}


function getProdById(req, res, next) {
    productService.getProdById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateProd(req, res, next) {
    productService.updateProd(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteProd(req, res, next) {
    productService.deleteProd(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}