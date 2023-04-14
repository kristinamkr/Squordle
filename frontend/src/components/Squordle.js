/*
 * Squordle.js
*/

import classes from "./style/Squordle.module.css";

import DisplayMan from "./DisplayMan.js";
import GSDiv from "./GSDiv.js";
import ShuckleMechanics from "./ShuckleMechanics.js";

import loadSave from "../functions/loadSave.js";

import { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

let usedPokemon = []; 

loadSave();
function Squordle(props) 
{
    const [pokemon, setPokemon] = useState(['eddie']);
    const pokeList = props.pokeList;

    const [pokeDollars, setPokeDollars] = 
        useState(Number(localStorage.pokeDollars));
    //localStorage.pokeDollars = pokeDollars; 

    const [isGameOver, setGameOver] = useState([false, '']);
    const [newPokemon, forceNewPokemon] = useReducer(x => x + 1, 0);

    function dollarHandler(delta) { 
        setPokeDollars(Number(localStorage.pokeDollars) + delta);
        localStorage.pokeDollars = Number(localStorage.pokeDollars) + delta;
    }
    
    useEffect(() => {
        async function getDaily() {
            return await fetch(`http://localhost:3000/potd`)
                .then((result) => result.json())
        }

        function getRandom() {
            const max = Object.keys(pokeList).length;
            let i = Math.floor(Math.random() * max);
            // REPEAT IF POKEMON ALREADY CYCLED || INAPPROPRIATE LENGTH
            while ((pokeList[i].length < 5 || pokeList[i].length > 8) ||  
                usedPokemon.includes(pokeList[i])) 
                i = Math.floor(Math.random() * max);
            return pokeList[i];
        }

        //redundancy for log-in and log-out cases
        if (!(JSON.parse(localStorage.inventory)["ticket"])){
            localStorage.gameMode = 0;
        }

        if (isGameOver[0] == false) {
            if (JSON.parse(localStorage.gameMode) == 0)
                getDaily()
                    .then(function(result) { 
                        var dailyPokemon = result[0].name.toLowerCase();
                        setPokemon(dailyPokemon);
                    }).catch((err) => console.error(err));
            else
                setPokemon(getRandom());
        }
        else usedPokemon.push(pokemon);
    }, [newPokemon]);

	return (
        <>
            <div className = {classes.center}>
                <DisplayMan id = "header"
                        user = {props.user}
                        userHandler = {props.userHandler}
                        pokemon = {pokemon}
                        dollarHandler = {dollarHandler}
                        isGameOver = {isGameOver}
                        setGameOver = {setGameOver}
                        forceNewPokemon = {forceNewPokemon}/>

                { JSON.parse(localStorage.shuckleInfo)["adopted"] &&
                    <ShuckleMechanics /> }
            </div>

			{ !(pokemon == "eddie") &&  
                <GSDiv  id = "gsdiv"
                        pokemon = {pokemon} 
                        pokeList = {pokeList}
                        dollarHandler = {dollarHandler}                        
                        isGameOver = {isGameOver} 
                        setGameOver = {setGameOver} />}
        </>
	)
}

export default Squordle;
