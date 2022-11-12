/*
 * Poffin.js
*/

import {useState, useEffect} from 'react';
import classes from "./style/Poffin.module.css";

function Poffin(props) 
{
    const { name, price, tag } = props;

    return (
        <img name = {name}
             className = {classes.poffin}
             src = {require("../assets/" + name + ".png")}
             decoding = "async"
        />
    );
}

export default Poffin;
