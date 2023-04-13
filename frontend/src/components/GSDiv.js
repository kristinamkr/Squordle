/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";

import { useState, useEffect } from 'react';

let focus = [0, 0];  // (row #, box #)

const gsInit = Array(6);

function GSDiv(props) 
{
    console.log("GSDIV!");
    console.log("FOCUS ["+focus[0]+", "+focus[1]+"]");
    const pokeList = props.pokeList;
    const pokeAnswer = props.pokemon; 

    const validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

	const [gameSpace, setGameSpace] = useState(null);
	const [letterStates, setLetterStates] = useState(null);

	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        console.log("WTF");
        return () => document.removeEventListener("keydown", keyDownHandler);
    });

    useEffect(() => { 
        console.log("INIT GAMESPACE");
        initGameSpace();
    }, [pokeAnswer]);

    function initGameSpace()
    {
        for (var i = 0; i < gsInit.length; i++) {
            var row = {};
            row.id = "r" + i;
            row.state = "empty";
            row.length = pokeAnswer.length;
            row.boxes = Array(pokeAnswer.length);
            row.guess = "";
            row.winnings = 0;

            for(var k = 0; k < row.boxes.length; k++) {
                var box = {};
                box.id = row.id + "b" + k;
                box.delay = k * 100 + "ms"
                box.state = "empty";
                box.letter = "";
                row.boxes[k] = box;
            }
            gsInit[i] = row;
        };

        var lsInit = {
            inWord : new Set(),
            correctGuess : new Set(),
            notInWord : new Set()
        };
    
        focus = [0, 0];
        setGameSpace(gsInit);
        setLetterStates(lsInit);
    }

    // -------------------------------------------------------------------------
	function keyDownHandler(e)
    {
        const input = e.key || e.target.value;
        const validKeySet = new Set(validKeys);

	    var guess = "";
        for (var i = 0; i < pokeAnswer.length; i++)
            guess = guess + gameSpace[focus[0]].boxes[i].letter;

        if (!(props.isGameOver[0]) && !(JSON.parse(localStorage.backdrop))) { // ONLY ALLOW GUESSES IF GAME NOT WON/LOST
            if (input === "Enter" && focus[1] === pokeAnswer.length 
                && checkValidity(guess)) {
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
            else if (focus[1] < pokeAnswer.length &&  // default 
                     validKeySet.has(input)) { 
                gameSpace[focus[0]].boxes[focus[1]].letter = input;
                gameSpace[focus[0]].boxes[focus[1]].state = "filled"
                focus[1] += 1;
            }
        }

        if(localStorage.backdrop === "false"){
            setGameSpace([...gameSpace]);
            console.log(pokeAnswer);
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
                lsChange["correctGuess"].add(boxes[i].letter);
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
                lsChange["inWord"].add(boxes[i].letter);
                pointsWon += 5;
            }
            else {                               // gray
                boxes[i].state = "incorrect";
                lsChange["notInWord"].add(boxes[i].letter);
            }
        }

        if (isWinner(row)) {
            row.state = "winner";
            props.setGameOver([true, 'win']);
            setGameSpace(null);
            focus[0] = -1;
            localStorage.gameMode = 1;
            pointsWon += 200;
            if (JSON.parse(localStorage.shuckleInfo)[2])
                updateHatching();
        }
        else {
            if (focus[0] === 5 && focus[1] === pokeAnswer.length) {
                props.setGameOver([true, 'loss']);
                setGameSpace(null);
                focus[0] = -1;
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

    function updateHatching(){
        let tempInfo = JSON.parse(localStorage.shuckleInfo);
        var shuckleChildren = tempInfo[2]; 

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

        tempInfo[2] = shuckleChildren;
        localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));
    }

	return (
        <> { gameSpace &&  
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
