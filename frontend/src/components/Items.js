/*
 * Items.js
*/

import {useState, useEffect} from 'react';
import classes from "./style/Items.module.css";

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

const items = [<Poffin name = "spicyPoffin"
                       price = "250"
                       tag = "Spicy"
                       id = "1" />,
               <Poffin name = "sweetPoffin"
                       price = "400"
                       tag = "Sweet"
                       id = "2" />,
               <Poffin name = "goldPoffin"
                       price = "995"
                       tag = "Gold"
                       id = "3" />,
               <Poffin name = "lemonade"
                       price = "100"
                       tag = "Juice"
                       id = "4" />,
               <Poffin name = "ticket"
                       price = "495"
                       tag = "Ticket"
                       id = "5" />,
               <Poffin name = "soldOut"
                       price = "N/A"
                       tag = "soldOut"
                       id = "6" />,
                       ];

export default items;
