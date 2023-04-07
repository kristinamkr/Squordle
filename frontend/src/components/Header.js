/*
 * Header.js
*/

import DisplayMan from "./DisplayMan.js";
import classes from "./style/Header.module.css";

import { useState, useEffect } from 'react';

function Header(props)
{
    return (
    <div className = {classes.center}>
        <header className = {classes.menuBar}>
            <div className = {classes.pHeader}>
                <img src = {require("../assets/pokedollarLight.png")}/>
                {" "}{props.pokeDollars}
            </div>

            <div className = {classes.gameTitle}>
                <img src = {require("../assets/LogoLight.png")}/>
            </div>

            <DisplayMan id = "displayMan"
                        isGameOver = {props.isGameOver}
                        dollarHandler = {props.dollarHandler}
                        pokeAnswer = {props.pokemon} />
        </header>
        </div>
    )
}


export default Header;
