/*
 * LoseDisplay.js
 * cool
*/

import classes from "./style/LoseDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

function LoseDisplay(props)
{
	var setDisplayState = props.setDisplayState;
	var gamespace = props.gamespace;

	var answer = gamespace[0].pokemon;
    var spriteRef = spriteLink(answer);

	function reload()
    {
		setDisplayState({"showInfo": false,
                         "showWinpage": false,
                         "showLosepage": false,
                         "showBackdrop": false});
		window.location.reload();
	}

	return (
		<div className = {classes.LoseDisplay}>
			<p/>
			<img style = {{width: "80%"}} 
                 src = {require("../assets/LoseTextLight.png")}/>
			<img style = {{width: "256px", 
                           height: "192px", 
                           position: "relative"}} 
                 src = {spriteRef}/>
			<p>
                The correct pokemon was {answer[0].toUpperCase() + 
                    answer.slice(1)}
            </p>
			<button onClick = {reload}> 
                Play Again? 
            </button>
			<p/>
		</div>
	);
}

export default LoseDisplay;
