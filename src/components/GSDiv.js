/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";
import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import PoffinStorage from "./PoffinStorage.js";
import DisplayMan from "./DisplayMan.js";
import PokeList from "./PokeList.js";
import gameInit from "../functions/gameInit.js";
import loadSave from "../functions/loadSave.js";
import { useState, useEffect } from 'react';

var inits = gameInit();
loadSave();

var gsInit = inits.gsInit;
var lsInit = inits.lsInit;
var pokeAnswer = inits.pokeAnswer;
var wordLength = pokeAnswer.length;

var validKeys = inits.validKeys;
var validKeysSet = new Set(validKeys);
var pokemonSet = new Set(PokeList);

function GSDiv(props) 
{
	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
  		return () => document.removeEventListener("keydown", keyDownHandler);
    });

	const [gameSpace, setGameSpace] = useState(gsInit);
	const [letterStates, setLetterStates] = useState(lsInit);
    const [pokeDollars, setPokeDollars] = 
           useState(Number(window.localStorage.pokeDollars));
    window.localStorage.pokeDollars = pokeDollars; 

    function findFocus(gameSpace) 
    {
        for (var i = 0; i < gameSpace.length; i++) {
            if (gameSpace[i].state === "empty") {
                for (var k = 0; k < gameSpace[i].boxes.length; k++) {
                    if (gameSpace[i].boxes[k].state === "empty")
                        return [i, k];
                    }
                    return [i, -1];
                }
            }
        return 0;
    }

	function checkAnswer(row)
    {
	    var wordSet = pokeAnswer.split('');
	    var isWinner = true;

	    var lsChange = letterStates;

	    for (var i = 0; i < pokeAnswer.length; i++) {
            var letter = row.boxes[i].letter;
            if (letter === pokeAnswer[i]) {
                row.boxes[i].state = "correct";
                lsChange["correctGuess"].add(letter);
                setLetterStates(lsChange);
                for(var k = 0; k < wordSet.length; k++) {
                    if (letter === wordSet[k]) {
                        wordSet.splice(k, 1);
                        break;
                    }
                }
            }
            else
                isWinner = false;
	    }

	    for (var i = 0; i < pokeAnswer.length; i++) {
            if (row.boxes[i].state === "correct")
                continue;

            var letter = row.boxes[i].letter;
            var isInWord = false;

	        for (var k = 0; k < wordSet.length; k++) {
                if (letter === wordSet[k]) {
                    isInWord = true;
                    wordSet.splice(k, 1);
                    break;
                }
	        }

            if (isInWord) {
                row.boxes[i].state = "inWord";
                lsChange["inWord"].add(letter);
	        }
            else if (row.boxes[i].state === "filled") {
                row.boxes[i].state = "incorrect";
                lsChange["notInWord"].add(letter);
	        }
	    }

	    if (isWinner) {
            row.state = "winner";
	        row.winnings += 200;
	    }
        else {
            for (var i = 0; i < pokeAnswer.length; i++) {
                if (row.boxes[i].state === "correct")
	    			row.winnings += 20;
                else if(row.boxes[i].state === "inWord")
	    			row.winnings += 5;
	    	}
	    }

	    setLetterStates(lsChange);
	    return row;
	}

	function keyDownHandler(e)
    {
		var input = e.key || e.target.value;
	    const isValidKey = validKeysSet.has(input);

	    var foc = findFocus(gameSpace);
	    var gameChange = gameSpace;

	    var guess = "";
	    for (var i = 0; i < wordLength; i++)
            guess = guess + gameChange[foc[0]].boxes[i].letter;
	    var isPokemon = pokemonSet.has(guess);
        console.log("guess = " + guess);

	    if (foc[1] === -1 && input === "Enter" && isPokemon) {
	        var rowChange = checkAnswer(gameChange[foc[0]]);

	        if (rowChange.state !== "winner")
                rowChange.state = "filled";
	        rowChange.guess = guess;
	    }
	    else if (input === "Backspace") {
            if (foc[1] === -1) {
                gameChange[foc[0]].boxes[wordLength - 1].state = "empty";
                gameChange[foc[0]].boxes[wordLength - 1].letter = '';
	        }
            else if (foc[1] !== 0) {
                gameChange[foc[0]].boxes[foc[1] - 1].state = "empty";
                gameChange[foc[0]].boxes[foc[1] - 1].letter = '';
            }
	    }
	    else if (foc[1] !== -1 && isValidKey) {
            gameChange[foc[0]].boxes[foc[1]].letter = input;
            gameChange[foc[0]].boxes[foc[1]].state = "filled"
	    }

        console.log("foc - " + foc[1]);

	    dollarHandler(gameChange[foc[0]].winnings)
	    // showComplete(gameChange);
        setGameSpace([...gameChange]);

	    console.log(pokeAnswer);
    }

  	function dollarHandler(delta)
    {
        setPokeDollars(pokeDollars + delta);
  	}

	return (
        <div className = {classes.GSDiv}>
			{window.localStorage.adoptedShuckle === "true" && 
                 <PoffinStorage keyDownHandler = {keyDownHandler}
                                validKeys = {validKeys}/>}

			<header className = "MenuBar">
                <div className = {classes.header}>
                    <img style = {{height: "35px"}} 
                         src = {require("../assets/pokedollarLight.png")}/>
                    {" "}{pokeDollars}
                </div>
                <div className = {classes.gameTitle}>
                    <img src = {require("../assets/LogoLight.png")}/>
                </div>
                <DisplayMan id = "displayMan"
                        gameSpace = {gameSpace}
                        dollarHandler = {dollarHandler}
                        pokeAnswer = {pokeAnswer} />
      		</header>

      		<div className = "Spacer"/>
                <GameSpace id = "gameSpace"
                        gameSpace = {gameSpace}
                        wordLength = {wordLength}/>
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
