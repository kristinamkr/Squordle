/*
 * signIn.js
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

const signIn = async (db, data) => {
    let users = await db.collection('users');

    users.updateOne({ name: data["user"],
                      password: data["pass"] },
                    { $set: { saveKey: data["saveKey"],
                              lastLogin: new Date() } });

    const usr = await users
        .aggregate([{ $match: { name: data["user"],
                                password: data["pass"] } }])
        .toArray(function (err, result) {
            console.log("RESULT - " + JSON.stringify(result));
            if (err)
                res.status(400).send(`Error finding user: ${data["user"]}`);
            else
                res.json(result);
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
    return signIn(db, JSON.parse(event.body));
};
