/*
* utils.js
*/

const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const MAX_CONNECTIONS = parseInt(process.env.MAX_CONNECTIONS) || 10;

let cachedDb = null;

const connectToDatabase = async (event) => {
    if (cachedDb)
        return cachedDb;
    else console.log("FIRST TIME");

    const client = await MongoClient.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: MAX_CONNECTIONS 
    });
    
    cachedDb = client.db(DB_NAME);
    return cachedDb; 
};

module.exports = { connectToDatabase }
