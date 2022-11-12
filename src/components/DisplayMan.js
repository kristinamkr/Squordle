import Backdrop from "./Backdrop.js";
import WinLoseDisplay from "./WinLoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";   
import ShopDisplay from "./ShopDisplay.js";

import classes from "./style/DisplayMan.module.css";
import { useState, useEffect } from 'react';
import { ReactComponent as ShopIcon } from "../assets/shopIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/infoIcon.svg";

function DisplayMan(props)
{
    var gameSpace = props.gameSpace
    var dollarHandler = props.dollarHandler
    var pokeAnswer = props.pokeAnswer;

	const [displayState, setDisplayState] = 
           useState({"showShop": false,
                     "showInfo": false,
                     "showWinPage": false,
                     "showLosePage": false,
                     "showBackdrop": false,
                     "showShucklePage": false,
                     "showShinyPage": false});

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

  	function showComplete(gameSpace)
    {
        var isWinner = false;
  		for (var i = 0; i < gameSpace.length; i++) {
      		if (gameSpace[i].state === "winner") {
                isWinner = true;
	        	setDisplayState({...displayState,
                                 "showWinPage": true,
                                 "showBackdrop": true
                                });
	        	break;
      		}
    	}

        /*
     	if (findFocus(gameSpace) === 0 && !isWinner) {
            console.log(gameSpace[0].pokemon);
	    	setDisplayState({...displayState,
                             "showLosePage": true,
                             "showBackdrop":true
                            });
        }
        */
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
            {displayState["showWinLosePage"] && 
                <WinLoseDisplay setDisplayState = {setDisplayState}
                    gameSpace = {gameSpace}
                    pokeAnswer = {pokeAnswer} />}
            {displayState["showInfo"] && 
                <InfoDisplay infoHandler = {infoHandler}/>}
            {displayState["showShop"] && 
                <ShopDisplay dollarHandler = {dollarHandler} 
                    shopHandler = {shopHandler}/>}
        </div>
    </>
    )
}

export default DisplayMan;
