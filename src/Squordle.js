import classes from "./components/style/Squordle.module.css";

import DisplayMan from "./components/DisplayMan";
import ShuckleMechanics from "./components/ShuckleMechanics";
import GSDiv from "./components/GSDiv";

import loadSave from "./functions/loadSave";

import { createContext, useState, useEffect } from 'react';
export const GameContext = createContext();

loadSave();

function Squordle(props) 
{
    console.log("RENDERING SQUORDLE...");
    const user = props.user;
    const userHandler = props.userHandler;

    const [gameMode, setGameMode] = useState(JSON.parse(localStorage.gameMode));
    const [isGameOver, setGameOver] = useState([false, '']);

    const [genFilter, setGenFilter] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false 
    });

    const [pokemon, setPokemon] = useState('eddie');
    const [usedPokemon, setUsedPokemon] = useState([]);
    const pokeList = props.pokeList;
    const [pokeDollars, setPokeDollars] = 
        useState(Number(localStorage.pokeDollars));

    function toggleGameMode(x)
    {
        setGameMode(x);
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
            let potd = JSON.parse(localStorage.potd);
            if (potd['daily'] !== tempList[0].name) {
                potd['daily'] = tempList[0].name;
                potd['isStarted'] = false;
                potd['isWon'] = false;
            }
            localStorage.potd = JSON.stringify(potd);
            return tempList[0].name;
        }

        function getRandom() 
        {
            const max = pokeList.length;
            let i = Math.floor(Math.random() * max);
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
            const newPokemon = gameMode % 2 === 0 ? getDaily() : getRandom();
            setPokemon(newPokemon);
            setUsedPokemon(prevPokemon => [...prevPokemon, newPokemon]);
        }
    }, [isGameOver[0], gameMode]);

	return (
        <GameContext.Provider value={{
            user,
            userHandler,
            isGameOver, 
            setGameOver, 
            pokemon, 
            dollarHandler,
            gameMode,
            toggleGameMode
        }}> 
            <div className = {classes.center}>
                <DisplayMan id = "header"/>

            {JSON.parse(localStorage.shuckleInfo)["adopted"] &&
                <ShuckleMechanics />}
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
filter = {filter}
filterHandler = {filterHandler}
*/
export default Squordle;
