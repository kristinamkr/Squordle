/*
 * App.js
*/

import './App.css';
import { useState, useRef } from 'react';
import GSDiv from "./components/GSDiv.js";

function App() 
{
    // disables tabbing
    document.addEventListener("focus", (e) => {  
        document.activeElement.blur()  
    }, true);

    return (
        <> <GSDiv id = "gsVar"/> </>
    );
}

export default App;
