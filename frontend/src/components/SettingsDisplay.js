/*
 * SettingsDisplay.js
*/ 

import classes from "./style/SettingsDisplay.module.css";

import User from "./User.js";

function SettingsDisplay(props)
{
	return (
		<div className = {classes.settingsDisplay}>
			<p/>
			<img src = {require("../assets/settings.png")}/>

            <User user = {props.user}
                  userHandler = {props.userHandler} />

			<button onClick = {props.reload}> Close </button>
			<p/>
		</div>
    );
}

export default SettingsDisplay;
