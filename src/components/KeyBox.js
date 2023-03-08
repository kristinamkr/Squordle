/*
 * KeyBox.js
*/

import classes from "./style/KeyBox.module.css";

var bgColors = {
	"inWord": "#f5e554",
	"correct": "#78e22c",
	"normal": "#dadada",
	"incorrect": "#939393"
}

function KeyBox(props)
{
    /*
    function createKey(keyID) 
    {
        let classID = "keyBox";
        if (keyID === "Backspace" || keyID === "Enter") 
            classID = "keyBoxLong";

        return (
            <button id = {keyID} 
                    className = {classes[classID]} 
                    value = {keyID} 
                    onClick = {props.handler}>
                {keyChar}
            </button>
        )
    }

    return (
        <div>
        { createKey(props.id) } 
        </div>
    )
    */
    if (props.id == "Enter") {
        return (
            <button id = {props.id} 
                    className = {classes.keyBoxLong} 
                    style = {{fontSize: "24px"}} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {'↵'}
            </button>
        );
    }
    else if (props.id == "Backspace") {
        return (
            <button id = {props.id} 
                    className = {classes.keyBoxLong} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {"BACK"}
            </button>
        );
    }
    else {
        return (
            <button id = {props.id}
                    className = {classes.keyBox} 
                    style = {{backgroundColor: bgColors[props.state]}} 
                    value = {props.id} 
                    onClick = {props.handler}>
                {props.id}
            </button>
        );
    }
}

export default KeyBox;
