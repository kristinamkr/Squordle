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

    // getPokemonByType() etc...
}
