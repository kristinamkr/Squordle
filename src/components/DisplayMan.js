/*
 * DisplayMan.js
*/

import classes from "./style/DisplayMan.module.css";

import WinLoseDisplay from "./WinLoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";   
import ShopDisplay from "./ShopDisplay.js";

import { ReactComponent as ShopIcon } from "../assets/shopIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/infoIcon.svg";
import { useState, useEffect } from 'react';

function Backdrop() 
{
    return <div className = {classes.backdrop}/>
}

function DisplayMan(props)
{
	const [displayState, setDisplayState] = 
           useState({"showShop": false,
                     "showInfo": false,
                     "showWinLose": false,
                     "showBackdrop": false
                    });

	function infoHandler()
    {
        setDisplayState({...displayState, 
                         "showInfo": !displayState["showInfo"],
                         "showBackdrop": !displayState["showBackdrop"]
                        });
  	}

  	function shopHandler()
    {
  		setDisplayState({...displayState,
                         "showShop": !displayState["showShop"],
                         "showBackdrop": !displayState["showBackdrop"]
                        });
  	}

  	function winLoseHandler()
    {
        setDisplayState({...displayState,
                         "showWinLose": true,
                         "showBackdrop": true
                        });
  	}   

	function reload()
    {
		setDisplayState({"showInfo": false,
                         "showWinLose": false,
                         "showBackdrop": false
                        });
		window.location.reload();
    }

    return (
        <>
        	<div className = {classes.icon}>
                <button onClick = {shopHandler}>
                    <ShopIcon className = {classes.shopIcon}/>
                </button>
            </div>

            <div className = {classes.icon}>
                <button onClick = {infoHandler}>
                    <InfoIcon className = {classes.infoIcon}/>
                </button>
            </div>

            {displayState["showBackdrop"] && <Backdrop/>}

            {displayState["showInfo"] && 
                <InfoDisplay infoHandler = {infoHandler}/>}
            {displayState["showShop"] && 
                <ShopDisplay dollarHandler = {props.dollarHandler} 
                             shopHandler = {shopHandler}/>}
            {props.isGameOver[0] && 
                <WinLoseDisplay isGameOver = {props.isGameOver}
                                reload = {reload}
                                pokeAnswer = {props.pokeAnswer}/>}
        </>
    )
}

export default DisplayMan;
