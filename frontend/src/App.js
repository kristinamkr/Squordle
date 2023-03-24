/*
 * App.js
*/

import './App.css';
import Squordle from "./components/Squordle.js";

import { useState, useRef } from 'react';
import { Switch, Routes, Route, Link } from 'react-router-dom';

function App() 
{
    // disables tabbing
    document.addEventListener("focus", (e) => {  
        document.activeElement.blur()  
    }, true);

    return (
        <div>
            <Routes>
            <Route path='/' 
                   element={<Squordle id='squordle' />} />
            </Routes>
            //
        </div>
    );
}

export default App;
