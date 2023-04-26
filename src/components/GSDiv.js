/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";

import { useState, useEffect } from 'react';

import boardInit from "../functions/boardInit.js";

let lettersUsed = []; // here? 

function GSDiv(props) 
{
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
        initGameSpace();
    }, [pokeAnswer]);

    useEffect(() => {
        reloadGameSpace();
    }, [props.newPokemon])

    function reloadGameSpace()
    {
        let boardState;
        boardState = JSON.parse(localStorage.boardState);

        setFocus(boardState["focus"]);
        setGameSpace(boardState["gameSpace"]);
        setLetterStates(boardState["letterStates"]);
    }

    function initGameSpace()
    {
        console.log(pokeAnswer);
        let boardState;
        if (Number(localStorage.gameMode) % 2 === 0 && 
            JSON.parse(localStorage.potd)["daily"] === pokeAnswer)
            boardState = JSON.parse(localStorage.boardState);
        else {
            boardState = boardInit(pokeAnswer);
            if (Number(localStorage.gameMode) % 2 === 0) {
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
        for (var i = 0; i < pokeAnswer.length; i++)
            guess = guess + gameSpace[focus[0]].boxes[i].letter;

        if (!(props.isGameOver[0]) && 
            !(JSON.parse(localStorage.backdrop)) &&
            (!(JSON.parse(localStorage.potd)["isWon"]) || 
             Number(localStorage.gameMode) % 2 === 1)) 
        {
            if (input === "Enter" && focus[1] === pokeAnswer.length) 
            { 
                console.log("?");
                if ((Number(localStorage.gameMode) < 2 ) && checkValidity(guess)
                   || Number(localStorage.gameMode) >= 2) 
                {
                    gameSpace[focus[0]].guess = guess;
                    checkAnswer(gameSpace[focus[0]]);
                    console.log("PKANS - " + pokeAnswer.toLowerCase());
                    focus[0] += 1;
                    focus[1] = 0;
                }
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

        if (!(JSON.parse(localStorage.backdrop)) && 
            !(JSON.parse(localStorage.potd)["isWon"]))
            setGameSpace([...gameSpace]);
    }

    // HELPER FUNCTIONS -------------------------------------------------------
	function checkAnswer(row)
    {
	    var lsChange = letterStates;
        let pointsWon = 0; 

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
            } else {
                currentBox.state = "incorrect";
                lsChange["notInWord"].push(currentBox.letter);
            }

            if (!(lettersUsed.includes(currentBox.letter)))
                lettersUsed.push(currentBox.letter);
        }

        let boardState = {gameSpace: gameSpace, 
                          letterStates: letterStates, 
                          focus: [focus[0] + 1, 0]};
        if (Number(localStorage.gameMode) % 2 === 0)
            localStorage.boardState = JSON.stringify(boardState);

        if (isWinner(row)) {
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

            // TO BE MOVED
            if (JSON.parse(localStorage.shuckleInfo)[2])
                updateHatching();
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

    function isInAnswer(letter, ans)
    {
        for (let i = 0; i < ans.length; i++)
            if (letter === ans[i])
                return true;
        return false;
    }

    function isWinner(row)
    {
        for (var i = 0; i < row.length; i++) 
            if (!(row.boxes[i].state === "correct"))
                return false;
        return true;
    }

    function checkValidity(guess) {
        for (let i = 0; i < pokeList.length; i++)
            if (pokeList[i].name.toLowerCase() === guess)
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
