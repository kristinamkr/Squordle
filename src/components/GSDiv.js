/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import spriteLink from  "../functions/SpriteLink.js";

import { useState, useEffect } from 'react';

import boardInit from "../functions/boardInit.js";

let lettersUsed = []; // NOT PERSISTING BTW PAGE RELOADS 

function GSDiv(props) 
{
    console.log("RENDERING GSDIV...");
    const pokeList = props.pokeList;
    const pokeAnswer = props.pokemon.toLowerCase(); 
    let ans = pokeAnswer.toLowerCase();

    const validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

	const [gameSpace, setGameSpace] = useState(null);
	const [letterStates, setLetterStates] = useState(null);
    const [focus, setFocus] = useState([0, 0]) // (row #, box #)

	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    });

    useEffect(() => { 
        renderGameSpace();
    }, [pokeAnswer, props.isGameOver[0]]);

    function renderGameSpace()
    {
        let boardState;
        if (Number(localStorage.gameMode) % 2 === 0) {  // DAILY
            if (JSON.parse(localStorage.boardState)['gameSpace'] === null) { 
                // UPDATE POTD - SET DAILY
                let temp = JSON.parse(localStorage.potd);
                temp["daily"] = pokeAnswer;
                localStorage.potd = JSON.stringify(temp);

                boardState = boardInit(pokeAnswer);
                localStorage.boardState = JSON.stringify(boardState);
            }
            else
                boardState = JSON.parse(localStorage.boardState);
        }
        else // FREEPLAY
            boardState = boardInit(pokeAnswer);

        setFocus(boardState["focus"]);
        setGameSpace(boardState["gameSpace"]);
        setLetterStates(boardState["letterStates"]);
    }

    // KEY DOWN HANDLER -------------------------------------------------------
    function keyDownHandler(e)
    {
        const input = e.key || e.target.value;
        const validKeySet = new Set(validKeys);
        console.log("KEY PRESSED (" + input + ") !");
        console.log(pokeAnswer);

        if (!(props.isGameOver[0]) &&
            !(JSON.parse(localStorage.backdrop)) &&
            !(JSON.parse(localStorage.potd)["isWon"]) ||
            Number(localStorage.gameMode) % 2 === 1)
        {
            if (input === "Enter" && focus[1] === pokeAnswer.length)
                handleEnterKey();
            else if (input === "Backspace" && focus[1] !== 0)
                handleBackspaceKey();
            else if (focus[1] < pokeAnswer.length && validKeySet.has(input))
                handleCharacterKey(input);
        }

        if (!(JSON.parse(localStorage.backdrop)) &&
            !(JSON.parse(localStorage.potd)["isWon"])) {
                setGameSpace([...gameSpace]);
        }
    }

    // HELPER FUNCTIONS -------------------------------------------------------
    function handleEnterKey()
    {
        let guess = "";
        for (let i = 0; i < pokeAnswer.length; i++) {
            guess = guess + gameSpace[focus[0]].boxes[i].letter;
        }

        let isValid = checkValidity(guess);
        if ((Number(localStorage.gameMode) < 2) && isValid ||
            Number(localStorage.gameMode) >= 2) {
            gameSpace[focus[0]].guess = guess;
            checkAnswer(gameSpace[focus[0]]);
            focus[0] += 1;
            focus[1] = 0;
        }
    }

    function handleBackspaceKey()
    {
        focus[1] -= 1;
        gameSpace[focus[0]].boxes[focus[1]].state = "empty";
        gameSpace[focus[0]].boxes[focus[1]].letter = '';
    }

    function handleCharacterKey(input)
    {
        gameSpace[focus[0]].boxes[focus[1]].letter = input;
        gameSpace[focus[0]].boxes[focus[1]].state = "filled";
        focus[1] += 1;
    }

	function checkAnswer(row)
    {
	    let lsChange = letterStates;
        let pointsWon = 0; 
        let isWinningRow = true;  // tracks if row is winning

        for (let i = 0; i < pokeAnswer.length; i++) {
            let currentBox = row.boxes[i];

            // check for duplicates in guess that are NOT in ans
            if (currentBox.letter === pokeAnswer[i] &&  // green 
                ans.indexOf(currentBox.letter) !== -1) 
            { 
                currentBox.state = "correct";
                lsChange["correctGuess"].push(currentBox.letter);

                if (!(lettersUsed.includes(currentBox.letter)))
                    pointsWon += 20;

                ans = ans.replace(currentBox.letter, ''); 
            }
            else if (isInAnswer(currentBox.letter, ans)) { // yellow
                currentBox.state = "inWord";
                lsChange["inWord"].push(currentBox.letter);

                if (!(lettersUsed.includes(currentBox.letter)))
                    pointsWon += 5;

                ans = ans.replace(currentBox.letter, ''); 
                isWinningRow = false; 
            } else {
                currentBox.state = "incorrect";
                lsChange["notInWord"].push(currentBox.letter);
                isWinningRow = false;
            }

            if (!(lettersUsed.includes(currentBox.letter)))
                lettersUsed.push(currentBox.letter);
        }

        let boardState = {gameSpace: gameSpace, 
                          letterStates: letterStates, 
                          focus: [focus[0] + 1, 0]};
        if (Number(localStorage.gameMode) % 2 === 0)
            localStorage.boardState = JSON.stringify(boardState);

        if (isWinningRow)
            handleWin(row, pointsWon);
        else {
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

    function handleWin(row, pointsWon)
    {   
        row.state = "winner";

        if (Number(localStorage.gameMode) % 2 === 0) {
            let temp = JSON.parse(localStorage.potd);
            temp["isWon"] = true;
            localStorage.potd = JSON.stringify(temp);
        }

        props.setGameOver([true, 'win']);
        setGameSpace(null);
        setFocus([-1, focus[1]]);
        pointsWon += 200;
    }

    function isInAnswer(letter, ans)
    {
        for (let i = 0; i < ans.length; i++)
            if (letter === ans[i])
                return true;
        return false;
    }

    function checkValidity(guess) {
        for (let i = 0; i < pokeList.length; i++)
            if (pokeList[i].name.toLowerCase() === guess)
                return true;
        return false;
    } 

	return (
        <> { gameSpace && letterStates && 
            <div className = {classes.gsDiv}>
                <GameSpace id = "gameSpace"
                           gameSpace = {gameSpace}
                           wordLength = {pokeAnswer.length}
                           checkValidity = {checkValidity} />
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
