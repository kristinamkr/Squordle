/*
 * Squordle.js
*/

import classes from "./components/style/Squordle.module.css";

import DisplayMan from "./components/DisplayMan.js";
import GSDiv from "./components/GSDiv.js";
import ShuckleMechanics from "./components/ShuckleMechanics.js";

import loadSave from "./functions/loadSave.js";

import { useReducer, useState, useEffect } from 'react';

let usedPokemon = []; 

loadSave();
function Squordle(props) 
{
    const [pokemon, setPokemon] = useState('eddie');
    const pokeList = props.pokeList;

    const [pokeDollars, setPokeDollars] = 
        useState(Number(localStorage.pokeDollars));

    const [isGameOver, setGameOver] = useState([false, '']);
    const [newPokemon, forceNewPokemon] = useReducer(x => x + 1, 0);

    function dollarHandler(delta) 
    { 
        setPokeDollars(Number(localStorage.pokeDollars) + delta);
        localStorage.pokeDollars = Number(localStorage.pokeDollars) + delta;
    }

    useEffect(() => {
        function getDaily() 
        {
             let tempList = pokeList.filter(p => p.potd === "TRUE");
             tempList = tempList.sort(
                function(a, b) { return b.lastModified > a.lastModified }
             );
             return tempList[0].name;
        }

        function getRandom() 
        {
            const max = Object.keys(pokeList).length;
            let i = Math.floor(Math.random() * max);
            // REPEAT IF POKEMON ALREADY CYCLED || INAPPROPRIATE LENGTH
            while ((pokeList[i].name.length < 5 || pokeList[i].name.length > 8) ||  
                usedPokemon.includes(pokeList[i].name)) {
                i = Math.floor(Math.random() * max);
            }
            return pokeList[i].name;
        }

        //redundancy for log-in and log-out cases
        if (!(JSON.parse(localStorage.inventory)["ticket"])) {
            if (localStorage.gameMode > 1)
                localStorage.gameMode = 2;
            else
                localStorage.gameMode = 0;
        }

        if (!isGameOver[0]) {
            if (Number(localStorage.gameMode) % 2 === 0)
                setPokemon(getDaily());
            else
                setPokemon(getRandom());
        }
        else 
            usedPokemon.push(pokemon);
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
                    <ShuckleMechanics/> }
            </div>

			{ !(pokemon === "eddie") &&  
                <GSDiv  id = "gsdiv"
                        pokemon = {pokemon} 
                        pokeList = {pokeList}
                        newPokemon = {newPokemon}
                        dollarHandler = {dollarHandler}                        
                        isGameOver = {isGameOver} 
                        setGameOver = {setGameOver}/>}
        </>
	)
}

export default Squordle;
