/*
 * app.js
*/

import Squordle from "./Squordle.js";

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App()
{ 
    // USER AUTH ---------------------------------------------------------------
    let uData = { name: localStorage.user,
                  region: localStorage.region,
                  pokeDollars: Number(localStorage.pokeDollars),
                  shuckleInfo: JSON.parse(localStorage.shuckleInfo),
                  inventory: JSON.parse(localStorage.inventory) };
    const [user, setUser] = useState(uData);

    function userHandler(data) { setUser(data); }

    useEffect(() => {
        if (!(user.name === "guest")) {
            localStorage.user = user.name;
            localStorage.firstTime = false;
            localStorage.region = user.region;
            localStorage.pokeDollars = user.pokeDollars;
            localStorage.shuckleInfo = JSON.stringify(user.shuckleInfo);
            localStorage.inventory = JSON.stringify(user.inventory);
            if (user.shuckleInfo['adopted'] === true)
                localStorage.shopState = 8;
        } 
    }, [user]);

    // FETCH POKELIST... SHOULD ONLY EXECUTE ONCE ------------------------------
    const [pokeList, setPokeList] = useState(null);

    async function pokePromise() { 
        return await fetch(`/.netlify/functions/pokeList`)
                .then(result => result.json())
                .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (!pokeList) {
            pokePromise()
                .then(function(result) {
                  setPokeList(result.map(p => p.name.toLowerCase()));
                }).catch(err => console.error(err));
        }
    }, [pokeList]);
    // -------------------------------------------------------------------------

    return (
        <div>
            { pokeList && 
                <Routes>
                <Route path = '/' 
                       element = {<Squordle id='squordle' 
                                            user = {user}
                                            userHandler = {userHandler} 
                                            pokeList = {pokeList} />} />
                </Routes>
            }
        </div>
    );
}

export default App;