/*
 * WinDisplay.js 
 * cool
*/

import classes from "./style/WinDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

function WinDisplay(props)
{
	var setDisplayState = props.setDisplayState;
	var gameSpace = props.gameSpace;

	var answer = gameSpace[0].pokemon;
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
        <div className = {classes.WinDisplay}>
			<p/>
			<img style = {{width: "80%"}} 
                 src = {require("../assets/WinTextLight.png")}/>
			<img style = {{width: "256px", 
                           height: "192px", 
                           position: "relative"}} 
                 src = {spriteRef}/>
			<p> 
                The pokémon was {answer[0].toUpperCase() + answer.slice(1)}
            </p>
			<button onClick = {reload}>
                Play Again?
            </button>
			<p/>
		</div>
	);
}

export default WinDisplay;
