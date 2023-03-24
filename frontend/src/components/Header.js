/*
 * Header.js
*/

import DisplayMan from "./DisplayMan.js";
import classes from "./style/Header.module.css";

import { useState, useEffect } from 'react';

function Header(props)
{

    const [pokeDollars, setPokeDollars] = 
           useState(Number(window.localStorage.pokeDollars));
    window.localStorage.pokeDollars = pokeDollars; 

    function dollarHandler(delta)
    {
        setPokeDollars(pokeDollars + delta);
    }

    return (
        <header className = {classes.menuBar}>
            <div className = {classes.pHeader}>
                <img src = {require("../assets/pokedollarLight.png")}/>
                {" "}{pokeDollars}
            </div>

            <div className = {classes.gameTitle}>
                <img src = {require("../assets/LogoLight.png")}/>
            </div>

            <DisplayMan id = "displayMan"
                        isGameOver = {props.isGameOver}
                        dollarHandler = {dollarHandler}
                        pokeAnswer = {props.pokemon} />
        </header>
    )
}


export default Header;
