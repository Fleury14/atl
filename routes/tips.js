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

// save tip
router.post('/tip', function(req, res, next) {
    const tip = req.body;
    if (!tip.content) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tips.save(tip, function(err, tip) {
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