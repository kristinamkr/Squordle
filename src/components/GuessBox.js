/*
 * GuessBox.js
 * looks cool & normal
*/

import classes from "./style/GuessBox.module.css";

var bg_colors = {
	"in_word": "#f5e554",
	"correct": "#78e22c",
	"empty": "none",
	"filled": "none",
	"incorrect": "#dadada"
}

function GuessBox(props) 
{
  return (
    <div className = {classes.GuessBox} 
         id = {props.id} 
         style = {{backgroundColor:bg_colors[props.state]}}>
      {props.letter}
    </div>
  )
}

export default GuessBox;
