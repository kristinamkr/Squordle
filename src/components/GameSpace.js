/*
 * GameSpace.js
*/

import classes from "./style/GameSpace.module.css";
import { useState, useEffect } from 'react';

var bgColors = {
    "inWord": "#f5e554",
	"correct": "#78e22c",
	"incorrect": "#dadada"
}

function GuessBox(props) 
{
    return (
        <div className = {classes.guessBox} 
             id = {props.id} 
             style = {{backgroundColor: bgColors[props.state]}}>
            {props.letter}
        </div>
    )
}

function GameRow(props)
{
    const guess = props.guess;

	return (
		<div className = {classes.gameRow}
             style = {{gridTemplateColumns: 
                "1fr " + "40px ".repeat(props.length) + "1fr"}}>

            {props.sprite == "NaN" && 
                <img className = {classes.pokeSprite} 
                     src = {require("../assets/transparency.png")} /> } 

            {props.sprite != "NaN" && 
                <img className = {classes.pokeSprite} 
                     style = {{top: props.upDownPos}}
                     src = {props.sprite} /> } 

			{props.boxes.map((box) => (<GuessBox key = {box.id}
			                                     state = {box.state}
			                                     letter = {box.letter}/>))}

            {props.sprite == "NaN" && 
                <img className = {classes.pokeSprite} 
                     src = {require("../assets/transparency.png")} /> } 

            {props.sprite != "NaN" && 
                <img className = {classes.pokeSprite} 
                     style = {{top: -props.upDownPos - 10}}
                     src = {props.sprite} /> } 
        </div>
	)
}

function GameSpace(props)
{
    console.log("THINKING EMOJI");
    const [counter, setCounter] = useState(1); 

    useEffect(() => { 
        counter > 0 && setTimeout(() => setCounter(counter + 1), 1000);
    }, [counter]);

    return (
        <div className = {classes.gameSpace} 
             style = {{gridTemplateRows: "1fr".repeat(6)}}>
            { props.gameSpace.map((row) => 
                (<GameRow key = {row.id}
                          state = {row.state}
                          length = {row.length}
                          boxes = {row.boxes}
                          guess = {row.guess} 
                          sprite = {row.sprite}
                          upDownPos = {-10 * (counter % 2)} /> )) }
        </div>
  )
}

export default GameSpace;
