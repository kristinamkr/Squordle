/*
 * InfoDisplay.js
*/ 

import classes from "./style/InfoDisplay.module.css";

function InfoDisplay(props)
{
	var infoText = ["You have six tries to guess the name of the daily Pokémon.",
                    'Each guess must be a real Pokémon. (check for "Guess anything" in settings)',
                    "Green letters are in the correct spot, "
                     + "yellow letters are in the wrong spot, "
                     + "and gray letters are not in the name.",
                    "Win 5 Pokédollars for each yellow letter, "
                     + "20 for each green letter, "
                     + "and 200 for correct guesses!"]

    function bullet(i)
    {
        return (
            <div className = {classes.listRow}
                 key = {"bullet-" + i}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}
                     alt = "custom pokeball themed bullet point"/>
                {infoText[i]}
            </div>
        )
    }

	return (
		<div className = {classes.infoDisplay}>
			<p/>
			<img src = {require("../assets/howtoplayLight.png")}
                 alt = "how to play header in lightmode"/>

			<div className = {classes.listRow}> 
                {infoText.map((info, index) => {return bullet(index)} )}
			</div>

            <div className = {classes.credit}>
                This project was made by&nbsp;
                <div className = {classes.names}>
                    <a href="https://www.github.com/3ddiehead">3ddiehead</a>
                    &nbsp;+&nbsp;
                    <a href="https://www.github.com/kristinamkr">kristinamkr</a>
                </div>
            </div>
			<button onClick = {props.infoHandler}> Play! </button>
			<p/>
		</div>
    );
}

export default InfoDisplay;
