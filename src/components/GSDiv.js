/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";

import { useState, useEffect } from 'react';

import boardInit from "../functions/boardInit.js";

function GSDiv(props) 
{

    const pokeList = props.pokeList;
    const pokeAnswer = props.pokemon; 

    const validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

	const [gameSpace, setGameSpace] = useState(null);
	const [letterStates, setLetterStates] = useState(null);
    const [focus, setFocus] = useState([0, 0]) // (row #, box #)

	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    });

    useEffect(() => { 
        initGameSpace();
    }, [pokeAnswer, props.newPokemon]);

    function initGameSpace()
    {
        let boardState;
        if (Number(localStorage.gameMode) === 0 && 
            JSON.parse(localStorage.potd)["daily"] === pokeAnswer) {
            boardState = JSON.parse(localStorage.boardState);
        }
        else {
            boardState = boardInit(pokeAnswer);
            if (Number(localStorage.gameMode) === 0) {
                let temp = JSON.parse(localStorage.potd);
                temp["daily"] = pokeAnswer;
                temp["isWon"] = false; 
                localStorage.potd = JSON.stringify(temp);
                localStorage.boardState = JSON.stringify(boardState);
            }
        }

        setFocus(boardState["focus"]);
        setGameSpace(boardState["gameSpace"]);
        setLetterStates(boardState["letterStates"]);
    }

    // -------------------------------------------------------------------------
	function keyDownHandler(e)
    {
        console.log(pokeAnswer);
        const input = e.key || e.target.value;
        const validKeySet = new Set(validKeys);

	    var guess = "";
        for (var i = 0; i < pokeAnswer.length; i++) {
            //if (gameSpace[focus[0]])
                guess = guess + gameSpace[focus[0]].boxes[i].letter;
        }

        if (!(props.isGameOver[0]) && 
            !(JSON.parse(localStorage.backdrop)) &&
            (!(JSON.parse(localStorage.potd)["isWon"])|| 
             Number(localStorage.gameMode) === 1)) 
        {
            if (input === "Enter" && focus[1] === pokeAnswer.length 
                && checkValidity(guess)) {
                    checkAnswer(gameSpace[focus[0]]);
                    gameSpace[focus[0]].guess = guess;
                    focus[0] += 1;
                    focus[1] = 0;
            }
            else if (input === "Backspace" && focus[1] !== 0) { 
                focus[1] -= 1;
                gameSpace[focus[0]].boxes[focus[1]].state = "empty";
                gameSpace[focus[0]].boxes[focus[1]].letter = '';
            }
            else if (focus[1] < pokeAnswer.length &&  // default 
                     validKeySet.has(input)) { 
                gameSpace[focus[0]].boxes[focus[1]].letter = input;
                gameSpace[focus[0]].boxes[focus[1]].state = "filled"
                focus[1] += 1;
            }
        }

        if (!(JSON.parse(localStorage.backdrop)) && !(JSON.parse(localStorage.potd)["isWon"])){
            setGameSpace([...gameSpace]);
        }
    }

    // HELPER FUNCTIONS -------------------------------------------------------
	function checkAnswer(row)
    {
	    var lsChange = letterStates;
        var tileList = pokeAnswer.split("");
        var boxes = row.boxes;
        let pointsWon = 0; 

        for (var i = 0; i < pokeAnswer.length; i++) {

            if (boxes[i].letter === pokeAnswer[i]) {  // green
                boxes[i].state = "correct";

                //cleanable, basically the equivalent of Set().add(), but for an array instead bc JSON can't store sets >.<
                var found = false;
                for (var k = 0; k < lsChange.correctGuess.length; k++) {
                    if (lsChange.correctGuess[k] === boxes[i].letter) {
                        found = true;
                    }
                }
                if(!found){
                    lsChange.correctGuess.push(boxes[i].letter);
                }

                setLetterStates(lsChange);
                tileList.splice(i, 1);
                pointsWon += 20;

            }
        }

        for (var i = 0; i < pokeAnswer.length; i++) {
            //skip over correct answers
            if (boxes[i].state === "correct") {
                continue;
            }

            //check if the rest are in the word somewhere
            if (isInAnswer(boxes[i].letter, tileList)) {   // yellow
                boxes[i].state = "inWord";

                //cleanable, basically the equivalent of Set().add(), but for an array instead bc JSON can't store sets >.<
                var found = false;
                for (var k = 0; k < lsChange.inWord.length; k++) {
                    if (lsChange.inWord[k] === boxes[i].letter) {
                        found = true;
                    }
                }
                if(!found){
                    lsChange.inWord.push(boxes[i].letter);
                }

                pointsWon += 5;
            }
            else {                               // gray
                boxes[i].state = "incorrect";
                
                //cleanable, basically the equivalent of Set().add(), but for an array instead bc JSON can't store sets >.<
                var found = false;
                for (var k = 0; k < lsChange.notInWord.length; k++) {
                    if (lsChange.notInWord[k] === boxes[i].letter) {
                        found = true;
                    }
                }
                if(!found){
                    lsChange.notInWord.push(boxes[i].letter);
                }
            }
        }

        var boardState = {gameSpace: gameSpace, 
                          letterStates: letterStates, 
                          focus: [focus[0]+1 ,0]};

        if (Number(localStorage.gameMode) === 0)
            localStorage.boardState = JSON.stringify(boardState);

        if (isWinner(row)) {
            row.state = "winner";
            if (Number(localStorage.gameMode) === 0) {
                let temp = JSON.parse(localStorage.potd);
                temp["isWon"] = true;
                localStorage.potd = JSON.stringify(temp); 
            }
            updateHatching();
            props.setGameOver([true, 'win']);
            setGameSpace(null);
            setFocus([-1, focus[1]]);
            pointsWon += 200;
        } else {
            if (focus[0] === 5 && focus[1] === pokeAnswer.length) {
                props.setGameOver([true, 'loss']);
                setGameSpace(null);
                setFocus([-1, focus[1]]);
            }
            row.state = "filled";
        }

        row.winnings += pointsWon;
        setLetterStates(lsChange);
	    props.dollarHandler(pointsWon); 
        return row;
	}

    function isInAnswer(letter, tileList)
    {
        for (var i = 0; i < tileList.length; i++){
            if (letter === tileList[i]) {
                tileList.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function isWinner(row)
    {
        for (var i = 0; i < row.length; i++) {
            const boxes = row.boxes;
            if (!(boxes[i].state === "correct"))
                return false;
        }
        return true;
    }

    function checkValidity(guess) {
        for (let i = 0; i < pokeList.length; i++)
            if (pokeList[i] === guess)
                return true;
        return false;
    } 

    // needs to/should be moved to shuckle. 
    function updateHatching(){
        let tempInfo = JSON.parse(localStorage.shuckleInfo);
        var shuckleChildren = tempInfo["children"]; 

        for (var i = 0; i < shuckleChildren.length; i++) {
            if (shuckleChildren[i].state === "shuckleEgg0") {
                shuckleChildren[i].state = "shuckleEgg1";
                break;
            } else if (shuckleChildren[i].state === "shuckleEgg1") {
                shuckleChildren[i].state = "shuckleEgg2";
                break;
            } else if (shuckleChildren[i].state === "shuckleEgg2") {
                shuckleChildren[i].state = "shuckle";
                break
            }
        }

        tempInfo["children"] = shuckleChildren;
        localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));
    }

	return (
        <> { gameSpace && letterStates && 
            <div className = {classes.gsDiv}>
                <GameSpace id = "gameSpace"
                           gameSpace = {gameSpace}
                           wordLength = {pokeAnswer.length}/>
                { letterStates && 
                    <Keyboard  id = "keyboard" 
                               letterStates = {letterStates} 
                               handler = {keyDownHandler}
                               gameSpace = {gameSpace}
                               setGameSpace = {setGameSpace} 
                               validKeys = {validKeys}/> }
            </div>
        } </>
	)
}

export default GSDiv;
