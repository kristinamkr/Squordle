/*
 * GameSpace.js
*/

import classes from "./style/GameSpace.module.css";
import spriteLink from  "../functions/SpriteLink.js";
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

    let spriteRef;
    if (!(props.checkValidity(guess)))
        spriteRef = "https://img.pokemondb.net/s.png";
    else
        spriteRef = spriteLink(guess);

	return (
		<div className = {classes.gameRow}
             style = {{gridTemplateColumns: 
                "1fr " + "40px ".repeat(props.length) + "1fr"}}>
			<img className = {classes.pokeSprite} 
                 style = {{top: props.upDownPos}}
                 src = {spriteRef} /> 
			{props.boxes.map((box) => (<GuessBox key = {box.id}
			                                     state = {box.state}
			                                     letter = {box.letter}/>))}
			<img className = {classes.pokeSprite} 
                 style = {{top: -props.upDownPos - 10}}
                 src = {spriteRef} />
        </div>
	)
}

function GameSpace(props)
{
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
                          upDownPos = {-10 * (counter % 2)}
                          checkValidity = {props.checkValidity}/>)) }
        </div>
  )
}

export default GameSpace;
