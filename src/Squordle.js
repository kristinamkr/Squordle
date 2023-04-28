import classes from "./components/style/Squordle.module.css";

import DisplayMan from "./components/DisplayMan.js";
import GSDiv from "./components/GSDiv.js";
import ShuckleMechanics from "./components/ShuckleMechanics.js";

import loadSave from "./functions/loadSave.js";

import { useReducer, useState, useEffect } from 'react';

loadSave();

let usedPokemon = []; 
function Squordle(props) 
{
    console.log("RELOADING SQUORDLE");

    // USER AUTH ---------------------------------------------------------------
    let uData = { name: localStorage.user,
                  region: localStorage.region,
                  pokeDollars: Number(localStorage.pokeDollars),
                  shuckleInfo: JSON.parse(localStorage.shuckleInfo),
                  inventory: JSON.parse(localStorage.inventory) };
    const [user, setUser] = useState(uData);

    function userHandler(data) 
    { 
        setUser(data); 
    }

    useEffect(() => {
        if (!(user.name === "guest")) {
            localStorage.user = user.name;
            localStorage.firstTime = false;
            localStorage.region = user.region;
            localStorage.pokeDollars = user.pokeDollars;
            localStorage.shuckleInfo = JSON.stringify(user.shuckleInfo);
            localStorage.inventory = JSON.stringify(user.inventory);
            if (user.shuckleInfo['adopted'] === true)
                localStorage.shopState = 8;
        } 
    }, [user]);
    // -------------------------------------------------------------------------

    const [gameMode, setGameMode] = useState(JSON.parse(localStorage.gameMode));

    function toggleGameMode()
    {
        setGameMode(!(gameMode));
    }

    const [isGameOver, setGameOver] = useState([false, '']);

    const [pokeDollars, setPokeDollars] = 
        useState(Number(localStorage.pokeDollars));

    function dollarHandler(delta) 
    { 
        setPokeDollars(Number(localStorage.pokeDollars) + delta);
        localStorage.pokeDollars = Number(localStorage.pokeDollars) + delta;
    }

    const [pokemon, setPokemon] = useState('eddie');
    const pokeList = props.pokeList;

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

        if (!isGameOver[0]) {
            if (Number(localStorage.gameMode) % 2 === 0)
                setPokemon(getDaily());
            else
                setPokemon(getRandom());
        }
        usedPokemon.push(pokemon);
    }, [isGameOver[0], gameMode]);  // ? ? ?

	return (
        <>
            <div className = {classes.center}>
                <DisplayMan id = "header"
                        user = {user}
                        userHandler = {userHandler}
                        gameMode = {gameMode}
                        toggleGameMode = {toggleGameMode}
                        pokemon = {pokemon}
                        dollarHandler = {dollarHandler}
                        isGameOver = {isGameOver}
                        setGameOver = {setGameOver} />

                { JSON.parse(localStorage.shuckleInfo)["adopted"] &&
                    <ShuckleMechanics/> }
            </div>

			{ !(pokemon === "eddie") &&  
                <GSDiv  id = "gsdiv"
                        pokemon = {pokemon} 
                        pokeList = {pokeList}
                        dollarHandler = {dollarHandler}                        
                        isGameOver = {isGameOver} 
                        setGameOver = {setGameOver}/>}
        </>
	)
}

export default Squordle;
