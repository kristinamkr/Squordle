/*
 * App.js
*/

import './App.css';
import GSDiv from "./components/GSDiv.js";

import { useState, useRef } from 'react';
// use Route to define different routes of application
import { Switch, Routes, Route, Link } from 'react-router-dom';

import PokeList from './components/PokeAPI.js';

function App() 
{
    // disables tabbing
    document.addEventListener("focus", (e) => {  
        document.activeElement.blur()  
    }, true);

    return (
        <div>
            <Routes>
            /*
            <Route path='/' 
                   element={<GSDiv id='gsVar' />} />
            */
            </Routes>
        </div>
    );
}

export default App;
