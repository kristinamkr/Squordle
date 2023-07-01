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
    const filterHandler = props.filterHandler;

    console.log("FILTER ---- ! " + JSON.stringify(filter) + "---------------\n");

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

    function GenTileButton({genNumber, classes, filterHandler}) 
    {
        const genFilter = JSON.parse(localStorage.getItem('genFilter'))[`g${genNumber}`];
        const imgName = genFilter ? `${genNumber}_INACTIVE.png` : `${genNumber}.png`;

        const imgPath = require(`../assets/genTiles/${imgName}`);
        
        return (
            <button className = {classes[`genTile${genNumber}`]}
                style = {{ backgroundImage: `url(${imgPath})` }}
                onClick = {() => filterHandler(genNumber)}
            />
        );
    }

    function GenTiles({ classes, filterHandler}) 
    {
        const genNumbers = [1, 2, 3, 4, 5, 6];

        return (
            <div className={classes.menu}>
                { genNumbers.map(genNumber => (
                    <div className={classes.rowDisplay} key={genNumber}>
                        <GenTileButton genNumber = {genNumber}
                                       classes = {classes}
                                       filterHandler = {filterHandler}
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
                    { GenTiles({ classes, filterHandler})}  
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
