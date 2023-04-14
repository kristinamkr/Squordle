/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";
import User from "./User.js";

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";

function SettingsDisplay(props)
{
	function toggleFreeplay() {
		console.log("ran")
		if (localStorage.gameMode === "0") {
			localStorage.gameMode = "1";
		} else {
			localStorage.gameMode = "0";
		}
	}

	return (
		<div className = {classes.settingsDisplay}>
			<p/>
			<img className = {classes.header} src = {require("../assets/settings.png")}/>

	        <User user = {props.user}
	              userHandler = {props.userHandler} />

	        {JSON.parse(localStorage.inventory)["ticket"] && <div className = {classes.freeplay}>
	        	<p>Click the ticket to toggle between the daily pokémon and freeplay mode</p>
                <button onClick = {toggleFreeplay}>
                    <img src = {require("../assets/ticket0.png")}/>
                </button>
            </div>}
            {!(JSON.parse(localStorage.inventory)["ticket"]) && <div className = {classes.freeplay}>
	        	<p>Come back when you have purchased the freeplay ticket!</p>
                <button>
                    <img className = {classes.grayedOut} src = {require("../assets/ticket0.png")}/>
                </button>
            </div>}

            <div className = {classes.exit}>
                <button onClick = {props.reload}>
                    <ExitIcon className = {classes.exitIcon}/>
                </button>
            </div>
		</div>
    );
}

export default SettingsDisplay;
