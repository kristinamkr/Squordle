/*
 * gameInit.js
*/

// move these guys into separate file
async function getPokemon() {
    const response = await fetch(`http://localhost:3000/random`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    let pokemon = await response.json();
    console.log("pokemon - ? - " + pokemon[0].Name);
    return pokemon[0].Name;
}

function gameInit(pokeList)
{
	var validKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

    // let ans = getPokemon();
    // console.log(ans);

	getPokemon().then((value) => {
        let ansLength = value.length;

        var gsInit = Array(6);
        for (var i = 0; i < gsInit.length; i++) {
            var row = {};
            row.id = "r" + i;
            row.state = "empty";
            row.length = ansLength;
            row.boxes = Array(ansLength);
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
                pokeAnswer: value,
                validKeys : validKeys,
            };

        console.log(inits);

        return inits;
     });
    return 0;
};


export default gameInit;
