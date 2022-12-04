/*
 * WinLoseDisplay.js 
*/

import classes from "./style/WinLoseDisplay.module.css";
import spriteLink from  "../functions/SpriteLink.js";

function WinLoseDisplay(props)
{
	var answer = props.pokeAnswer;
    var spriteRef = spriteLink(answer);

    function winOrLose()
    {
        let imgName, gameOverTxt;
        if (props.isGameOver[1] === 'win') {
            imgName = "WinTextLight";
            gameOverTxt = "The pokémon was " + answer[0].toUpperCase() + 
                answer.slice(1);
        }
        else {
            imgName = "LoseTextLight";
            gameOverTxt = "The correct pokémon was " + answer[0].toUpperCase() +
                answer.slice(1);
        }
        
        return displayWinLose(imgName, gameOverTxt);
    }

    function displayWinLose(imgName, gameOverTxt)
    {
        return (
            <>
                <img className = {classes.textDisplay}
                     src = {require("../assets/" + imgName + ".png")}/>
                <img className = {classes.spriteDisplay}
                     src = {spriteRef}/>
                <p> 
                    {gameOverTxt}
                </p>
            </>
        )
   }

	return (
        <div className = {classes.WinLoseDisplay}> 
            { winOrLose() }
			<button onClick = {() => props.reload()}> Play Again? </button>
		</div>
	);
}

export default WinLoseDisplay;
