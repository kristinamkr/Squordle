/*
 * routing.js
*/

const router = require('express').Router();
const dbo = require('./conn');

// helps convert the ID from string to ObjectId for the _id
const ObjectID = require('mongodb').ObjectId;

router.route('/pokeList').get(async function (req, res) 
{
    let dbConnect = dbo.getDb('squordle');
    dbConnect
        .collection("pokemon")
        .find({})
        .toArray(function (err, result) {
            if (err)
                res.status(400).send("Error fetching pokemon of the day");
            else
                res.json(result);
    });
});

// how get trigger

// for free-play when no settings specified
router.route('/random').get(async function (req, res)
{
    let dbConnect = dbo.getDb('squordle');

    dbConnect
        .collection("pokemon")
        .aggregate([{ $sample: { size: 1 } }])
        .toArray(function (err, result) {
            if (err)
                res.status(400).send("Error fetching random pokemon");
            else
                res.json(result);
    });
});

// router.route('/random:gen... 

module.exports = router;
