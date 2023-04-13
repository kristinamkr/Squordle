/*
 * app.js
*/

import Squordle from "./components/Squordle.js";

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App()
{ 
    console.log("APP! user - " + localStorage.user);

    // USER AUTH ---------------------------------------------------------------
    let uData = { name: localStorage.user,
                  region: localStorage.region,
                  pokeDollars: Number(localStorage.pokeDollars),
                  shuckleInfo: JSON.parse(localStorage.shuckleInfo),
                  inventory: JSON.parse(localStorage.inventory) };
    const [user, setUser] = useState(uData);

    console.log("APP: " + JSON.stringify(uData));

    function userHandler(data) { setUser(data); }

    console.log("USERDATA")

    useEffect(() => {
        if (!(user.name === "guest")) {
            localStorage.user = user.name;
            localStorage.firstTime = false;
            localStorage.region = user.region;
            localStorage.pokeDollars = user.pokeDollars;
            localStorage.shuckleInfo = JSON.stringify(user.shuckleInfo);
            localStorage.inventory = JSON.stringify(user.inventory);
            console.log("USERDATA3", localStorage)
        } 
    }, [user]);

    console.log("USERDATA2")

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
