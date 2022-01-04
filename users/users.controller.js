const express = require('express');
const router = express.Router();
const userService = require('./user.service');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/verify:id', verifMail);
router.put('/reset/:email',reset);
router.get('/email/:email',getByEmail);
router.get('/number/:number',getByPhone);
router.put('/verif-number/:number/:verifCode',verifPhone);
router.put('/send-phone-verification/:number',sendPhoneVerificationCode)

module.exports = router;
function sendPhoneVerificationCode(req, res, next){
    userService.sendPhoneVerificationCode(req.params.number)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function verifPhone(req, res, next){
    userService.verifPhone(req.params.number,req.params.verifCode)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getByPhone(req, res, next) {
    userService.getByPhone(req.params.number)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}
function verifMail(req, res, next){
    userService.verifMail(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getByEmail(req, res, next) {
    userService.getByEmail(req.params.email)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function reset(req, res, next) {
    userService.reset(req.params.email)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}