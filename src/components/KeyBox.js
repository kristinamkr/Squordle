/*
 * KeyBox.js
*/

import classes from "./style/KeyBox.module.css";

var bg_colors = {
	"in_word": "#f5e554",
	"correct": "#78e22c",
	"normal": "#dadada",
	"incorrect": "#939393"
}

function KeyBox(props)
{
	if (props.id == "Enter") {
		return (
			<button id = {props.id} 
                    className = {classes.KeyBox_long} 
                    style = {{zIndex:"1", fontSize: "24px"}} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {'↵'}
			</button>
		);
	}
	else if (props.id == "Backspace") {
		return (
			<button id = {props.id} 
                    className = {classes.KeyBox_long} 
                    style = {{zIndex:"1"}} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {"BACK"}
			</button>
		);
	}
	else {
		return (
			<button id = {props.id} 
                    className = {classes.KeyBox} 
                    style = {{zIndex: "1", 
                              backgroundColor: bg_colors[props.state]}} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {props.id}
			</button>
		);
	}
}

export default KeyBox;
