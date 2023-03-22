/*
 * GuessBox.js
*/

import classes from "./style/GuessBox.module.css";

var bgColors = {
    "inWord": "#f5e554",
	"correct": "#78e22c",
	"empty": "none",
	"filled": "none",
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

export default GuessBox;
