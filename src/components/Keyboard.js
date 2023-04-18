/*
 * Keyboard.js
*/

import classes from "./style/Keyboard.module.css";

var bgColors = {
	"inWord": "#f5e554",
	"correct": "#78e22c",
	"normal": "#dadada",
	"incorrect": "#939393"
}

function KeyBox(props)
{

    if (props.id === "Enter") {
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
    else if (props.id === "Backspace") {
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

function KeyRow(props)
{
	function keyInWord(letterStates, id)
    {
        for(let i = 0; i < letterStates.correctGuess.length; i++) {
            if (letterStates.correctGuess[i] === id)
                return "correct";
        }
        for(let i = 0; i < letterStates.inWord.length; i++) {
            if (letterStates.inWord[i] === id)
                return "inWord";
        }
        for(let i = 0; i < letterStates.notInWord.length; i++) {
            if (letterStates.notInWord[i] === id)
                return "incorrect";
        }
        return "normal";
	}

	return (
        <div className = {classes.keyRow} 
             style = {{paddingLeft: props.padding, 
                       paddingRight: props.padding, 
                       gridTemplateColumns: "1fr ".repeat(props.keys.length)}}>
            { props.keys.map((item) => 
                (<KeyBox key = {item}
                         id = {item}
                         handler = {props.handler}
                         gameSpace = {props.gameSpace}
                         setGameSpace = {props.setGameSpace}
                         state = {keyInWord(props.letterStates, item)} />))}
		</div>
	)
};

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
