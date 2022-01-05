const express = require('express');
const router = express.Router();
const path = require('path');
const orderService = require(path.join(__dirname,'/order.service'));

// routes
router.post('/add', addorder);
router.get('/', getAllOrders);
router.get('/:id', getorderById);
router.put('/:id', updateorder);
router.delete('/:id', _deleteorder);
module.exports = router;

function addorder(req, res, next) {
    orderService.Addorder(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllOrders(req, res, next) {
    orderService.getAllOrders()
        .then(orders => res.json(orders))
        .catch(err => next(err));
}


function getorderById(req, res, next) {
    orderService.getorderById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateorder(req, res, next) {
    orderService.updateorder(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteorder(req, res, next) {
    orderService.deleteorder(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}