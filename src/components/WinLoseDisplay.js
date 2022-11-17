/*
 * WinLoseDisplay.js 
*/

import classes from "./style/WinDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

function WinLoseDisplay(props)
{
	var setDisplayState = props.setDisplayState;

	var answer = props.pokeAnswer;
    var spriteRef = spriteLink(answer);

	function reload()
    {
		setDisplayState({"showInfo": false,
                         "showWinpage": false,
                         "showLosepage": false,
                         "showBackdrop": false});
		window.location.reload();
	}

    function loseDisplay()
    {
        return (
            <>
                <img className = {classes.textDisplay}
                     src = {require("../assets/LoseTextLight.png")}/>
                <img className = {classes.spriteDisplay}
                     src = {spriteRef}/>
                <p>
                    The correct pokemon was {answer[0].toUpperCase() + 
                        answer.slice(1)}
                </p>
            </>
        )
    }

    function winDisplay()
    {
        return (
            <>
                <img className = {classes.textDisplay}
                     src = {require("../assets/WinTextLight.png")}/>
                <img className = {classes.spriteDisplay}
                     src = {spriteRef}/>
                <p> 
                    The pokémon was {answer[0].toUpperCase() + answer.slice(1)}
                </p>
            </>
        )
    }

    function winOrLose()
    {
        if (props.isGameOver[1] === 'win')
            return winDisplay();
        return loseDisplay();
    }

	return (
        <div className={classes.WinLoseDisplay}> <p/>
            {winOrLose()}
			<button onClick = {reload}> Play Again? </button>
			<p/> </div>
	);
}

export default WinLoseDisplay;
