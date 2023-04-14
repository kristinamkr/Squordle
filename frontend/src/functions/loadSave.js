/*
 *loadSave.js
*/

function loadSave()
{
    if (localStorage.length !== 12)
    {
        if (!(localStorage.user))
            localStorage.user = "guest";
        if (!(localStorage.saveKey))
            localStorage.saveKey = "";
        if (!(localStorage.firstTime))
            localStorage.firstTime = true;

        if (!(localStorage.gameMode))
            localStorage.gameMode = 0;
        if (!(localStorage.POTD))
            localStorage.POTD = "";
        if (!(localStorage.wonPOTD))
            localStorage.wonPOTD = false;
        if (!(localStorage.POTDBoardState))
            localStorage.POTDBoardState = {"gameSpace": "", "letterStates": "", "focus": ""}

        if (!(localStorage.backdrop))
            localStorage.backdrop = false;
        if (!(localStorage.shopState))
            localStorage.shopState = 0;

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
    };
};

export default loadSave;
