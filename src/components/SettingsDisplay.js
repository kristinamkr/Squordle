/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";
import User from "./User.js";

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";
import { useReducer } from 'react';

function SettingsDisplay(props)
{
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function toggleFreeplay() 
    {
		if (Number(localStorage.gameMode) % 2 === 0)
			localStorage.gameMode = Number(localStorage.gameMode) + 1;
		else 
			localStorage.gameMode = Number(localStorage.gameMode) - 1;

        props.setToggledGM(!(props.toggledGM));
		forceUpdate();
	}

	function toggleEasyMode() 
    {
        if (Number(localStorage.gameMode) < 2)
            localStorage.gameMode = Number(localStorage.gameMode) + 2;
        else
            localStorage.gameMode = Number(localStorage.gameMode) - 2;
		forceUpdate();
	}

	return (
		<div className = {classes.settingsDisplay}>
			<p/>
			<img className = {classes.header} 
                 src = {require("../assets/settings.png")}
                 alt = "settings header"/>

	        <User user = {props.user}
	              userHandler = {props.userHandler}
	              setToggledGM = {props.setToggledGM}
	              forceUpdate = {forceUpdate}/>

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

export default SettingsDisplay;
