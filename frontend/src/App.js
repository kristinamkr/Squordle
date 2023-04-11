/*
 * app.js
*/

import Squordle from "./components/Squordle.js";

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App()
{ 
    console.log("APP!");

    // USER AUTH ---------------------------------------------------------------
    const [user, setUser] = useState(null);

    function userHandler(data) {
        setUser(data);
    }

    useEffect(() => {
        if (user) {
            localStorage.region = user.userData.region;
            localStorage.pokeDollars = user.userData.pokeDollars;
            localStorage.adoptedShuckle = user.userData.shuckleInfo.adopted;
            localStorage.shuckleShiny = user.userData.shuckleInfo.shiny;
            localStorage.shuckleChildren = user.userData.shuckleInfo.children;
            localStorage.spicyPoffin = user.userData.inventory.spicyPoffin;
            localStorage.sweetPoffin = user.userData.inventory.sweetPoffin;
            localStorage.goldPoffin = user.userData.inventory.goldPoffin;
            localStorage.lemonade = user.userData.inventory.lemonade;
            localStorage.ticket0 = user.userData.inventory.ticket;
        } 
    }, [user]);

    // -------------------------------------------------------------------------

    // FETCH POKELIST... SHOULD ONLY EXECUTE ONCE ------------------------------
    const [pokeList, setPokeList] = useState(null);

    async function pokePromise() { 
        return await fetch(`http://localhost:3000/pokeList`)
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
                <Route path='/' 
                       element={<Squordle id='squordle' 
                                          pokeList = {pokeList} 
                                          user = {user}
                                          userHandler = {userHandler} />} />
                </Routes>
            }
        </div>
    );
}

export default App;
