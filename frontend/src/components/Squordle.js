/*
 * Squordle.js
*/
import GSDiv from "./GSDiv.js";
import Header from "./Header.js";

import loadSave from "../functions/loadSave.js";

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// loadSave();
function Squordle(props) 
{
    const [pokeObj, setPokeObj] = useState([]); // ? 
    const [pokemon, setPokemon] = useState(['eddie']);
    const [isGameOver, setGameOver] = useState([false, '']);

    useEffect(() => {
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

        console.log("HELLO? ? ? ? ?");
        getRandomPokemon();
        return; 
    }, []); // empty dependency means executed once on load

    let pokeObjLength = 0;
    useEffect(() => {
        pokeObjLength = pokeObj.length;

        if (pokeObjLength != 0) {
            console.log("HEWWO - " + JSON.stringify(pokeObj));
            console.log("HEWWO x2 - " + pokeObj[0].Name);
            // pokemon = pokeObj[0].Name;
            setPokemon(pokeObj[0].Name);
        }

    }, [pokeObj]);

	return (
        <>
            <Header id = "header"
                    isGameOver = {isGameOver}
                    pokemon = {pokemon} />
			{ !(pokemon == 'eddie') && 
                <GSDiv  id = "gsdiv"
                        pokemon = {pokemon}                   
                        setPokeObj = {setPokeObj} 
                        isGameOver = {isGameOver} 
                        setGameOver = {setGameOver} />} 
        </>
	)
}

export default Squordle;
