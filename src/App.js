/*
 * App.js
*/

import './App.css';
import { useState, useRef } from 'react';
import GSDiv from "./components/GSDiv.js";
import pokeList from "./components/PokeList.js";

function App() 
{
    // disables tabbing
    document.addEventListener("focus", (e) => {  
        document.activeElement.blur()  
    }, true);

    return (
        <div id = "header">
            <GSDiv id = "gsVar"/>
        </div>
    );
}

export default App;
