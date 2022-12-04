/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import DisplayMan from "./DisplayMan.js";
import ShuckleMechanics from './ShuckleMechanics.js';

import PokeList from "./PokeList.js";
import gameInit from "../functions/gameInit.js";
import loadSave from "../functions/loadSave.js";

import { useState, useEffect } from 'react';

loadSave();

var inits = gameInit();
var gsInit = inits.gsInit;
var lsInit = inits.lsInit;
var pokeAnswer = inits.pokeAnswer;

var validKeys = inits.validKeys;
var pokemonSet = new Set(PokeList);

const focus = [0, 0];  // (row #, box #)

function GSDiv(props) 
{
	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
  		return () => document.removeEventListener("keydown", keyDownHandler);
    });

	const [gameSpace, setGameSpace] = useState(gsInit);
	const [letterStates, setLetterStates] = useState(lsInit);
    const [isGameOver, setGameOver] = useState([false, '']);
    const [pokeDollars, setPokeDollars] = 
           useState(Number(window.localStorage.pokeDollars));
    window.localStorage.pokeDollars = pokeDollars; 

    // move dollarHandler?
  	function dollarHandler(delta)
    {
        setPokeDollars(pokeDollars + delta);
  	}

	function checkAnswer(row)
    {
	    var lsChange = letterStates;
        let pointsWon = 0;

	    for (var i = 0; i < pokeAnswer.length; i++) {
            var currentBox = row.boxes[i];

            if (currentBox.letter === pokeAnswer[i]) {  // green
                currentBox.state = "correct";
                pointsWon += 20;
                lsChange["correctGuess"].add(currentBox.letter);
                setLetterStates(lsChange);
            }
            else if (isInAnswer(currentBox.letter)) {   // yellow
                currentBox.state = "inWord";
                pointsWon += 5;
                lsChange["inWord"].add(currentBox.letter);
            }
            else {                                      // gray
                currentBox.state = "incorrect";
                lsChange["notInWord"].add(currentBox.letter);
            }
        }

        if (isWinner(row)) {
            row.state = "winner";
            setGameOver([true, 'win']);
            pointsWon += 200;
        }
        else {
            if (focus[0] === 5 && focus[1] === pokeAnswer.length)
                setGameOver([true, 'loss']);
            row.state = "filled";
        }

	    dollarHandler(pointsWon)
        row.winnings += pointsWon;
        setLetterStates(lsChange);
        return row;
	}

    function isInAnswer(letter)
    {
        const answerSet = new Set(pokeAnswer);
        if (answerSet.has(letter)) return true;
        return false;
    }

    function isWinner(row)
    {
        for (var i = 0; i < row.length; i++) {
            const currentBox = row.boxes[i];
            if (currentBox.state != "correct") 
                return false;
        }
        return true;
    }

	function keyDownHandler(e)
    {
        const input = e.key || e.target.value;
        const validKeySet = new Set(validKeys);

	    var guess = "";
	    for (var i = 0; i < pokeAnswer.length; i++)
            guess = guess + gameSpace[focus[0]].boxes[i].letter;

	    if (input === "Enter" && 
            focus[1] === pokeAnswer.length && pokemonSet.has(guess)) {
	        var currentRow = checkAnswer(gameSpace[focus[0]]);
	        currentRow.guess = guess;
            focus[0] += 1;
            focus[1] = 0;
	    }
	    else if (input === "Backspace" && focus[1] != 0) { 
            focus[1] -= 1;
            gameSpace[focus[0]].boxes[focus[1]].state = "empty";
            gameSpace[focus[0]].boxes[focus[1]].letter = '';
	    }
        else if (input === "Escape")
        {
            // itemSelected - deselect
        } 
	    else if (focus[1] < pokeAnswer.length &&  // default 
                 validKeySet.has(input)) { 
            gameSpace[focus[0]].boxes[focus[1]].letter = input;
            gameSpace[focus[0]].boxes[focus[1]].state = "filled"
            focus[1] += 1;
	    }

        setGameSpace([...gameSpace]);
	    console.log(pokeAnswer);
    }

	return (
        <div className = {classes.gsDiv}>
            { window.localStorage.adoptedShuckle === "true" &&
                <ShuckleMechanics validKeys = {validKeys}/> } 

			<header className = {classes.menuBar}>
                <div className = {classes.pHeader}>
                    <img src = {require("../assets/pokedollarLight.png")}/>
                    {" "}{pokeDollars}
                </div>

                <div className = {classes.gameTitle}>
                    <img src = {require("../assets/LogoLight.png")}/>
                </div>

                <DisplayMan id = "displayMan"
                            gameSpace = {gameSpace}
                            isGameOver = {isGameOver}
                            dollarHandler = {dollarHandler}
                            pokeAnswer = {pokeAnswer} />
      		</header>
      		<div className = {classes.spacer}/>
            <GameSpace id = "gameSpace"
                       gameSpace = {gameSpace}
                       wordLength = {pokeAnswer.length}/>
            <Keyboard id = "keyboard" 
                      letterStates = {letterStates} 
                      handler = {keyDownHandler}
                      gameSpace = {gameSpace}
                      setGameSpace = {setGameSpace} 
                      validKeys = {validKeys}/>
        </div>
	)
}

export default GSDiv;
