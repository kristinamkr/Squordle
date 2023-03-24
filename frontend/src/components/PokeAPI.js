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
    async function getRandomPokemon() {
        const response = await fetch(`http://localhost:3000/random`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const pObj = await response.json(); // waiting for promise
        setPokeObj(pObj);
    }
    */


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
