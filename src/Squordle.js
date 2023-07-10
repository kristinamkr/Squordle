import classes from "./components/style/Squordle.module.css";

import DisplayMan from "./components/DisplayMan.js";
import ShuckleMechanics from "./components/ShuckleMechanics.js";
import GSDiv from "./components/GSDiv.js";

import loadSave from "./functions/loadSave.js";

import { createContext, useState, useEffect } from 'react';
export const GameContext = createContext();

loadSave();

function Squordle(props) 
{
    console.log("RELOADING SQUORDLE");

    const [gameMode, setGameMode] = useState(JSON.parse(localStorage.gameMode));
    const [isGameOver, setGameOver] = useState([false, '']);

    const [pokemon, setPokemon] = useState('eddie');
    const [usedPokemon, setUsedPokemon] = useState([]);
    const pokeList = props.pokeList;
    const [pokeDollars, setPokeDollars] = 
        useState(Number(localStorage.pokeDollars));

    function toggleGameMode()
    {
        setGameMode(!(gameMode));
    }

    function dollarHandler(delta) 
    { 
        setPokeDollars(Number(localStorage.pokeDollars) + delta);
        localStorage.pokeDollars = Number(localStorage.pokeDollars) + delta;
    }

    useEffect(() => {
        function getDaily() 
        {
             const tempList = pokeList.filter(p => p.potd === "TRUE");
             tempList.sort((a, b) => b.lastModified > a.lastModified); 
             return tempList[0].name;
        }

        function getRandom() 
        {
            const max = pokeList.length;
            const i = Math.floor(Math.random() * max);
            let counter = 0;
            while ((pokeList[i].name.length < 5 || 
                    pokeList[i].name.length > 8) ||  
                usedPokemon.includes(pokeList[i].name)) 
            {
                // case where all Pokemon names are in usedPokemon || 
                // have inappropriate length...
                if (counter > max) break;
                i = Math.floor(Math.random() * max);
                counter++;
            }
            return pokeList[i].name;
        }

        if (!isGameOver[0]) {
            const newPokemon = Number(localStorage.gameMode) % 2 === 0 ? 
                getDaily() : getRandom();
            setPokemon(newPokemon);
            setUsedPokemon(prevPokemon => [...prevPokemon, newPokemon]);
        }
    }, [isGameOver[0], gameMode]);

	return (
        <GameContext.Provider value={{
            isGameOver, 
            setGameOver, 
            pokemon, 
            dollarHandler
        }}> 
            <div className = {classes.center}>
                <DisplayMan id = "header"/>

            {JSON.parse(localStorage.shuckleInfo)["adopted"] &&
                <ShuckleMechanics/>}
            </div>

            { !(pokemon === "eddie") &&  
                <GSDiv  id = "gsdiv"
                    pokeList = {pokeList}
                />
            }
        </GameContext.Provider>
	)
}

/*
user = {user}
userHandler = {userHandler}
filter = {filter}
filterHandler = {filterHandler}
*/
export default Squordle;
