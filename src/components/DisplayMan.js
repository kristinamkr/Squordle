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

function Backdrop(props)
{
  return <div className = {classes.Backdrop}/>
}

function DisplayMan(props)
{
	const [displayState, setDisplayState] = 
           useState({"showShop": false,
                     "showInfo": false,
                     "showWinLose": false,
                     "showBackdrop": false});

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

    return (
        <>
        	<div className = {classes.icon}>
                <button className = {classes.icon} 
                        onClick = {shopHandler}>
                    <ShopIcon className = {classes.shopIcon} />
                </button>
            </div>

            <div>
                <button className = {classes.icon} 
                        style = {{paddingTop: "4px"}} 
                        onClick = {infoHandler}>
                    <InfoIcon className = {classes.infoIcon} />
                </button>
        </div>

        <div className = {classes.DisplayMan}>
            {displayState["showBackdrop"] && <Backdrop/>}

            {displayState["showInfo"] && 
                <InfoDisplay infoHandler = {infoHandler}/>}
            {displayState["showShop"] && 
                <ShopDisplay dollarHandler = {props.dollarHandler} 
                    shopHandler = {shopHandler}/>}
            {props.isGameOver[0] && 
                <WinLoseDisplay isGameOver = {props.isGameOver}
                                gameSpace = {props.gameSpace}
                                pokeAnswer = {props.pokeAnswer} />}
        </div>
    </>
    )
}

export default DisplayMan;
