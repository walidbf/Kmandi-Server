const express = require('express');
const router = express.Router();
const eventService = require('./event.service');


// routes
router.post('/add', addEvent);
router.get('/', getAllEvent);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', _deleteEvent);

module.exports = router;

function addEvent(req, res, next) {
    eventService.AddEvent(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllEvent(req, res, next) {
    eventService.getAllEvent()
        .then(events => res.json(events))
        .catch(err => next(err));
}


function getEventById(req, res, next) {
    eventService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateEvent(req, res, next) {
    eventService.updateEvent(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteEvent(req, res, next) {
    eventService.deleteEvent(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}