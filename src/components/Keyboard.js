/*
 * Keyboard.js
*/

import classes from "./style/Keyboard.module.css";
import { useContext } from 'react';
import { KeyContext } from './GSDiv.js';

const validKeys = 'qwertyuiopasdfghjklzxcvbnm'.split('');

var bgColors = {
	inWord: "#f5e554",
	correct: "#78e22c",
	normal: "#dadada",
	incorrect: "#939393"
}

function KeyBox(props)
{
    const { 
        keyDownHandler
    } = useContext(KeyContext); 

    const buttonContent = props.id === 'Enter' ? 
        '↵' : props.id === 'Backspace' ? 'BACK' : props.id;

    const buttonStyle = props.id !== 'Enter' && props.id !== 'Backspace' ? 
        {backgroundColor: bgColors[props.state]} : {fontSize: '12px'};

    const buttonClass = props.id === 'Enter' || props.id === 'Backspace' ? 
        classes.keyBoxLong : classes.keyBox; 
    
    return (
        <button id={props.id}
            className={buttonClass}
            style={buttonStyle}
            value={props.id}
            onClick={keyDownHandler}>
            {buttonContent}
        </button>
    );
}

function KeyRow(props)
{
    const { 
        letterStates,
    } = useContext(KeyContext); 

	const keyInWord = (letterStates, id) => {
        if (letterStates.correctGuess.includes(id)) return 'correct';
        if (letterStates.inWord.includes(id)) return 'inWord';
        if (letterStates.notInWord.includes(id)) return 'incorrect';
        return 'normal';
    }

	return (
        <div className = {classes.keyRow} 
            style = {{
                paddingLeft: props.padding, 
                paddingRight: props.padding, 
                gridTemplateColumns: "1fr ".repeat(props.keys.length)
            }}>
            { props.keys.map((item) => ( 
                <KeyBox key = {item}
                   id = {item}
                   state = {keyInWord(letterStates, item)} 
                />
            )) }
		</div>
	)
};

function Keyboard(props)
{
    const createRow = (rowID, padding, range) => {
        let keys = validKeys.slice(range[0], range[1]);
        if (rowID === '3')
            keys = ['Backspace'].concat(keys).concat('Enter');

        return (
            <KeyRow id={rowID}
                padding={padding}
                keys={keys}
            />
        )
    }
    
    return (
        <div className={classes.keyboard}>
            { createRow('1', '125px', [0, 10]) }
            { createRow('2', '150px', [10, 19]) }
            { createRow('3', '126px', [19, 27]) }
        </div>
    )
}

export default Keyboard;
