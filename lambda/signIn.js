/*
 * signIn.js
*/

const { MongoClient } = require("mongodb");
const { connectToDatabase } = require('./utils.js'); 

const COLLECTION_NAME = process.env.COLLECTION_NAME_1;

const signIn = async (db, data) => {
    let users = await db.collection(COLLECTION_NAME);

    users.updateOne({ name: data["user"],
                      password: data["pass"] },
                    { $set: { saveKey: data["saveKey"],
                              lastLogin: new Date() } });

    const usr = await users
        .aggregate([{ $match: { name: data["user"],
                                password: data["pass"] } }])
        .toArray(function (err, result) {
            if (err)
                res.status(400)
                    .send(`Error finding user: ${data["user"]}`);
            else
                res.json(result);
        });

    return {
        statusCode: 200,
        body: JSON.stringify(usr),
    };
};

module.exports.handler = async (event, context) => {
    let db;
    try {
        db = await connectToDatabase();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error connecting to MongoDB" })
        };
    }

    return signIn(db, JSON.parse(event.body));
};
