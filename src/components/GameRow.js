/*
 * GameRow.js
 * cool
*/ 

import classes from "./style/GameRow.module.css";
import GuessBox from "./GuessBox.js";
import spriteLink from  "../functions/SpriteLink.js";

import React from 'react';

function GameRow(props)
{
    var guess = props.guess;
    var spriteRef = spriteLink(guess);

	return (
		<div className = {classes.GameRow}
             style = {{gridTemplateColumns: "1fr ".repeat(props.length + 2)}}>
			<img className = {classes.pokeSprite} 
                 style = {{top: props.upDownPos}}
                 src = {spriteRef}/>
			{ props.boxes.map((box) => (<GuessBox key = {box.id}
		    	                                  delay = {box.delay}
			                                      state = {box.state}
				                                  letter = {box.letter}/>))}
			<img className = {classes.pokeSprite} 
                 style = {{top: -props.upDownPos - 10}}
                 src = {spriteRef}/>
        </div>
	)
}

export default GameRow;
/*
                <img className = "shuckle" 
                     style = {{position: "absolute",
                               left: shucklePos[0] + "px",
                               top: shucklePos[1] + "px"}} 
                     src = {require("../assets/shuckle.gif")}/> }

*/
