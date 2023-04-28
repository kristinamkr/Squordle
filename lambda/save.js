/*
 * save.js
*/

const { MongoClient } = require("mongodb");
const { connectToDatabase } = require('./utils.js'); 

const COLLECTION_NAME = process.env.COLLECTION_NAME_1;

const save = async (db, data) => {
    await db
        .collection(COLLECTION_NAME) 
        .updateOne({ name: data["user"], saveKey: data["saveKey"] }, 
                   { $set: { inventory: data["inventory"],
                             pokeDollars: data["pokeDollars"],
                             region: data["region"],
                             shuckleInfo: data["shuckleInfo"],
                             lastModified: new Date()
                           }
                  });

    const usr = await db
        .collection(COLLECTION_NAME) 
        .aggregate([{ $match: { name: data["user"] } }])
        .toArray(function (err, result) {
            return res.json(result);
        });

    return {
        statusCode: 200,
        body: JSON.stringify(usr),
    };
};

module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete
    // context.callbackWaitsForEmptyEventLoop = false;

    let db;
    try {
        db = await connectToDatabase();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error connecting to MongoDB" })
        };
    }

    return save(db, JSON.parse(event.body));
};
