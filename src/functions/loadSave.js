/*
 *loadSave.js
*/

function loadSave()
{
	if (window.localStorage.length !== 14)
    {
        if (!(window.localStorage.pokeDollars)) {
            window.localStorage.pokeDollars = 0;
        }
       if (!(window.localStorage.adoptedShuckle)) {
            window.localStorage.adoptedShuckle = false;
        }
        if (!(window.localStorage.shopState)) {
            window.localStorage.shopState = 0;
        }  
        if (!(window.localStorage.spicyPoffin)) {
            window.localStorage.spicyPoffin = 0;
        }
        if (!(window.localStorage.sweetPoffin)) {
            window.localStorage.sweetPoffin = 0;
        }  
        if (!(window.localStorage.bitterPoffin)) {
            window.localStorage.bitterPoffin = 0;
        }  
        if (!(window.localStorage.goldPoffin)) {
            window.localStorage.goldPoffin = 0;
        }  
        if (!(window.localStorage.lemonade)) {
            window.localStorage.lemonade = 0;
        }  
        if (!(window.localStorage.shuckleShiny)) {
            window.localStorage.shuckleShiny = 0;
        }  
        if (!(window.localStorage.shuckleSpicy)) {
            window.localStorage.shuckleSpicy = 0;
        }  
        if (!(window.localStorage.shuckleSweet)) {
            window.localStorage.shuckleSweet = 0;
        }  
        if (!(window.localStorage.shuckleBitter)) {
            window.localStorage.shuckleBitter = 0;
        }  
        if (!(window.localStorage.shuckleChildren)) {
            window.localStorage.shuckleChildren = [];
        }
        if (!(window.localStorage.region)) {
            window.localStorage.region = "kanto";
        }
    };
};

export default loadSave;