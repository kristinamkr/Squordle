/*
 * app.js
*/

import Squordle from "./Squordle.js";

import { useState, useEffect } from 'react';

function App()
{ 
    // USER AUTH ---------------------------------------------------------------
    let uData = {
        name: localStorage.user,
        pokeDollars: Number(localStorage.pokeDollars),
        shuckle: JSON.parse(localStorage.shuckleInfo),
        inventory: JSON.parse(localStorage.inventory)
    };  
    const [user, setUser] = useState(uData);

    function userHandler(data) {
        setUser(data);
    }

    useEffect(() => {
        if (!(user.name === "guest")) {
            localStorage.user = user.name;
            localStorage.firstTime = false;
            localStorage.pokeDollars = user.pokeDollars;
            localStorage.shuckleInfo = JSON.stringify(user.shuckle);
            localStorage.inventory = JSON.stringify(user.inventory);
            if (user.shuckleInfo['adopted'] === true)
                localStorage.shopState = 8;
        } 
    }, [user]);

    // FETCH POKELIST... SHOULD ONLY EXECUTE ONCE ------------------------------
    const [pokeList, setPokeList] = useState(null);

    useEffect(() => {
        if (!pokeList) {
            if (localStorage.pokeList === 'null') { 
                pokePromise().then((res) => {
                    console.log("ACQUIRING POKELIST...");
                    localStorage.pokeList = JSON.stringify(res);
                    setPokeList(res);
                }).catch(err => console.error(err));
            }
            else
                setPokeList(JSON.parse(localStorage.pokeList));
        }
    }, [pokeList]);

    async function pokePromise() { 
        return await fetch(`/.netlify/functions/pokeList`)
                .then(result => result.json())
                .catch((err) => console.error(err));
    }

    // -------------------------------------------------------------------------

    return (
        <div>
            { pokeList && 
                <Squordle id='squordle' 
                    user={user} 
                    userHandler={userHandler}
                    pokeList={pokeList} /> 
            }
        </div>
    );
}

export default App;
