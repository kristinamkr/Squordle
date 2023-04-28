/*
 * app.js
*/

import Squordle from "./Squordle.js";

import { useState, useEffect } from 'react';

function App()
{ 
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
                          pokeList = {pokeList} /> }
        </div>
    );
}

export default App;
