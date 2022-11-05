/*
 * App.js
*/

import './App.css';
import { useState, useRef } from 'react';

import GSDiv from "./components/GSDiv.js";
import pokeList from "./components/PokeList.js";

function App() 
{
    document.addEventListener("focus", (e) => {  
        document.activeElement.blur()  
    }, true);

    var validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');  // why

    Object.freeze(pokeList); 
    var selectionNumber = Math.floor(Math.random() * pokeList.length);

    if (selectionNumber === 0)  // avoid Edward case
        selectionNumber = 1;
    var selection = pokeList[selectionNumber];
    var wordLength = selection.length;

    var gsInit = Array(6);
    for (var i = 0; i < gsInit.length; i++) {
        var row = {};
        row.id = "r" + i;
        row.state = "empty";
        row.length = wordLength;
        row.pokemon = selection;
        row.boxes = Array(wordLength);
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
    }

    var lsInit = {
        inWord : new Set(),
        correctGuess : new Set(),
        notInWord : new Set()
    };

    return (
        <div id = "header">
            <GSDiv id = "gsVar"
                   letterStates = {lsInit}
                   rows = {gsInit}
                   wordLength = {wordLength}
                   validKeys = {validKeys}
                   pokeList = {pokeList}/>
        </div>
    );
}

export default App;
