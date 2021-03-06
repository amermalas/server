var express = require('express');
var User = require('../models/user.model')
var JSONStream = require('JSONStream');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
});
router.get('/', function(req, res, next) {
    User.find({}).cursor().pipe(JSONStream.stringify()).pipe(res.type('json'));
});
router.put('/:id', function(req, res, next) {
    const { _id, ...userWithoutID } = req.body;
    User.findOneAndUpdate({ _id: req.params.id }, userWithoutID, (err, doc) => {
        if (err) return next(err);
        res.send({ message: "user is updated" });
    });
});
router.post('/', function(req, res, next) {
    user = new User(req.body);
    user.save((err) => {
        if (err) return next(err);
        res.send({ message: "user:" + req.body.username + " is saved" });
    });
});
router.delete('/:id', function(req, res, next) {
    User.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        res.send({ message: "user:" + req.params.id + " is deleted" });
    });
});


module.exports = router;