/*
 * WinLoseDisplay.js 
*/

import classes from "./style/WinLoseDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

import { useContext } from 'react';
import { GameContext } from '../Squordle.js';

function WinLoseDisplay(props)
{
    const { 
        gameMode, 
        isGameOver, 
        pokemon, 
    } = useContext(GameContext); 

	var answer = pokemon.toLowerCase();
    var spriteRef = spriteLink(answer);
    let imgName, gameOverText;

    function winOrLose()
    {
        let dailyText = gameMode % 2 === 0 ? 
            '. Check back again tomorrow for a new pokémon!' : '.'; 
        const wonGame = isGameOver[1] === 'win';
        imgName = wonGame ? 'WinTextLight' : 'LoseTextLight';
        const actionText = wonGame ? 
            'The pokémon was' : 'The correct pokémon was';
        gameOverText = `${actionText} ${answer.charAt(0).toUpperCase() + 
            answer.slice(1)}${dailyText}`;  
    }

	return (
        <div className = {classes.winLoseDisplay}>
            { winOrLose() }
            <img className = {classes.textDisplay}
                 src = {require("../assets/" + imgName + ".png")}/>
            <img className = {classes.spriteDisplay}
                 src = {spriteRef}/>
            <p> {gameOverText} </p>           
            {gameMode % 2 === 0 && 
                <button onClick = {() => props.reload()}> Close </button>}
            {gameMode % 2 === 1 && 
                <button onClick = {() => props.reload()}> Play Again? </button>}
        </div>
	);
}

export default WinLoseDisplay;
