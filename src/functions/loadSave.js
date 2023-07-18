/*
 *loadSave.js
*/

function loadSave()
{
    if (localStorage.length !== 13)
    {
        if (!(localStorage.firstTime))
            localStorage.firstTime = true;
        if (!(localStorage.backdrop))
            localStorage.backdrop = false;
        if (!(localStorage.shopState))
            localStorage.shopState = 0;
        
        if (!(localStorage.pokeList))
            localStorage.pokeList = null;

        // GAMEMODE INFO ---
        // 0: daily, 1: freeplay, 2: daily + ez, 3: freeplay + ez
        if (!(localStorage.gameMode))
            localStorage.gameMode = 2;
        if (!(localStorage.genFilter)) {
            let filter = { 
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false 
            };
            localStorage.genFilter = JSON.stringify(filter);
        }
        if (!(localStorage.potd)) {
            let info = { daily: '', isSaved: false, isWon: false };
            localStorage.potd = JSON.stringify(info);
        }
        if (!(localStorage.boardState)) {
            let info = { 
                gameSpace: null,
                letterStates: null,
                focus: [0, 0] 
            };
            localStorage.boardState = JSON.stringify(info); 
        }
        // USER INFO ---
        if (!(localStorage.user))
            localStorage.user = "guest";
        if (!(localStorage.pokeDollars))
            localStorage.pokeDollars = 0;
        if (!(localStorage.shuckleInfo)) {
            let info = { 
                adopted:    false,
                shiny:      false,
                children:   [] 
            };
            localStorage.shuckleInfo = JSON.stringify(info);
        }
        if (!(localStorage.inventory)) {
            let items = { 
                spicyPoffin: 0,
                sweetPoffin: 0,
                goldPoffin:  0,
                lemonade:    0,
                ticket:      false 
            };
            localStorage.inventory = JSON.stringify(items);
        } 
        if (!(localStorage.saveKey))
            localStorage.saveKey = "";
    };
};

export default loadSave;
