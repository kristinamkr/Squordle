/*
 *gameInit.js
*/
import PokeList from "../components/PokeList.js";

function gameInit(pokeList)
{
	var validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

	// var guessList = pokeList; //TO BE REGIONIZED

	var selectionNumber = Math.floor(Math.random() * PokeList.length);
	if (selectionNumber === 0)  // avoid Edward case
	    selectionNumber = 1;

	var selection = PokeList[selectionNumber];
	var wordLength = selection.length;

	var gsInit = Array(6);
	for (var i = 0; i < gsInit.length; i++) {
	    var row = {};
	    row.id = "r" + i;
	    row.state = "empty";
	    row.length = wordLength;
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
	};

	var lsInit = {
	        inWord : new Set(),
	        correctGuess : new Set(),
	        notInWord : new Set()
	    };

	var inits = {
			lsInit : lsInit,
			gsInit : gsInit,
            pokeAnswer: selection,
			validKeys : validKeys,
		};

	return inits;
}

export default gameInit;
