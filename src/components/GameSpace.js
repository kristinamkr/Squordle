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
    console.log("\t\t\tRENDERING GUESSBOX...");
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
    console.log("\t\tRENDERING GAMEROW...");

	return (
		<div className = {classes.gameRow}
             style = {{gridTemplateColumns: 
                "1fr " + "40px ".repeat(props.length) + "1fr"}}>
			{props.boxes.map((box) => (<GuessBox key = {box.id}
			                                     state = {box.state}
			                                     letter = {box.letter}/>))}
        </div>
	);
}

function GameSpace(props)
{
    console.log("\tRENDERING GAMESPACE...");

    return (
        <div className = {classes.gameSpace} 
             style = {{gridTemplateRows: "1fr".repeat(6)}}>
            { props.gameSpace.map((row) => (
                <GameRow key = {row.id}
                         state = {row.state}
                         length = {row.length}
                         boxes = {row.boxes}
                         guess = {row.guess} 
                         sprite = {row.sprite}
                />
            ))}
        </div>
    );
}

/*
            {props.sprite == "NaN" && 
                <img className = {classes.pokeSprite} 
                     src = {require("../assets/transparency.png")} /> } 

            {props.sprite != "NaN" && 
                <img className = {classes.pokeSprite} 
                     style = {{top: props.upDownPos}}
                     src = {props.sprite} /> } 

            {props.sprite == "NaN" && 
                <img className = {classes.pokeSprite} 
                     src = {require("../assets/transparency.png")} /> } 

            {props.sprite != "NaN" && 
                <img className = {classes.pokeSprite} 
                     style = {{top: -props.upDownPos - 10}}
                     src = {props.sprite} /> } 

    const [counter, setCounter] = useState(1); 

    useEffect(() => { 
        counter > 0 && setTimeout(() => setCounter(counter + 1), 1000);
    }, [counter]);

                          upDownPos = {-10 * (counter % 2)} /> )) }
*/

export default GameSpace;
