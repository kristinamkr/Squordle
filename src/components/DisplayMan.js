/*
 * DisplayMan.js
*/

import classes from "./style/DisplayMan.module.css";

import WinLoseDisplay from "./WinLoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";   
import SettingsDisplay from "./SettingsDisplay.js";
import ShopDisplay from "./ShopDisplay.js";

import { ReactComponent as ShopIcon } from "../assets/shopIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/infoIcon.svg";
import { ReactComponent as SettingsIcon } from "../assets/settingsIcon.svg";
import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../Squordle.js';

function Backdrop() 
{
    return <div className = {classes.backdrop}/>
}

function DisplayMan(props)
{
    const { 
        gameMode, 
        toggleGameMode,
        isGameOver, 
        setGameOver, 
        pokemon, 
        dollarHandler 
    } = useContext(GameContext); 

	const [displayState, setDisplayState] = useState({ 
        showShop:     false,
        showSettings: false,
        showInfo:     false,
        showWinLose:  false,
        showBackdrop: false 
    });

    if (JSON.parse(localStorage.firstTime)) {
        localStorage.firstTime = false;
        infoHandler();
    }

    useEffect(() => {
        let enableBackdrop = false;
        for(let key in displayState)
            if (displayState[key])
                enableBackdrop = true;
        localStorage.backdrop = enableBackdrop;
    }, [displayState]);

    useEffect(() => {
        if (isGameOver[0])
            winLoseHandler();
    }, [isGameOver[0]]);

    function winLoseHandler()
    {   
        setDisplayState({
            ...displayState, 
            showWinLose:  !displayState['showWinLose'],
            showBackdrop: !displayState['showBackdrop']
        });
    }

  	function shopHandler()
    {
  		setDisplayState({
            ...displayState,
            showShop:     !displayState["showShop"],
            showBackdrop: !displayState["showBackdrop"]
        });
  	}

  	function settingsHandler()
    {
  		setDisplayState({
            ...displayState,
            showSettings: !displayState["showSettings"],
            showBackdrop: !displayState["showBackdrop"]
        });
  	}

	function infoHandler()
    {
        setDisplayState({
            ...displayState, 
            showInfo:     !displayState["showInfo"],
            showBackdrop: !displayState["showBackdrop"]
        });
  	}

    // CHANGE S.T. ONLY HEADER & GSDIV ARE RE-RENDERED
	function reload()
    {
		setDisplayState({
            showShop:     false,
            showSettings: false,
            showInfo:     false,
            showWinLose:  false,
            showBackdrop: false
        });

        if (gameMode || isGameOver[0])
            toggleGameMode(false);

        setGameOver([false, '']);
    }

    return (
        <div className = {classes.center}>
            <header className = {classes.menuBar}>
                <div className = {classes.pHeader}>
                    <img src = {require("../assets/pokedollarLight.png")}
                         alt = "PokeDollar symbol in light mode"/>
                    {" "}{localStorage.pokeDollars}
                </div>

                <div className = {classes.gameTitle}>
                    <img src = {require("../assets/LogoLight.png")}
                         alt = "Squordle logo in light mode"/>
                </div>

                <div className = {classes.icon}>
                    <button onClick = {shopHandler}>
                        <ShopIcon className = {classes.shopIcon}/>
                    </button>
                    <button onClick = {settingsHandler}>
                        <SettingsIcon className = {classes.settingsIcon}/>
                    </button>
                    <button onClick = {infoHandler}>
                        <InfoIcon className = {classes.infoIcon}/>
                    </button>
                </div>

                {displayState["showBackdrop"] && <Backdrop/>}

                {displayState["showShop"] && 
                    <ShopDisplay shopHandler = {shopHandler}
                        dollarHandler = {dollarHandler} 
                    />
                }

                {displayState["showSettings"] && 
                    <SettingsDisplay 
                        settingsHandler = {settingsHandler}
                        toggleGameMode = {toggleGameMode}
                        filter = {props.filter}
                        filterHandler = {props.filterHandler}
                        reload = {reload}
                        userHandler = {props.userHandler} 
                    />
                } 

                {displayState["showInfo"] && 
                    <InfoDisplay infoHandler = {infoHandler}/>}

                {displayState['showWinLose'] && 
                    <WinLoseDisplay 
                        winLoseHandler = {winLoseHandler}
                        reload = {reload} 
                    />
                }
            </header>
        </div>
    )
}

export default DisplayMan;
