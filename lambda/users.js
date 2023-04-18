/*
* userList.js
*/

const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "squordle";

let cachedDb = null;

const connectToDatabase = async (uri) => {
    if (cachedDb)
        return cachedDb; 

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    cachedDb = client.db(DB_NAME);
    return cachedDb; 
};

const users = async (db) => {
    const list = await db
        .collection('users')
        .aggregate([{ $project: { _id: 0 } },
                    { $match: { } }
                  ])
        .toArray(function (err, result) {
            if (err)
                res.status(400).send('Error fetching users');
            else
                res.json(result);
        });
        
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
    };
};

module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete
    context.callbackWaitsForEmptyEventLoop = false;
    
    const db = await connectToDatabase(MONGODB_URI);
    return users(db);
};
