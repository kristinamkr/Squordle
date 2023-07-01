/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";
import User from "./User.js";

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";
import { useState } from 'react';

function SettingsDisplay(props)
{
    // 0 - user, 1 - gen
    const [settingsDisplay, setSettingsDisplay] = useState(false); 

    const filter = props.filter;
    
    console.log("FILTER ! --- \n" + JSON.stringify(filter) + "\n ----------------");

    function toggleSettingsDisplay()
    {
        setSettingsDisplay(!settingsDisplay);
    }

    function toggleFreeplay() 
    {
		if (Number(localStorage.gameMode) % 2 === 0)
			localStorage.gameMode = Number(localStorage.gameMode) + 1;
		else 
			localStorage.gameMode = Number(localStorage.gameMode) - 1;

        props.toggleGameMode();
	}

	function toggleEasyMode() 
    {
        if (Number(localStorage.gameMode) < 2)
            localStorage.gameMode = Number(localStorage.gameMode) + 2;
        else
            localStorage.gameMode = Number(localStorage.gameMode) - 2;
	}

    function userSettings()
    {
        return (
            <div className = {classes.settingsDisplay}>
                <p/>
                <button className={classes.userTabActive}/>
                <button className={classes.genTabInactive}
                        onClick= {toggleSettingsDisplay}/> 
                <img className = {classes.header} 
                     src = {require("../assets/settings.png")}
                     alt = "settings header"/>

                <User userHandler = {props.userHandler}
                      setToggledGM = {props.setToggledGM}/>

                {JSON.parse(localStorage.inventory)["ticket"] && 
                    <div className = {classes.freeplay}>
                    <p> Click the ticket to toggle between Daily Mode
                        and Freeplay Mode </p>
                    <div className = {classes.modeSelect}>
                        {Number(localStorage.gameMode) % 2 === 0 && <a>Daily</a>}
                        {Number(localStorage.gameMode) % 2 === 1 && <a>Freeplay</a>}
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
                    { (Number(localStorage.gameMode) < 2) &&
                        <div className = {classes.modeSelect}>
                            <label> Guess anything </label>
                            <input type="checkbox" 
                                   id="easyMode" 
                                   onChange = {(e) => toggleEasyMode()}/>
                        </div> }
                    { (Number(localStorage.gameMode) >= 2) &&
                        <div className = {classes.modeSelect}>
                            <label> Guess anything </label>
                            <input type="checkbox" 
                                   id="easyMode" 
                                   onChange = {(e) => toggleEasyMode()}
                                   checked />
                        </div> }
                    <div className = {classes.exit}>
                        <button onClick = {props.reload}>
                            <ExitIcon className = {classes.exitIcon}/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function setGen(x)
    {
        console.log("GEN " + x + "!");
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

                <div className = {classes.menu}> 
                    <div className = {classes.rowDisplay}> 
                    { !JSON.parse(localStorage.genFilter)["g1"] &&
                        <><button className={classes.genTile1}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/1.png')}}
                                onClick={() => props.filterHandler(1)}/></> } 
                    { JSON.parse(localStorage.genFilter)["g1"] &&
                        <><button className={classes.genTile1}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/1_INACTIVE.png')}}
                                onClick={() => props.filterHandler(1)}/></> } 

                    { !JSON.parse(localStorage.genFilter)["g2"] &&
                        <> <button className={classes.genTile2}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/2.png')}}
                                onClick={() => props.filterHandler(2)}/> </> } 
                    { !JSON.parse(localStorage.genFilter)["g2"] &&
                        <> <button className={classes.genTile2}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/2_INACTIVE.png')}}
                                onClick={() => props.filterHandler(2)}/> </> } 
                    </div>
                    <div className = {classes.rowDisplay}> 
                        <button className={classes.genTile3}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/3.png')}}
                                onClick={() => setGen(3)}/> 
                        <button className={classes.genTile4}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/4.png')}}
                                onClick={() => setGen(4)}/> 
                    </div>
                    <div className = {classes.rowDisplay}> 
                        <button className={classes.genTile5}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/5.png')}}
                                onClick={() => setGen(5)}/> 
                        <button className={classes.genTile6}
                                style={{backgroundImage: 'url(' + require('../assets/genTiles/6.png')}}
                                onClick={() => setGen(6)}/> 
                    </div>
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
