/*
 * Poffin.js
*/

import {useState, useEffect} from 'react';
import classes from "./style/Poffin.module.css";

function Poffin(prop) 
{
    function getName() { return prop.item; }

    return (
        <img name = {prop.item}
             className = {classes.poffin}
             src = {require("../assets/" + prop.item + ".png")}
             decoding = "async"
             onClick = {() => getName()}
        />
    );
}

export default Poffin;
