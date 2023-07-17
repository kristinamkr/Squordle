/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import spriteLink from  "../functions/SpriteLink.js";

import { createContext, useContext, useState, useEffect } from 'react';
import { GameContext } from '../Squordle.js';

export const KeyContext = createContext();

const MAX_GUESSES = 6;

let lettersUsed = []; // NOT PERSISTING BTW PAGE RELOADS

function GSDiv(props) 
{
    console.log('RENDERING GAMESPACE...');
    const { 
        gameMode,
        isGameOver, 
        setGameOver, 
        pokemon, 
        dollarHandler 
    } = useContext(GameContext); 

    const pokeList = props.pokeList;
    const pokeAnswer = pokemon.toLowerCase(); 

    const validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');
    const validKeySet = new Set(validKeys); 

	const [gameSpace, setGameSpace] = useState(null);
	const [letterStates, setLetterStates] = useState(null);
    const [focus, setFocus] = useState([0, 0]) // (row #, box #)
    const [points, setPoints] = useState(0);

	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    });

    useEffect(() => { 
        dollarHandler(points);
    }, [points]);

    useEffect(() => { 
        let potd = JSON.parse(localStorage.potd);

        console.log('gameMode - ' + gameMode);
        if (gameMode % 2 === 0 && (potd['isSaved'] || potd['isWon'])) {
            console.log('loading board...');
            loadBoard();
        }
        else {
            console.log('initializing board...');
            boardInit(); 
        }
    }, [pokeAnswer]);

    useEffect(() => {
        // SAVE POINT
        let potd = JSON.parse(localStorage.potd);
        if (gameMode % 2 === 0 && potd['isSaved'] && !potd['isWon']) {
            console.log('SAVING...');
            let saveState = JSON.parse(localStorage.boardState);
            saveState['focus'] = focus;
            saveState['gameSpace'] = gameSpace;
            saveState['letterStates'] = letterStates;
            localStorage.boardState = JSON.stringify(saveState);
        }
    }, [focus[0]]);

    useEffect(() => { 
        if (gameSpace) { 
            let isOver;
            let isWinningGuess = gameSpace?.some(r => r.state === 'winner');

            if (gameMode % 2 === 0 && JSON.parse(localStorage.potd)['isWon'])
                return;
                 
            if (isWinningGuess) {
                setGameOver([true, 'win']);
                isOver = true;
            }
            else if (!isWinningGuess && focus[0] === MAX_GUESSES) { 
                setGameOver([true, 'loss']);
                isOver = true;
            }

            if (isOver && gameMode % 2 === 0) {
                let potd = JSON.parse(localStorage.potd);
                potd['isWon'] = true;
                localStorage.potd = JSON.stringify(potd);
            }
        }
    }, [gameSpace]);

    // BOARD SET-UP ------------------------------------------------------------
    function boardInit(pkmn)
    {
        const gsInit = Array.from({ length: MAX_GUESSES }, (_, i) => {
            const row = {
                id: 'r' + i,
                state: 'empty',
                length: pokeAnswer.length,
                boxes: Array.from({ length: pokeAnswer.length }, (_, k) => ({
                    id: `r${i}b${k}`, 
                    delay: `{k * 100}ms`,
                    state: 'empty',
                    letter: '',
                })),
                guess: '',
                sprite: 'NaN',
                winnings: 0,
            };

            return row;
        });

        const lsInit = {
            inWord: [],
            correctGuess: [],
            notInWord: [],
        };

        const focusInit = [0, 0];

        setFocus(focusInit);
        setGameSpace(gsInit);
        setLetterStates(lsInit);
    };

    function loadBoard()
    {
        console.log('LOADING...');
        let saveState = JSON.parse(localStorage.boardState);
        setFocus(saveState['focus']);
        setGameSpace(saveState['gameSpace']);
        setLetterStates(saveState['letterStates']);
    }

    // KEY DOWN HANDLER -------------------------------------------------------
    function keyDownHandler(e)
    {
        console.log(pokeAnswer + 'isOver? - ' + isGameOver[0]);
        const input = e.key || e.target.value;

        const isBackdropActive = JSON.parse(localStorage.backdrop);
        const isPOTDWon = JSON.parse(localStorage.potd)['isWon'];
        const isFreeplayMode = gameMode % 2 === 1;

        if (!isGameOver[0] && !isBackdropActive &&
            (!isPOTDWon || isFreeplayMode)) 
        {
            if (input === 'Enter' && focus[1] === pokeAnswer.length)
                handleEnterKey();
            else if (input === 'Backspace' && focus[1] > 0)
                handleBackspaceKey();
            else if (focus[1] < pokeAnswer.length && validKeySet.has(input))
                handleCharacterKey(input);
        }

        if (validKeySet.has(input) && focus[1] < pokeAnswer.length &&
            !isBackdropActive && !isPOTDWon && !(isGameOver[0]))
            setGameSpace([...gameSpace]);
    }

    // HELPER FUNCTIONS -------------------------------------------------------
    function handleEnterKey()
    {
        setGameSpace(prevGameSpace => {
            // tracks if any guesses have been made in daily (save/load)
            let potd = JSON.parse(localStorage.potd);
            if (gameMode % 2 === 0 && !potd['isSaved']) {
                potd['isSaved'] = true;
                localStorage.potd = JSON.stringify(potd);
            }

            let guess = '';
            for (let i = 0; i < pokeAnswer.length; i++)
                guess = guess + prevGameSpace[focus[0]].boxes[i].letter;

            let isValid = 
                pokeList.some(pokemon => pokemon.name.toLowerCase() === guess);

            if (gameMode >= 2 || isValid) {
                const newGameSpace = [...prevGameSpace];
                newGameSpace[focus[0]].guess = guess;
                newGameSpace[focus[0]].sprite = isValid ? 
                    spriteLink(guess) : spriteLink(guess[0]);
                const pointsWon = checkAnswer(newGameSpace[focus[0]]);
                setPoints(pointsWon);

                setFocus(prevFocus => [prevFocus[0] + 1, 0]);

                return newGameSpace;
            }
            return prevGameSpace; // if not valid, return the current state
        });
    }

    function handleBackspaceKey()
    {
        setFocus(prevFocus => [prevFocus[0], prevFocus[1] - 1]);
        setGameSpace(prevGameSpace => {
            const newGameSpace = [...prevGameSpace];
            newGameSpace[focus[0]].boxes[focus[1] - 1].state = 'empty';
            newGameSpace[focus[0]].boxes[focus[1] - 1].letter = '';
            return newGameSpace;
        });
    }

    function handleCharacterKey(input)
    {
        setGameSpace(prevGameSpace => {
            const newGameSpace = [...prevGameSpace];
            newGameSpace[focus[0]].boxes[focus[1]].letter = input;
            newGameSpace[focus[0]].boxes[focus[1]].state = 'filled';
            setFocus(prevFocus => [prevFocus[0], prevFocus[1] + 1]);
            return newGameSpace;
        });
    }

    let ans = pokeAnswer;
	function checkAnswer(row)
    {
	    let lsChange = letterStates;
        let pointsWon = 0; 
        let isWinningRow = true;  // tracks if row is winning

        const updateStateAndPoints = (state, points, letter) => {
            if (!(lettersUsed.includes(letter))) {
                lettersUsed.push(letter);
                pointsWon += points;
            }
            return state;
        };

        for (let i = 0; i < pokeAnswer.length; i++) {
            let currentBox = row.boxes[i];

            // check for duplicates in guess that are NOT in ans
            if (currentBox.letter === pokeAnswer[i] &&      // green 
                ans.includes(currentBox.letter)) 
            { 
                currentBox.state = 
                    updateStateAndPoints('correct', 20, currentBox.letter); 
                lsChange["correctGuess"].push(currentBox.letter);
            }
            else if (ans.includes(currentBox.letter)) {     // yellow
                currentBox.state = 
                    updateStateAndPoints('inWord', 5, currentBox.letter);
                lsChange["inWord"].push(currentBox.letter);
                isWinningRow = false; 
            } else {
                currentBox.state = 
                    updateStateAndPoints('incorrect', 0, currentBox.letter); 
                lsChange["notInWord"].push(currentBox.letter);
                isWinningRow = false;
            }
            ans = ans.replace(currentBox.letter, '');
        }

        if (isWinningRow) {
            row.state = 'winner';
            pointsWon += 200;
        }
        else
            row.state = 'filled';

        row.winnings += pointsWon;
        setLetterStates(lsChange);
        return row.winnings;
	}

	return (
        <> { gameSpace && letterStates && 
            <div className = {classes.gsDiv}>
                <GameSpace id = "gameSpace"
                    gameSpace = {gameSpace}
                />
            <KeyContext.Provider value={{
                keyDownHandler,
                letterStates,    
            }}> 
                <Keyboard  id = "keyboard" 
                    validKeys = {validKeys}
                /> 
            </KeyContext.Provider>
            </div>
        } </>
	)
}

export default GSDiv;
