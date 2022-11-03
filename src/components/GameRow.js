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
    var upDownPos = props.upDownPos;
    var guess = props.guess;
    var spriteRef = spriteLink(guess);

	return (
		<div className = {classes.GameRow}
             style = {{gridTemplateColumns: "1fr ".repeat(props.length + 2)}}>
			<img style = {{width: "64px",
                         height: "48px",
                         position: "relative",
                         top: props.upDownPos}} 
                 src = {spriteRef}/>
			{ props.boxes.map((box) => (<GuessBox key = {box.id}
	       	                                      id = {box.id} 
		    	                                  delay = {box.delay}
			                                      state = {box.state}
				                                  letter = {box.letter}/>))}
			<img style = {{width: "64px",
                           height: "48px",
                           position: "relative",
                           top: -props.upDownPos - 10}} 
                 src = {spriteRef}/>
        </div>
	)
}

export default GameRow;
