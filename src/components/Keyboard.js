/*
 * Keyboard.js
*/

import classes from "./style/Keyboard.module.css";
import KeyRow from "./KeyRow.js"

function Keyboard(props)
{
	return (
		<div className = {classes.Keyboard}>
	      	<KeyRow key = "kr1" 
                    id = "kr1" 
                    padding = {"125px"} 
                    handler = {props.handler} 
                    gamespace = {props.gamespace} 
                    setGamespace = {props.setGamespace} 
                    letterStates = {props.letterStates} 
                    keys = {props.validKeys.slice(0, 10)}/>
	      	<KeyRow key = "kr2" 
                    id = "kr2" 
                    padding = {"150px"} 
                    handler = {props.handler} 
                    gamespace = {props.gamespace} 
                    setGamespace = {props.setGamespace} 
                    letterStates = {props.letterStates} 
                    keys = {props.validKeys.slice(10,19)}/>
	      	<KeyRow key = "kr3" 
                    id = "kr3" 
                    padding = {"126px"} 
                    handler = {props.handler} 
                    gamespace = {props.gamespace} 
                    setGamespace = {props.setGamespace} 
                    letterStates = {props.letterStates} 
                    keys = {["Backspace"].concat(
                        props.validKeys.slice(19,27).concat("Enter"))}/>
		</div>
	)
}

export default Keyboard;
