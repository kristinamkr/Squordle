/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";
import User from "./User.js";

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";

import { useContext, useState } from 'react';
import { GameContext } from '../Squordle.js';

function SettingsDisplay(props)
{
    const { 
        gameMode, 
        toggleGameMode,
        genFilter,
        toggleGenFilter,
        ticketPurchased,
    } = useContext(GameContext); 

    console.log('ticketPurchased? - ' + ticketPurchased);

    // 0 - user, 1 - gen
    const [settingsDisplay, setSettingsDisplay] = useState(false); 
    const [easyModeChecked, setEasyModeChecked] = useState(gameMode >= 2);

    function toggleSettingsDisplay()
    {
        setSettingsDisplay(!settingsDisplay);
    }

    function toggleFreeplay() 
    {
        toggleGameMode(gameMode + (gameMode % 2 === 0 ? 1 : -1));
	}

	function toggleEasyMode() 
    {
        toggleGameMode(gameMode + (gameMode < 2 ? 2 : -2));
        setEasyModeChecked(prevChecked => !prevChecked);
	}

    function GenTileButton({genNumber, classes, toggleGenFilter}) 
    {
        // console.log('===FILTER===\n'+JSON.stringify(genFilter));
        const imgName = genFilter[`${genNumber}`] ? 
            `${genNumber}.png` : `${genNumber}_INACTIVE.png`;

        const imgPath = require(`../assets/genTiles/${imgName}`);
        
        return (
            <button className = {classes[`genTile${genNumber}`]}
                style = {{ backgroundImage: `url(${imgPath})` }}
                onClick = {() => toggleGenFilter(genNumber)}
            />
        );
    }

    function GenTiles({classes, filterHandler}) 
    {
        const genNumbers = [1, 2, 3, 4, 5, 6];

        return (
            <div className={classes.menu}>
                { genNumbers.map(genNumber => (
                    <div className={classes.rowDisplay} key={genNumber}>
                        <GenTileButton 
                            genNumber={genNumber}
                            classes={classes}
                            toggleGenFilter={toggleGenFilter}
                        />
                    </div>
                )) }
            </div>
        );
    }

    function userSettings()
    {
        return (
            <div className = {classes.settingsDisplay}>
                <p/>
                <button className={classes.userTabActive}/>
                {!ticketPurchased && 
                    <button className={classes.genTabGrayed}/>}
                {ticketPurchased && 
                    <button className={classes.genTabInactive}
                        onClick= {toggleSettingsDisplay}/> }

                <img className = {classes.header} 
                     src = {require("../assets/settings.png")}
                     alt = "settings header"/>

                <User userHandler = {props.userHandler}/>

                {JSON.parse(localStorage.inventory)["ticket"] && 
                    <div className = {classes.freeplay}>
                    <p> Click the ticket to toggle between Daily Mode
                        and Freeplay Mode </p>
                    <div className = {classes.modeSelect}>
                        {gameMode % 2 === 0 && <a>Daily</a>}
                        {gameMode % 2 === 1 && <a>Freeplay</a>}
                        <button onClick = {toggleFreeplay}>
                            <img src = {require("../assets/ticket0.png")}
                                 alt = "ticket"/>
                        </button>
                    </div>
                </div>}
                {!(JSON.parse(localStorage.inventory)["ticket"]) && 
                    <div className = {classes.freeplay}>
                    <p>Come back when you have purchased the freeplay ticket!</p>
                    <div className = {classes.modeSelect}>
                        <button>
                            <img className = {classes.grayedOut} 
                                 src = {require("../assets/ticket0.png")}
                                 alt = "ticket"/>
                        </button>
                    </div>
                </div>}
                <div className = {classes.easyMode}>
                    <div className = {classes.modeSelect}>
                        <label> Guess anything </label>
                        <input 
                            type="checkbox" 
                            id="easyMode" 
                            onChange = {(e) => toggleEasyMode()}
                            checked={easyModeChecked} 
                        />
                    </div> 
                    <div className = {classes.exit}>
                        <button onClick={props.settingsHandler}>
                            <ExitIcon className = {classes.exitIcon}/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function genSettings()
    {
        const imgPath = '../assets/genTiles/'; 
        return (
            <div className = {classes.settingsDisplay}>
                <p/>
                <button className={classes.userTabInactive}
                        onClick= {toggleSettingsDisplay}/> 
                <button className={classes.genTabActive}/>

                <img className = {classes.header} 
                     src = {require("../assets/settings.png")}
                     alt = "settings header"/>

                <div className = {classes.subheader}>
                    <p>Select a generation (or multiple) for freeplay</p>
                </div>

                <div className = {classes.menu}> 
                    { GenTiles({classes, toggleGenFilter})}  
                </div>
                <div className = {classes.exit}>
                    <button onClick = {props.reload}>
                        <ExitIcon className = {classes.exitIcon}/>
                    </button>
                </div>
            </div>
        );
    }

	return (
		<>
        { settingsDisplay == 0 &&
            userSettings() }
        { settingsDisplay == 1 && 
            genSettings() }
		</>
	)
}

export default SettingsDisplay;
