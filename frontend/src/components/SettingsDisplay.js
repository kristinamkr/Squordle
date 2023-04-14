/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";
import User from "./User.js";

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

	        <div className = {classes.freeplay}>
	        	<p>Click the ticket to toggle between the daily pokémon and freeplay mode</p>
                <button onClick = {toggleFreeplay}>
                    <img src = {require("../assets/ticket0.png")}/>
                </button>
            </div>


			<button onClick = {props.reload}> Close </button>
			<p/>
		</div>
    );
}

export default SettingsDisplay;
