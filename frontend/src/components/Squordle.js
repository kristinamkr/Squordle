/*
 * Squordle.js
*/

import classes from "./style/Squordle.module.css";

import Header from "./Header.js";
import GSDiv from "./GSDiv.js";
import ShuckleMechanics from "./ShuckleMechanics.js";

import loadSave from "../functions/loadSave.js";

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

loadSave();
function Squordle(props) 
{
    var validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

    const [pokeObj, setPokeObj] = useState([]); // ? 
    const [pokemon, setPokemon] = useState(['eddie']);

    // best way?
    const [pokeDollars, setPokeDollars] = 
        useState(Number(window.localStorage.pokeDollars));
    window.localStorage.pokeDollars = pokeDollars; 

    function dollarHandler(delta) { 
        setPokeDollars(pokeDollars + delta); 
    }
    // ----------

    const [isGameOver, setGameOver] = useState([false, '']);

    useEffect(() => {
        async function getPokemon() {
            let response;
            if (window.localStorage.gameMode == 0)
                response = await fetch(`http://localhost:3000/potd`);
            else
                response = await fetch(`http://localhost:3000/random`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const pObj = await response.json(); // waiting for promise
            setPokeObj(pObj);
        }

        getPokemon();
        return; 
    }, []); // empty dependency means executed once on load

    let pokeObjLength = 0;
    useEffect(() => {
        pokeObjLength = pokeObj.length;

        if (pokeObjLength != 0)
            setPokemon(pokeObj[0].name.toLowerCase());
    }, [pokeObj]);

	return (
        <>
            <div className = {classes.center}>
                <Header id = "header"
                        pokemon = {pokemon}
                        pokeDollars = {pokeDollars}
                        dollarHandler = {dollarHandler}                        
                        isGameOver = {isGameOver} />

                { window.localStorage.adoptedShuckle === "true" &&
                    <ShuckleMechanics validKeys = {validKeys} /> }
            </div>

			{ !(pokemon == 'eddie') && 
                <GSDiv  id = "gsdiv"
                        pokemon = {pokemon}                   
                        setPokeObj = {setPokeObj} 
                        dollarHandler = {dollarHandler}                        
                        isGameOver = {isGameOver} 
                        setGameOver = {setGameOver} 
                        validKeys = {validKeys} />} 
        </>
	)
}

export default Squordle;
