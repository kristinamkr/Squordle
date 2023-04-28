/*
* pokeList.js
*/

const { MongoClient } = require("mongodb");
const { connectToDatabase } = require('./utils.js'); 

const COLLECTION_NAME = process.env.COLLECTION_NAME_0;

const pokeList = async (db) => {
    const list = await db
        .collection(COLLECTION_NAME)
        .aggregate([{ $project: { _id: 0 } },
                    { $match: { } },
                    { $sort: { 'entryNum': 1 } } 
                  ])
        .toArray(function (err, result) {
            if (err) 
                res.status(400)
                    .send(`Error fetching ${COLLECTION_NAME} collection`);
            else 
                res.json(result);
        });
        
    return {
        statusCode: 200,
        body: JSON.stringify(list),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
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

    return pokeList(db);
};
