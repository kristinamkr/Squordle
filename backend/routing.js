/*
 * routing.js
*/

const router = require('express').Router();
const dbo = require('./conn');

// helps convert the ID from string to ObjectId for the _id
const ObjectID = require('mongodb').ObjectId;

router.route('/pokeList').get(async function (req, res) 
{
    dbo.getDb('squordle')
       .collection('pokemon')
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { } },
                   { $sort:    { 'entryNum': 1 } } 
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching pokemon collection');
           else
               res.json(result);
    });
});

router.route('/potd').get(async function (req, res)
{
    dbo.getDb('squordle')
       .collection('pokemon')
       .aggregate([{ $project: { _id: 0 } }, 
                   { $match: { potd: 'TRUE'  } },
                   { $sort:  { lastModified: -1 } },
                   { $limit: 1 }
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching pokemon of the day');
           else
               res.json(result);
    });
});

// USERS -----------------------------------------------------------------------
router.route('/userList').get(async function (req, res) 
{
    dbo.getDb('squordle')
       .collection('users')
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { } },
                   { $sort:    { 'username': 1 } } 
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching users');
           else
               res.json(result);
        });
});

router.route('/signUp').post(async function (req, response) {
    console.log("REQ BODY - " + JSON.stringify(req.body));
    const users = dbo.getDb('squordle').collection('users');

    const user = { name: req.body["user"],
                   password: req.body["pass"],
                   pokeDollars: req.body["pokeDollars"],
                   created: new Date() }

    const result = await users.insertOne(user); 
});

router.route('/signIn').post(async function (req, res) {
    let user = req.body;
    dbo.getDb('squordle')
       .collection('users')
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { name: user.name,
                               password: user.password } }
                 ])
       .toArray(function (err, result) {
           if (err) throw err;
           res.json(result);
    });
});

router.route('/saveData').post(async function (req, res) {
    let users = await dbo.getDb('squordle').collection('users');

    let user = req.body;
    console.log("USER - " + typeof(user) + " : " + JSON.stringify(user.name));
    users.updateOne({ name: user["name"] }, 
                    { $set: { name: "poopoo" } });
    return -1;
});

module.exports = router;
