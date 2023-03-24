/*
 * Inventory.js
*/

import {useState, useEffect} from 'react';
import classes from "./style/Poffin.module.css";

function Poffin(props) 
{
    const {name, price, tag} = props;

    return (
        <img name = {name}
             className = {classes.poffin}
             src = {require("../assets/" + name + ".png")}
             decoding = "async" />
    );
}

const inventory = [<Poffin name = "spicyPoffin"
                           price = "250"
                           tag = "Spicy"
                           id = "1" />,
                   <Poffin name = "sweetPoffin"
                           price = "400"
                           tag = "Sweet"
                           id = "2" />,
                   <Poffin name = "bitterPoffin"
                           price = "200"
                           tag = "Bitter"
                           id = "4" />,
                   <Poffin name = "goldPoffin"
                           price = "995"
                           tag = "Gold"
                           id = "6" />,
                   <Poffin name = "lemonade"
                           price = "100"
                           tag = "Juice"
                           id = "3" />];

export default inventory;
