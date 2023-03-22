import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pokemon(props)
{
    const {name, gen, id} = props;
    
    return (
        <> {props.name} + {props.gen} </>
    );
}

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);

    /*
    // method fetches records from db
    useEffect(() => {
        async function getPokemon() {
            const response = await fetch(`http://localhost:3000/pokeList`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const pokeList = await response.json();
            console.log(typeof(response.json) + " - " + pokeList[0].Name);
            setPokemon(pokeList);
        }

        getPokemon();
        return;
    }, []);
    */

    useEffect(() => {
        async function getRandomPokemon() {
            const response = await fetch(`http://localhost:3000/random`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const pokemon = await response.json();
            console.log("pokeAPI - " + pokemon[0].Name);
            setPokemon(pokemon);
        }

        getRandomPokemon();
        return;
    }, []);

    /*
    function pokemonList() {
        return pokemon.map((poke) => {
            return (
                <Pokemon 
                    name={poke.Name}
                    gen={poke.Generation}
                    key={poke._id}
                />
            );
        });
    }
    */

    /*
    return (
        <> {pokemonList()} </>
    );
    */
}
