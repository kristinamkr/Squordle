/*
 * pokemonDAO.js
*/ 

const mongodb = require("mongodb");

let pokemon;

export default class PokemonDAO 
{
    // called as soon as server starts
    static async injectDB(conn) 
    {
        if (pokemon) return;

        try {
            pokemon = await conn.db(process.env.SQUORDLE_NS)
                                .collection("pokemon");
        } catch (e) {
            console.error(`Unable to establish a collection handle ` +
                `in pokemonDAO: ${e}`); 
        }
    }

    static async getPokemonCount() 
    {
        try {
            return pokemon.countDocuments({});
        } catch (e) {
            console.error(`Problem counting documents, ${e}`,)
            return {totalNumPokemon: 0};
        }
    }

    static async getPokemonByRandom()
    {

    }

    static async getPokemonByEntryNumber()
    {

    }

    static async findPokemon(guess) // eyes emoji
    {
        

    }

/*
router.route('/random').get(async function (req, res)
{
    let dbConnect = dbo.getDb('squordle');

    dbConnect
        .collection("pokemon")
        .aggregate([{ $sample: { size: 1 } }])
        .toArray(function (err, result) {
            if (err)
                res.status(400).send("Error fetching random pokemon");
            else
                res.json(result);
    });
});
*/
    // getPokemonByType() etc...
}
