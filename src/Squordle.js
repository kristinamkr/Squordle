import classes from "./components/style/Squordle.module.css";

import DisplayMan from "./components/DisplayMan.js";
// import ShuckleMechanics from "./components/ShuckleMechanics.js";
import GSDiv from "./components/GSDiv.js";
import loadSave from "./functions/loadSave.js";

import { createContext, useState, useEffect } from 'react';
export const GameContext = createContext();

loadSave();

let usedPokemon = []; 
function Squordle(props) 
{
    console.log("RELOADING SQUORDLE");

    const [isGameOver, setGameOver] = useState([false, '']);

    const [pokemon, setPokemon] = useState('eddie');
    const pokeList = props.pokeList;
    const [pokeDollars, setPokeDollars] = useState(Number(localStorage.pokeDollars));

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

        if (!isGameOver[0])
            setPokemon(getDaily());
        usedPokemon.push(pokemon);
    }, [isGameOver]); 

	return (
        <GameContext.Provider value={{
            isGameOver, 
            setGameOver, 
            pokemon, 
            dollarHandler
        }}> 
            <div className = {classes.center}>
                <DisplayMan id = "header"/>
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



                { JSON.parse(localStorage.shuckleInfo)["adopted"] &&
                    <ShuckleMechanics/> }
*/
export default Squordle;
