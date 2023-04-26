/*
 * save.js
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
        maxPoolSize: 1
    });
    
    cachedDb = client.db(DB_NAME);
    return cachedDb; 
};

const save = async (db, data) => {
    await db
        .collection('users') 
        .updateOne({ name: data["user"], saveKey: data["saveKey"] }, 
                   { $set: { inventory: data["inventory"],
                             pokeDollars: data["pokeDollars"],
                             region: data["region"],
                             shuckleInfo: data["shuckleInfo"],
                             lastModified: new Date()
                           }
                  });

    const usr = await db
        .collection('users') 
        .aggregate([{ $match: { name: data["user"] } }])
        .toArray(function (err, result) {
            return res.json(result);
        });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usr),
    };
};

module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete
    context.callbackWaitsForEmptyEventLoop = false;
    
    const db = await connectToDatabase(MONGODB_URI);
    return save(db, JSON.parse(event.body));
};
