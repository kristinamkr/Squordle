/*
 * signUp.js
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

const signUp = async (db, data) => {
    const userData = { name: data["user"],
                       password: data["pass"],
                       inventory: data["inventory"],
                       pokeDollars: data["pokeDollars"],
                       region: data["region"],
                       shuckleInfo: data["shuckleInfo"],
                       created: new Date() }

    const usr = await db
        .collection('users') 
        .aggregate([{ $match: { name: data["user"] } }])
        .toArray(function (err, result) {
            return res.json(result);
        });

    if (usr.length == 0)
        await db.collection('users').insertOne(userData);

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
    return signUp(db, JSON.parse(event.body));
};
