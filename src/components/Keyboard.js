/*
 * Keyboard.js
*/

import classes from "./style/Keyboard.module.css";
import KeyRow from "./KeyRow.js"

function Keyboard(props)
{

    function createRow(rowID, padding, range)
    {
        let keys = props.validKeys.slice(range[0], range[1]);
        if (rowID === "3")
            keys = ["Backspace"].concat(keys).concat("Enter");
        
        return (
            <KeyRow id = {rowID} 
                    padding = {padding} 
                    handler = {props.handler} 
                    gameSpace = {props.gameSpace} 
                    setGameSpace = {props.setGameSpace} 
                    letterStates = {props.letterStates} 
                    keys = {keys} />
        )
    }

	return (
		<div className = {classes.keyboard}>
            { createRow("1", "125px", [0, 10]) }
            { createRow("2", "150px", [10, 19]) }
            { createRow("3", "126px", [19, 27]) }
		</div>
	)
}

export default Keyboard;
