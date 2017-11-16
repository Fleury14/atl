const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb://fleury:theo@ds259175.mlab.com:59175/fleury-sandbox', ['tips']);

// get all tips
router.get('/tips', function(req, res, next) {
    db.tips.find(function (err, tips) {
        if (err) {
            res.send(err);
        }
        res.json(tips)
    });
});

// get single tip
router.get('/tip/:id', function(req, res, next) {
    db.tips.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, tip) {
        if (err) {
            res.send(err);
        }
        res.json(tip)
    });
});

//check for username in database
router.get('/contain/:id', function(req, res, next) {
    console.log(`Checking for a user name of ${req.params.id}`);
    db.tips.findOne({user: req.params.id}, function (err, user) {
        if (err) {
            res.status(400);
            console.log('There was an error, so returning false');
            res.send(err);
        } else {
            console.log(res.body, user);
            console.log('no error, so checking result');
            if(!user) {
                console.log('No such user');
                res.send(false);
            } else {
                console.log('I can has user!');
                res.send(true);
            }
        }
    });
})

// save tip
router.post('/tip', function(req, res, next) {
    const tip = req.body;
    if (!tip.content) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tips.save(tip, function(err,  tip) {
            if (err) {
                res.send(err);
            }
            res.json(tip);
        });
    }
});

// delete tip
router.delete('/tip/:id', function(req, res, next) {
    db.tips.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, tip) {
        if (err) {
            res.send(err);
        }
        res.json(tip)
    });
});



// update tip
router.put('/tip/:id', function(req, res, next) {
    const tip = req.body;
    const updatedTip = {};

    if (tip.isDone) {
        updatedTip.isDone = tip.isDone;
    }

    if (tip.content) {
        updatedTip.isDone = tip.content;
    }

    if (tip.date) {
        updatedTip.isDone = tip.date;
    }

    if (!updatedTip) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tips.update({_id: mongojs.ObjectId(req.params.id)}, updatedTip, {}, function (err, tip) {
            if (err) {
                res.send(err);
            }
            res.json(tip)
        });
    }
    
});

module.exports = router;