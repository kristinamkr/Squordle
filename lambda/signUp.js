/*
 * signUp.js
*/

const { MongoClient } = require("mongodb");
const { connectToDatabase } = require('./utils.js'); 

const COLLECTION_NAME = process.env.COLLECTION_NAME_1;

const signUp = async (db, data) => {
    const userData = { name: data["user"],
                       password: data["pass"],
                       inventory: data["inventory"],
                       pokeDollars: data["pokeDollars"],
                       region: data["region"],
                       shuckleInfo: data["shuckleInfo"],
                       created: new Date() }

    const usr = await db
        .collection(COLLECTION_NAME) 
        .aggregate([{ $match: { name: data["user"] } }])
        .toArray(function (err, result) {
            return res.json(result);
        });

    if (usr.length == 0)
        await db.collection(COLLECTION_NAME).insertOne(userData);

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
    
    return signUp(db, JSON.parse(event.body));
};
