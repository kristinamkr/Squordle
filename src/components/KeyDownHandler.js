/*
 * KeyDownHandler.js
*/ 

import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
// import DisplayMan from "./DisplayMan.js";
import ShuckleMechanics from './ShuckleMechanics.js';

import PokeList from "./PokeList.js";
import gameInit from "../functions/gameInit.js";
import loadSave from "../functions/loadSave.js";

import { useState, useEffect } from 'react';

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

export default keyDownHandler;
