/*
 * WinLoseDisplay.js 
*/

import classes from "./style/WinLoseDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

import {useState, useEffect} from 'react';

function WinLoseDisplay(props)
{
	var answer = props.pokeAnswer;
    var spriteRef = spriteLink(answer);
    let imgName, gameOverTxt;

    useEffect(() => {
        props.winLoseHandler();
    }, []);

    function winOrLose()
    {
        if (props.isGameOver[1] === 'win') {
            imgName = "WinTextLight";
            gameOverTxt = "The pokémon was " + answer[0].toUpperCase() + 
                answer.slice(1);
        }

        else {
            imgName = "LoseTextLight";
            gameOverTxt = "The correct pokémon was " + answer[0].toUpperCase() +
                answer.slice(1);
        }
    }

	return (
        <div className = {classes.winLoseDisplay}> 
            { winOrLose() }
                <img className = {classes.textDisplay}
                     src = {require("../assets/" + imgName + ".png")}/>
                <img className = {classes.spriteDisplay}
                     src = {spriteRef}/>
                <p> {gameOverTxt} </p>
			<button onClick = {() => props.reload()}> Play Again? </button>
		</div>
	);
}

export default WinLoseDisplay;
