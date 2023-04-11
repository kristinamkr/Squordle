/*
 *loadSave.js
*/

function loadSave()
{
    if (window.localStorage.length !== 12)
    {
        if (!(window.localStorage.gameMode)) {
            window.localStorage.gameMode = 0;
        }
        /*
        if (!(window.localStorage.shopState)) {
            window.localStorage.shopState = 0;
        }  
        */
        // USER DATA -----------------------------------------------------------
        if (!(window.localStorage.region)) {
            window.localStorage.region = "kanto";
        }
        if (!(window.localStorage.pokeDollars)) {
            window.localStorage.pokeDollars = 0;
        }
        if (!(window.localStorage.adoptedShuckle)) {
            window.localStorage.adoptedShuckle = false;
        }
        if (!(window.localStorage.shuckleShiny)) {
            window.localStorage.shuckleShiny = 0;
        }  
        if (!(window.localStorage.shuckleChildren)) {
            window.localStorage.shuckleChildren = '[]';
        }
        if (!(window.localStorage.spicyPoffin)) {
            window.localStorage.spicyPoffin = 0;
        }
        if (!(window.localStorage.sweetPoffin)) {
            window.localStorage.sweetPoffin = 0;
        }  
        if (!(window.localStorage.goldPoffin)) {
            window.localStorage.goldPoffin = 0;
        }  
        if (!(window.localStorage.lemonade)) {
            window.localStorage.lemonade = 0;
        }  
        if (!(window.localStorage.ticket0)) {
            window.localStorage.ticket0 = 0;
        }
    };
};

export default loadSave;
