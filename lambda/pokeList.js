/*
* pokemon.js
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

const pokeList = async (db) => {
    const list = await db
        .collection('pokemon')
        .aggregate([{ $project: { _id: 0 } },
                    { $match: { } },
                    { $sort: { 'entryNum': 1 } } 
                  ])
        .toArray(function (err, result) {
            if (err) res.status(400).send('Error fetching pokemon collection');
            else res.json(result);
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
    return pokeList(db);
};
