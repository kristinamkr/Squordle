/*
 *loadSave.js
*/

function loadSave()
{
    if (localStorage.length !== 12)
    {
        if (!(localStorage.firstTime))
            localStorage.firstTime = true;
        if (!(localStorage.backdrop))
            localStorage.backdrop = false;
        if (!(localStorage.shopState))
            localStorage.shopState = 0;

        // GAMEMODE INFO ---
        // 0: daily, 1: freeplay, 2: daily + ez, 3: freeplay + ez
        if (!(localStorage.gameMode))
            localStorage.gameMode = 0;
        if (!(localStorage.potd)) {
            let info = { daily: "",
                         isWon: false };
            localStorage.potd = JSON.stringify(info);
        }
        if (!(localStorage.boardState)) {
            let info = { gameSpace: null,
                         letterStates: null,
                         focus: [0, 0] };
            localStorage.boardState = JSON.stringify(info); 
        }
        // USER INFO ---
        if (!(localStorage.user))
            localStorage.user = "guest";
        if (!(localStorage.region))
            localStorage.region = "kanto";
        if (!(localStorage.pokeDollars))
            localStorage.pokeDollars = 0;
        if (!(localStorage.shuckleInfo)) {
            let info = { adopted:    false,
                         shiny:      false,
                         children:   [] };
            localStorage.shuckleInfo = JSON.stringify(info);
        }
        if (!(localStorage.inventory)) {
            let items = { spicyPoffin: 0,
                          sweetPoffin: 0,
                          goldPoffin:  0,
                          lemonade:    0,
                          ticket:      false };
            localStorage.inventory = JSON.stringify(items);
        } 
        if (!(localStorage.saveKey))
            localStorage.saveKey = "";
    };
};

export default loadSave;
