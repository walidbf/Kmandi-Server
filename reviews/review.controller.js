const express = require('express');
const router = express.Router();
const reviewService = require('./review.services');


// routes
router.post('/add', addReview);
router.get('/', getAllReview);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', _deleteReview);

module.exports = router;

function addReview(req, res, next) {
    reviewService.AddReview(req.body)
        .then(rev => rev ? res.json(rev) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllReview(req, res, next) {
    reviewService.getAllReview()
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}


function getReviewById(req, res, next) {
    reviewService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateReview(req, res, next) {
    reviewService.updateReview(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteReview(req, res, next) {
    reviewService.deleteReview(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}