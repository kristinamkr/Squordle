/*
 *boardInit.js
*/

function boardInit(pokeAnswer)
{
	var gsInit = Array(6);

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
        inWord : [],
        correctGuess : [],
        notInWord : []
    };

    var focusInit = [0, 0]

    return {"gameSpace": gsInit, "letterStates": lsInit, "focus": focusInit};
};

export default boardInit;
